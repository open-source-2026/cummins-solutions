import {
  ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [

    provideZonelessChangeDetection(), // Uses Angular change detection without Zone.js.

    provideBrowserGlobalErrorListeners(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
      fallbackLang: 'en'
    }),
    provideHttpClient(), // provides HttpClient for making HTTP requests
    provideRouter(routes),

  ]
};
