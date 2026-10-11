import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {EngineHubEntity} from '../domain/model/engine-hub.entity';
import {EngineHubResource, EngineHubsResponse} from './engine-hubs-response';
import {EngineHubAssembler} from './engine-hub-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for engine hub CRUD operations.
 */
export class EngineHubApiEndpoint extends BaseApiEndpoint<EngineHubEntity, EngineHubResource, EngineHubsResponse, EngineHubAssembler> {

  /**
   * Creates an instance of EngineHubApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */

  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderEngineHubsEndpointPath}`, new EngineHubAssembler());
  }
}


