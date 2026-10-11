import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {PowertrainItemEntity} from '../domain/model/powertrain-item.entity';
import {PowertrainItemResource, PowertrainItemsResponse} from './powertrain-items-response';
import {PowertrainItemAssembler} from './powertrain-item-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for powertrain item CRUD operations.
 */

export class PowertrainItemApiEndpoint extends BaseApiEndpoint<PowertrainItemEntity, PowertrainItemResource, PowertrainItemsResponse, PowertrainItemAssembler> {

  /**
   * Creates an instance of PowertrainItemApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderPowertrainItemsEndpointPath}`, new PowertrainItemAssembler());
  }
}
