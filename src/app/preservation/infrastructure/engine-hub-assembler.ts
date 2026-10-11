import {EngineHubResource,EngineHubsResponse} from './engine-hubs-response';
import {EngineHubEntity} from '../domain/model/engine-hub.entity';
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';

/**
 * Maps engine hub entities to and from API resources.
 */
export class EngineHubAssembler implements BaseAssembler<EngineHubEntity, EngineHubResource, EngineHubsResponse> {

  /**
   * Converts a EngineHubsResponse to an array of EngineHubEntity entities.
   * @param response - The API response containing engine hubs.
   * @returns An array of EngineHubEntity entities.
   */

  toEntitiesFromResponse = (response: EngineHubsResponse): EngineHubEntity[] => {
    return response.engineHubs.map(resource => this.toEntityFromResource(resource as EngineHubResource));
  }

  /**
   * Converts a EngineHubResource to a EngineHubEntity entity.
   * @param resource - The resource to convert.
   * @returns The converted EngineHubEntity entity.
   */

  toEntityFromResource = (resource: EngineHubResource): EngineHubEntity =>
    new EngineHubEntity({
      id: resource.id,
      name: resource.name,
      engineType: resource.engineType,
      capacity: resource.capacity
    });

  /**
   * Converts a EngineHubEntity entity to a EngineHubResource.
   * @param entity - The entity to convert.
   * @returns The converted EngineHubResource.
   */

  toResourceFromEntity = (entity: EngineHubEntity): EngineHubResource =>
    ({
    id: entity.id,
    name: entity.name,
    engineType: entity.engineType,
    capacity: entity.capacity
  } as EngineHubResource);

}
