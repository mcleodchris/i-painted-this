import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { EntriesService } from './app/entries.service';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideHttpClient(), EntriesService],
});
