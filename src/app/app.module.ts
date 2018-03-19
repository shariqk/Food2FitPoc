import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NearMePage } from '../pages/near-me/near-me'
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { ProfilePage } from '../pages/profile/profile';

//import { PingPage } from '../pages/ping/ping';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage, StorageConfig } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/Network';
import { Connectivity } from '../services/google-maps/connectivity';
import { GoogleMaps } from '../services/google-maps/google-maps';
import { Locations } from '../services/google-maps/locations';

import { AuthService } from '../services/auth/auth.service';
import { FitBitService } from '../services/auth/fitbit.service';
import { Food2FitService } from '../services/food2fit/food2fit.service';
import { EatStreetService } from '../services/eatstreet/eatstreet.service';

//let config = new StorageConfig();
let storage: Storage = new Storage({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    });
/*
  new StorageConfig() {
    name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
  });
*/

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    NearMePage,
    MapPage,
    ListPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    NearMePage,
    MapPage,
    ListPage,
    TabsPage
  ],
  providers: [
    Network,
    Connectivity,
    GoogleMaps,
    Locations,
    EatStreetService,
    Food2FitService,
    Geolocation,
    InAppBrowser,
    FitBitService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
