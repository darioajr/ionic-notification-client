import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Push } from '@ionic-native/push';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicPushApp } from './app';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';


@NgModule({
  declarations: [
    IonicPushApp,
    TabsPage,
    HomePage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(IonicPushApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IonicPushApp,
    TabsPage,
    HomePage,
    DetailsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    Push
  ]
})
export class AppModule {
}
