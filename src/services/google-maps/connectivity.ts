import { Injectable } from '@angular/core';
//import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

declare var Connection;

@Injectable()
export class Connectivity {

  onDevice: boolean;

  constructor(public platform: Platform,
//    private network : Network
)
  {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    return true;

    //if(this.onDevice && this.network.type){
    //  return this.network.type !== '';
    //} else {
    //  return navigator.onLine;
    //}
  }

  isOffline(): boolean {
    return false;

    //if(this.onDevice && Network.connection){
    //  return Network.type == Connection.NONE;
    //} else {
    //  return !navigator.onLine;
    //}
  }

}
