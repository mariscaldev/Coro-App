import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Asegúrate de exportar `routes` desde tu app-routing.module.ts
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot(), HttpClientModule),
    provideAnimations(),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
}).catch(err => console.error(err));
