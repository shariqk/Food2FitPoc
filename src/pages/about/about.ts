import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth/auth.service';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { Http, Headers} from '@angular/http';
import { Storage, StorageConfig } from '@ionic/storage';

import { UserProfile } from '../../services/food2fit/food2fit.model';
import { Food2FitService } from '../../services/food2fit/food2fit.service';

import { FitBitService } from '../../services/auth/fitbit.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  profile : UserProfile = new UserProfile();
  loaded : boolean = false;

  constructor(public navCtrl: NavController,
    public http : Http,
    public auth : AuthService,
    public food2fit : Food2FitService) {
    console.log(location.href);

    }


    ionViewDidEnter() : any {
      if(!this.loaded) {
        this.loadProfile();
      }
    }

    saveProfile()
    {
      const profileId = 'shariq@shariqkhan.com';
      this.food2fit.saveProfile(profileId, this.profile)
        .subscribe(data => {
          console.log("data", data);
          this.profile = data;
        },
        error =>
        {
           alert(JSON.stringify(error.json()));
          }
        );
    }


    loadProfile()
    {
      const profileId = 'shariq@shariqkhan.com';
      this.food2fit.loadProfile(profileId)
        .subscribe(data => {
          console.log("data", data);
          //console.log('get completed', new Date().toString())
          //loader.setContent('Getting ready...');
          this.profile = data;
        },
        error =>
        {
           alert(JSON.stringify(error.json()));
          }
        );
    }
}
