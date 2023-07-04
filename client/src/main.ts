import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes/routes';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/components/app/app.component';
import { EntryService } from './app/services/entry.service';
import { UserService } from './app/services/user.service';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideHttpClient(), EntryService, UserService],
});
