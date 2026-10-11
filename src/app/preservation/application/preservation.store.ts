import {computed, DestroyRef, inject, Injectable, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, Observable, retry} from 'rxjs';
import {EngineHubEntity} from '../domain/model/engine-hub.entity';
import {PowertrainItemEntity} from '../domain/model/powertrain-item.entity';
import {PreservationApi} from '../infrastructure/preservation-api';

/**
 * Holds preservation state and coordinates engine hub and powertrain item operations.
 */
@Injectable({providedIn: 'root'})
export class PreservationStore {
  private readonly preservationApi = inject(PreservationApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly engineHubsSignal = signal<EngineHubEntity[]>([]);
  /** Engine hubs available to presentation components. */
  readonly engineHubs = this.engineHubsSignal.asReadonly();

  private readonly powertrainItemsSignal = signal<PowertrainItemEntity[]>([]);
  /** Registered powertrain items available to presentation components. */
  readonly powertrainItems = this.powertrainItemsSignal.asReadonly();

  /** Number of hubs and item records, rather than the sum of item quantities. */
  readonly engineHubCount = computed(() => this.engineHubs().length);
  readonly powertrainItemCount = computed(() => this.powertrainItems().length);

  private readonly pendingOperationsSignal = signal(0);
  /** Remains true until all concurrent API operations finish. */
  readonly loading = computed(() => this.pendingOperationsSignal() > 0);

  private readonly errorSignal = signal<string | null>(null);
  /** Current operation error, or null when no error has been reported. */
  readonly error = this.errorSignal.asReadonly();

  private readonly hubsLoadedSignal = signal(false);
  private readonly itemsLoadedSignal = signal(false);
  /** Indicates that capacity can be calculated from loaded collections. */
  readonly ready = computed(() => this.hubsLoadedSignal() && this.itemsLoadedSignal());

  /** Loads both collections when Angular creates the store. */
  constructor() {
    this.loadEngineHubs();
    this.loadPowertrainItems();
  }

  /** Selects a hub by identifier from the current state. */
  getEngineHubById = (id: number): Signal<EngineHubEntity | undefined> =>
    computed(() => this.engineHubs().find(hub => hub.id === id));

  /** Selects an item by identifier from the current state. */
  getPowertrainItemById = (id: number): Signal<PowertrainItemEntity | undefined> =>
    computed(() => this.powertrainItems().find(item => item.id === id));

  /** Selects the hub assigned to an engine type. */
  getEngineHubByEngineType = (engineType: string): Signal<EngineHubEntity | undefined> =>
    computed(() => this.engineHubs().find(hub => hub.engineType === engineType));

  /** Selects all items associated with a hub. */
  getPowertrainItemsByHubId = (hubId: number): Signal<PowertrainItemEntity[]> =>
    computed(() => this.powertrainItems().filter(item => item.hubId === hubId));

  /** Calculates the sum of quantities for a hub. */
  getTotalComponentsByHubId = (hubId: number): Signal<number> =>
    computed(() => this.powertrainItems()
      .filter(item => item.hubId === hubId)
      .reduce((total, item) => total + item.quantity, 0));

  /** Calculates remaining capacity, or returns undefined for an unknown hub. */
  getAvailableCapacityByHubId = (hubId: number): Signal<number | undefined> => {
    const hub = this.getEngineHubById(hubId);
    const total = this.getTotalComponentsByHubId(hubId);
    return computed(() => {
      const selectedHub = hub();
      return selectedHub ? selectedHub.capacity - total() : undefined;
    });
  };

  /** Creates a hub and stores the entity returned by the API. */
  addEngineHub = (hub: EngineHubEntity): void => {
    this.execute(this.preservationApi.createEngineHubEntity(hub), created => {
      this.engineHubsSignal.update(hubs => [...hubs, created]);
    }, 'Failed to create engine hub');
  };

  /** Updates a hub remotely before replacing it in state. */
  updateEngineHub = (hub: EngineHubEntity): void => {
    this.execute(this.preservationApi.updateEngineHubEntity(hub), updated => {
      this.engineHubsSignal.update(hubs => hubs.map(current => current.id === updated.id ? updated : current));
    }, 'Failed to update engine hub');
  };

  /** Deletes a hub remotely before removing it from state. */
  deleteEngineHub = (id: number): void => {
    this.execute(this.preservationApi.deleteEngineHubEntity(id), () => {
      this.engineHubsSignal.update(hubs => hubs.filter(hub => hub.id !== id));
    }, 'Failed to delete engine hub');
  };

  /**
   * Validates capacity, assigns the hub and timestamp, and persists an item.
   * @param item - Item containing the selected component, engine type and quantity.
   * @param onCreated - Optional callback executed only after successful persistence.
   */
  addPowertrainItem = (item: PowertrainItemEntity, onCreated?: (created: PowertrainItemEntity) => void): void => {
    if (!this.validatePowertrainItem(item)) return;
    item.registeredAt = new Date();
    this.execute(this.preservationApi.createPowertrainItemEntity(item), created => {
      this.powertrainItemsSignal.update(items => [...items, created]);
      onCreated?.(created);
    }, 'Failed to create powertrain item');
  };

  /** Validates an item update and replaces state only after API success. */
  updatePowertrainItem = (item: PowertrainItemEntity): void => {
    if (!this.validatePowertrainItem(item, item.id)) return;
    this.execute(this.preservationApi.updatePowertrainItemEntity(item), updated => {
      this.powertrainItemsSignal.update(items => items.map(current => current.id === updated.id ? updated : current));
    }, 'Failed to update powertrain item');
  };

  /** Deletes an item remotely before removing it from state. */
  deletePowertrainItem = (id: number): void => {
    this.execute(this.preservationApi.deletePowertrainItemEntity(id), () => {
      this.powertrainItemsSignal.update(items => items.filter(item => item.id !== id));
    }, 'Failed to delete powertrain item');
  };

  /** Loads hubs with up to two retries for a failed read request. */
  private loadEngineHubs = (): void => {
    this.execute(this.preservationApi.getEngineHubEntities().pipe(retry(2)), hubs => {
      this.engineHubsSignal.set(hubs);
      this.hubsLoadedSignal.set(true);
    }, 'Failed to load engine hubs');
  };

  /** Loads registered items with up to two retries for a failed read request. */
  private loadPowertrainItems = (): void => {
    this.execute(this.preservationApi.getPowertrainItemEntities().pipe(retry(2)), items => {
      this.powertrainItemsSignal.set(items);
      this.itemsLoadedSignal.set(true);
    }, 'Failed to load powertrain items');
  };

  /** Validates quantity against loaded local state and resolves the associated hub. */
  private validatePowertrainItem = (item: PowertrainItemEntity, excludedId?: number): boolean => {
    if (!this.ready() || this.loading()) {
      this.errorSignal.set('Wait until the current data operations finish');
      return false;
    }
    const hub = this.engineHubs().find(current => current.engineType === item.engineType);
    if (!hub) {
      this.errorSignal.set('No engine hub exists for the selected engine type');
      return false;
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      this.errorSignal.set('Quantity must be a positive integer');
      return false;
    }
    const total = this.powertrainItems()
      .filter(current => current.hubId === hub.id && current.id !== excludedId)
      .reduce((sum, current) => sum + current.quantity, 0);
    if (item.quantity > hub.capacity - total) {
      this.errorSignal.set('Quantity exceeds the available engine hub capacity');
      return false;
    }
    item.hubId = hub.id;
    return true;
  };

  /** Shares subscription, loading and error handling across API operations. */
  private execute = <T>(request: Observable<T>, onSuccess: (result: T) => void, fallback: string): void => {
    this.pendingOperationsSignal.update(count => count + 1);
    this.errorSignal.set(null);
    request.pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.pendingOperationsSignal.update(count => count - 1))
    ).subscribe({
      next: onSuccess,
      error: (error: unknown) => this.errorSignal.set(this.formatError(error, fallback))
    });
  };

  /** Normalizes an unknown error into a readable message. */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
