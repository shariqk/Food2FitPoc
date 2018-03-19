import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class FitBitService {

  _fitBitClientId : string = '2289CP';
  _fitBitClientSecret = '1c061bf1234e803edc187c939eff3914';
  _fitBitAuthCodeFlowUrl = 'https://www.fitbit.com/oauth2/authorize?response_type=code&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight';
  _fitBitRedirectUrl = 'http://localhost/callback';

  public LoginToken : FitBitAccessTokenModel = null;
  public authenticated : boolean = false;

  constructor(private http : Http,
              private iab: InAppBrowser) {
  }

  public Send(url : string) : Observable<any> {
    var headers = new Headers();
    headers.append('Authorization', this.LoginToken.token_type + ' ' + this.LoginToken.access_token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers })
      .map(res => res.json());
  }

  public Login() : Promise<any> {
    const url : string = this._fitBitAuthCodeFlowUrl +
                '&client_id=' + this._fitBitClientId +
                '&redirect_uri=' + this._fitBitRedirectUrl;

    return new Promise((resolve, reject) => {
          var options = {
           location: 'yes',
           clearcache: 'yes',
           toolbar: 'no'
          };

          console.log('**url', url);
          let browser = this.iab.create(url, '_blank', '');
          let listener = browser.on('loadstart').subscribe((event: any) => {
          //Ignore the authorize screen
          if(event.url.indexOf('oauth2/authorize') > -1){
            return;
          }

          //Check the redirect uri
          if(event.url.indexOf(this._fitBitRedirectUrl) > -1) {
            listener.unsubscribe();
            browser.close();

            let fitBitCode = event.url.split('=')[1].split('#')[0];
            this.getAccessToken(fitBitCode)
              .subscribe(data => {
                console.log('(*) access_token', data.access_token);
                console.log('(*) refresh_token', data.refresh_token);
                console.log('(*) user_id', data.user_id);
                this.LoginToken = data;
                this.authenticated = true;
            });

            resolve(this.LoginToken);
          }
          else {
            reject("Could not authenticate");
        }

      });

    });;

  }

  private getAccessToken(fitBitAuthCode : string) : Observable<FitBitAccessTokenModel> {
    let fitBitTokenUrl = 'https://api.fitbit.com/oauth2/token';
    var authHeader = window.btoa(this._fitBitClientId + ':' + this._fitBitClientSecret);

    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + authHeader);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //let options= new RequestOptions({headers: headers});

    var data = 'grant_type=authorization_code' +
               '&client_id=' + this._fitBitClientId +
               '&code=' + fitBitAuthCode +
               '&redirect_uri=' + this._fitBitRedirectUrl;

      //alert('data=' + data);

      console.log('(*) fitBitTokenUrl', fitBitTokenUrl);
      console.log('(*) data', data);
      console.log('(*) fitBitAuthCode', fitBitAuthCode);
      console.log('(*) Authorization', authHeader);

      return this.http.post(fitBitTokenUrl, data, { headers: headers })
        .map(res => <FitBitAccessTokenModel>res.json());
        /*
        .map(res => FitBitAccessTokenModel)
        .then(data => {
          alert('in then');
          console.log(data.status);
          console.log(data); // data received by server
          console.log(data.headers);
          //resolve(data);
        })
        .catch(error => {
          alert('in catch');
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          console.log(error.errors);
          //resolve(error);
        });

      this.http.post(fitBitTokenUrl, data, { headers: headers })
          .map(res => res.json())
          .subscribe(data => {
              //this.data = data;
              //resolve(data);
          },
          error => alert(error),
            () => console.log("Finished")
      );
      */


//    return this.http.post(fitBitTokenUrl, data, options)
//      .map(res => <FitBitAccessTokenModel>res.json());
  }

}

export interface FitBitAccessTokenModel
{
  access_token : string;
  expires_in : number;
  refresh_token : string;
  token_type : string;
  user_id : string;

}
