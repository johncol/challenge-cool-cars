import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GiphyService {
  key: string = 'lLTBGayZJGu4bkJTPRC9arjfd9pmPR1S';
  giphyApi: string = `//api.giphy.com/v1/gifs/search?api_key=${this.key}&limit=1&q=`;
  giphyNotFound: string = 'https://media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif';

  constructor(private http: HttpClient) { }

  of(term: string): Observable<string> {
    const resource: string = this.giphyApi + term;
    return this.http.get<any>(resource)
      .map(response => {
        if (response.data.length > 0) {
          return response.data[0].images.original.url;
        }
        return this.giphyNotFound;
      })
  }

}
