import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FoodSearchResult } from '../../services/food2fit/food2fit.model';
import { Food2FitService } from '../../services/food2fit/food2fit.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  results : FoodSearchResult = new FoodSearchResult();
  loaded : boolean = false;

  constructor(public navCtrl: NavController,
              public geo : Geolocation,
              public auth : AuthService,
              public loadingCtrl: LoadingController,
              public food2fit : Food2FitService) {
  }

  ionViewDidEnter() : any {
    if(!this.loaded) {
      this.doRefresh(null);
    }
  }

  doLoadFoodList(location : string, loader : Loading)
  {
    const profileId = 'shariq@shariqkhan.com';
    const catgory = 'Lunch';
    this.food2fit.find(catgory, location, profileId)
      .subscribe(data => {
        //console.log("data", data);
        //console.log('get completed', new Date().toString())
        loader.setContent('Getting ready...');
        this.results = data;
        this.loaded = true;
        //console.log(this.feed.results);
        loader.dismiss();
      },
      error =>
      {
        loader.dismiss();
         alert(JSON.stringify(error.json()));
        }
      );
  }

  doRefresh(refresher) {
    let loader = this.loadingCtrl.create( { content: 'Determining location...'});
    loader.present();

    this.geo.getCurrentPosition({timeout: 20000, enableHighAccuracy: false})
        .then((res) => {
          let location = res.coords.latitude + ',' + res.coords.longitude;

          loader.setContent('Crunching dishes...');
          this.doLoadFoodList(location, loader);
        })
        .catch(
          (err) => {
            loader.dismiss();
            alert('Could not read current location');
          });

/*
      this.geo.getCurrentPosition().then(res => {
        let location = res.coords.latitude + ',' + res.coords.longitude;
        this.doLoadFoodList(location, loader);
      });

*/
      if(refresher != null) {
          refresher.complete();
      }
  }

}
