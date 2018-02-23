import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class IonicPushApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public push: Push,
              public alertCtrl: AlertController) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '531520126283' //TODO - colocar em configuracao
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - Chamar a API do sistema e enviar o token para a base, 
      //este token, vai ser utilizado para enviar mensagens específicas para o dispositivo
      
      //Em caso de grupos de dispositivos para o mesmo usuario usar a opção de grupos, limitado a 20 dispositivos do mesmo usuario.
      //Em caso de mensagens direcionadas a um tipo de notificação ou alguma forma de grupo, utilizar a opção de tópicos
      //criar um tópico como Filial1, Filial2 e registrar o dispositivo no tópico através do comando abaixo:
      
        let topic = "/topics/HERING11";
        pushObject.subscribe(topic).then((res:any) => {
            console.log("subscribed to topic: ", res);
        });
      

      let alert = this.alertCtrl.create({
        title: 'device token',
        subTitle: data.registrationId,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push(DetailsPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
}

