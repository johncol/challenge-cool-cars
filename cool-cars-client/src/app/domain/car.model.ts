import { Observable } from 'rxjs/Observable';

export interface Car {
  id?: string;
  name: string;
  giphyUrl?: Observable<string>;
  _links?: any;
  href?: any;
}
