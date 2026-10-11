import {inject, Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {EngineHubEntity} from '../domain/model/engine-hub.entity';
import {PowertrainItemEntity} from '../domain/model/powertrain-item.entity';
import {HttpClient} from '@angular/common/http';
import {EngineHubApiEndpoint} from './engine-hub-api-endpoint';
import {PowertrainItemApiEndpoint} from './powertrain-item-api-endpoint';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PreservationApi extends BaseApi {

  private readonly http = inject(HttpClient);
  private readonly engineHubsEndpoint = new EngineHubApiEndpoint(this.http);
  private readonly powertrainItemsEndpoint = new PowertrainItemApiEndpoint(this.http);


  /**
   * Methods HttpClient for EngineHubEntity and PowertrainItemEntity operations will be defined here.
   */

  /**
   * EngineHubEntity operations (CRUD - 5 methods)
   */

  /**
   * Retrieves all EngineHubEntity instances.
   * @returns An Observable stream with the EngineHubEntity collection.
   * */

  getEngineHubEntities = (): Observable<EngineHubEntity[]> =>
    this.engineHubsEndpoint.getAll();

  /**
   * Retrieves a single EngineHubEntity by ID.
   * @param id - The ID of the EngineHubEntity.
   * @returns An Observable of the EngineHubEntity object.
   */

  getEngineHubEntity = (id: number): Observable<EngineHubEntity> =>
    this.engineHubsEndpoint.getById(id);

  /**
   * Creates a new EngineHubEntity.
   * @param entity - The EngineHubEntity to create.
   * @returns An Observable of the created EngineHubEntity.
   */

  createEngineHubEntity = (entity: EngineHubEntity): Observable<EngineHubEntity> =>
    this.engineHubsEndpoint.create(entity);

  /**
   * Updates an existing EngineHubEntity.
   * @param entity - The EngineHubEntity to update.
   * @returns An Observable of the updated EngineHubEntity.
   */

  updateEngineHubEntity = (entity: EngineHubEntity): Observable<EngineHubEntity> =>
    this.engineHubsEndpoint.update(entity, entity.id);

  /**
   * Deletes an EngineHubEntity by ID.
   * @param id - The ID of the EngineHubEntity to delete.
   * @returns An Observable of void.
   */

  deleteEngineHubEntity = (id: number): Observable<void> =>
    this.engineHubsEndpoint.delete(id);

  /**
   * PowertrainItemEntity operations (CRUD - 5 methods)
   */

  /**
   * Retrieves all PowertrainItemEntity instances.
   * @returns An Observable stream with the PowertrainItemEntity collection.
   */

  getPowertrainItemEntities = (): Observable<PowertrainItemEntity[]> =>
    this.powertrainItemsEndpoint.getAll();

  /**
   * Retrieves a single PowertrainItemEntity by ID.
   * @param id - The ID of the PowertrainItemEntity.
   * @returns An Observable of the PowertrainItemEntity object.
   */

  getPowertrainItemEntity = (id: number): Observable<PowertrainItemEntity> =>
    this.powertrainItemsEndpoint.getById(id);

  /**
   * Creates a new PowertrainItemEntity.
   * @param entity - The PowertrainItemEntity to create.
   * @returns An Observable of the created PowertrainItemEntity.
   */

  createPowertrainItemEntity = (entity: PowertrainItemEntity): Observable<PowertrainItemEntity> =>
    this.powertrainItemsEndpoint.create(entity);

  /**
   * Updates an existing PowertrainItemEntity.
   * @param entity - The PowertrainItemEntity to update.
   * @returns An Observable of the updated PowertrainItemEntity.
   */

  updatePowertrainItemEntity = (entity: PowertrainItemEntity): Observable<PowertrainItemEntity> =>
    this.powertrainItemsEndpoint.update(entity, entity.id);

  /**
   * Deletes a PowertrainItemEntity by ID.
   * @param id - The ID of the PowertrainItemEntity to delete.
   * @returns An Observable of void.
   */

  deletePowertrainItemEntity = (id: number): Observable<void> =>
    this.powertrainItemsEndpoint.delete(id);


}
