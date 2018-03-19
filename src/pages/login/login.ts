import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth/auth.service';
import {TabsPage} from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public auth : AuthService) {

  }

  ionViewDidEnter() : any {
    if(this.auth.authenticated()) {
      this.navCtrl.push(TabsPage);
    }
    else {
      this.auth.login();
      console.log(this.auth);
      this.navCtrl.push(TabsPage);
    }
  }

}
