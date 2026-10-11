import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface EngineHubResource extends BaseResource {

  id: number;
  name: string;
  engineType: string;
  capacity: number;

}




export interface EngineHubsResponse extends BaseResponse {

  engineHubs: EngineHubResource[];
}
