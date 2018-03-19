import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Geolocation } from 'ionic-native';

import 'rxjs/add/operator/toPromise';

import { FoodSearchResult, FoodPlace, FoodItem, UserProfile, EatStreetSearchResult } from './food2fit.model';

@Injectable()
export class Food2FitService {
  constructor(public http: Http) {}

  _food2FitApiUrl = 'https://food2fitapi20170414114055.azurewebsites.net/api/food2fit';

  getEatingPlaces(location : string) : Observable<EatStreetSearchResult> {
    let url : string = this._food2FitApiUrl + '/getEatingPlaces?' +
      '&location=' + location +
      '&radiusInMiles=5' +
      '&address=';

      console.log('getting', '[' + new Date().toString() + '] ' + url);

      var headers = new Headers();
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('Content-Type', 'application/json');

      return this.http.get(url, headers)
          .map(res => <EatStreetSearchResult>res.json());
  }

  find(category : string, location : string, profileId : string) : Observable<FoodSearchResult>  {
    let url : string = this._food2FitApiUrl + '/find?' +
      '&location=' + location +
      '&category=' + category +
      '&address=' +
      '&profileId=' + profileId;

    console.log('getting', '[' + new Date().toString() + '] ' + url);

    var headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Content-Type', 'application/json');

    return this.http.get(url, headers)
        .map(res => <FoodSearchResult>res.json());
  }

  saveProfile(profileId : string, profile : UserProfile) : Observable<UserProfile> {
    let url : string = this._food2FitApiUrl + '/saveprofile?' +
      '&profileId=' + profileId;

      console.log('posting', '[' + new Date().toString() + '] ' + url);

      var headers = new Headers();
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('Content-Type', 'application/json');

      return this.http.post(url, profile, { headers: headers })
        .map(res => <UserProfile>res.json());
  }

  loadProfile(profileId : string) : Observable<UserProfile> {
    let url : string = this._food2FitApiUrl + '/loadprofile?' +
      '&profileId=' + profileId;

      console.log('getting', '[' + new Date().toString() + '] ' + url);

      var headers = new Headers();
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('Content-Type', 'application/json');

      return this.http.get(url, headers)
          .map(res => <UserProfile>res.json());
  }

}
