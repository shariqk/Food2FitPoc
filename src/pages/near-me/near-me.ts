import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


import { EatStreetSearchResult } from '../../services/food2fit/food2fit.model';
import { Food2FitService } from '../../services/food2fit/food2fit.service';

import { MapPage } from '../map/map';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-near-me',
  templateUrl: 'near-me.html'
})
export class NearMePage {
  places = new EatStreetSearchResult();
  loaded = false;
  tab1Root: any = MapPage;
  tab2Root: any = ListPage;

  constructor(public navCtrl: NavController,
              public geo : Geolocation,
              public food2Fit : Food2FitService) {}

  ionViewDidEnter() : any {
    if(!this.loaded) {
      //this.doRefresh(null);
    }
  }

  doRefresh(refresher) : void {
    console.log('Getting current location');
    var options = {timeout: 20000, enableHighAccuracy: false};
    this.geo.getCurrentPosition()
        .then((res) => {
          let location = res.coords.latitude + ',' + res.coords.longitude;
          this.doLoadPlacesList(location);
        })
        .catch(
          (err) => {
            alert('Could not read current location');
          });


    if(refresher != null) {
        refresher.complete();
    }
  }

  doLoadPlacesList(location : string) {
    this.food2Fit.getEatingPlaces(location)
      .subscribe(data => {
        console.log("data", data);
        //console.log('get completed', new Date().toString())
        //loader.setContent('Getting ready...');
        this.places = data;
        this.loaded = true;
        //console.log(this.feed.results);
        //loader.dismiss();
      },
      error =>
      {
        //loader.dismiss();
         alert(JSON.stringify(error.json()));
        }
      );
    }

}
