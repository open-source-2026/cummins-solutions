import {Component, computed, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {PreservationStore} from '../../../application/preservation.store';
import {EngineHubSummary} from '../engine-hub-summary/engine-hub-summary';

/**
 * Displays engine hub summaries using preservation state.
 */
@Component({
  selector: 'app-engine-hub-list',
  imports: [TranslatePipe, EngineHubSummary],
  templateUrl: './engine-hub-list.html',
  styleUrl: './engine-hub-list.css'
})
export class EngineHubList {
  readonly preservationStore = inject(PreservationStore);

  readonly summaries = computed(() =>
    this.preservationStore.engineHubs().map(hub => ({
      hub,
      items: this.preservationStore.getPowertrainItemsByHubId(hub.id),
      total: this.preservationStore.getTotalComponentsByHubId(hub.id),
      available: this.preservationStore.getAvailableCapacityByHubId(hub.id)
    }))
  );
}
