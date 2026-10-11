import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface EngineHubResponse extends BaseResponse {

  id: number;
  name: string;
  engineType: string;
  capacity: number;

}


export interface EngineHubsResponse extends BaseResponse {

  engineHubs: EngineHubResponse[];
}
