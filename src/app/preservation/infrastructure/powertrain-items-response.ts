import {BaseResource,BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a powertrain item.
 */

export interface PowertrainItemResource extends BaseResource {

  /**
   * Unique identifier for the powertrain item.
   */

  id: number;
  hubId: number;
  engineType: string;
  componentId: number;
  componentName: string;
  quantity: number;
  /**
   * The date and time when the powertrain item was registered.
   */
  registeredAt: string;

}

/**
 * Response envelope for powertrain item collection queries.
 */

export interface PowertrainItemsResponse extends BaseResponse {

  powertrainItems: PowertrainItemResource[];

}
