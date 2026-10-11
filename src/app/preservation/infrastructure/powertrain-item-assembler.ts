
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {PowertrainItemEntity} from '../domain/model/powertrain-item.entity';
import {PowertrainItemResource, PowertrainItemsResponse} from './powertrain-items-response';

/**
 * Maps powertrain item entities to and from API resources.
 */
export class PowertrainItemAssembler implements BaseAssembler<PowertrainItemEntity, PowertrainItemResource, PowertrainItemsResponse> {


  toEntitiesFromResponse(response: PowertrainItemsResponse): PowertrainItemEntity[] {
    return response.powertrainItems.map(resource => this.toEntityFromResource(resource as PowertrainItemResource));
  }

  toEntityFromResource = (resource: PowertrainItemResource): PowertrainItemEntity =>
    new PowertrainItemEntity({
      id: resource.id,
      hubId: resource.hubId,
      engineType: resource.engineType,
      componentId: resource.componentId,
      componentName: resource.componentName,
      quantity: resource.quantity,
      registeredAt: new Date(resource.registeredAt) // Convert ISO string to Date object
    });

  toResourceFromEntity = (entity: PowertrainItemEntity): PowertrainItemResource =>
    ({
      id: entity.id,
      hubId: entity.hubId,
      engineType: entity.engineType,
      componentId: entity.componentId,
      componentName: entity.componentName,
      quantity: entity.quantity,
      registeredAt: entity.registeredAt.toISOString() // Convert Date object to ISO string
    });

}




