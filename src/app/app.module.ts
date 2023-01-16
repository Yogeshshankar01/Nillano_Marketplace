import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { AppStoreModule } from './store/AppStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingModule } from './components/loading/loading.component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CommonModule, ...AppStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    LoadingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
