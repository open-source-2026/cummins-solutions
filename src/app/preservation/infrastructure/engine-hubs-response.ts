import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of an engine hub.
 */

export interface EngineHubResource extends BaseResource {

  id: number;
  name: string;
  engineType: string;
  capacity: number;

}

/**
 * Response envelope for engine hub collection queries.
 */


export interface EngineHubsResponse extends BaseResponse {

  engineHubs: EngineHubResource[];
}
