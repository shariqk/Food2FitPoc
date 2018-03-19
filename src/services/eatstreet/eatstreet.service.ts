import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Geolocation } from 'ionic-native';
import { EatStreetSearchResult } from './eatstreet.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EatStreetService {

  _baseUrl : string = 'https://api.eatstreet.com/publicapi/v1/';
  _apiKey : string = '__API_EXPLORER_AUTH_KEY__';
  //_apiKey = '7d86f21fc7ab489c';

  constructor(public http: Http) {}

  search(lat : number, lng : number) : Observable<EatStreetSearchResult>
  {
    let url : string = this._baseUrl + 'restaurant/search?' +
      '&method=both' +
      '&latitude=' + lat +
      '&longitude=' + lng +
      '&pickup-radius=5';

    console.log('getting', '[' + new Date().toString() + '] ' + url);

    var headers = new Headers();
    headers.append('X-Access-Token', this._apiKey);
    headers.append('Accept', 'application/json');

    console.log(headers);

    return this.http.get(url, headers)
        .map(res => <EatStreetSearchResult>res.json());
  }


}
