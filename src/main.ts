import { bootstrapApplication } from '@angular/platform-browser';
import { LoginpageComponent } from './app/loginpage/loginpage.component';
import { appConfig } from './app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
