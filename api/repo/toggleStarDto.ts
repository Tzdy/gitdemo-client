import { HttpResponse } from '../HttpResponse';
import { ToggleState } from './share';
export class ToggleStarReqDto {
  repoId: number;
  state: ToggleState;
}
export class ToggleStarResDto extends HttpResponse {}