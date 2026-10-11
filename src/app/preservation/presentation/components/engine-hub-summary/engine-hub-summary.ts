import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { EngineHubEntity } from '../../../domain/model/engine-hub.entity';
import { PowertrainItemEntity } from '../../../domain/model/powertrain-item.entity';

@Component({
  imports: [MatCardModule, TranslatePipe],
  selector: 'app-engine-hub-summary',
  styleUrl: './engine-hub-summary.css',
  templateUrl: './engine-hub-summary.html',
})
export class EngineHubSummary {

  @Input({ required: true }) hub!: EngineHubEntity;
  @Input() items: PowertrainItemEntity[] = [];
  @Input() totalComponents = 0;
  @Input() availableCapacity = 0;

}
