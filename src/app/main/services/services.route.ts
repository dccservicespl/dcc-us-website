import { Routes } from '@angular/router';
import { ApplicationDevelopment } from './Components/application-development/application-development';
import { Automate } from './Components/automate/automate';

export const routes: Routes = [
  {
    path: 'application-development',
    component: ApplicationDevelopment,
    data: { breadcrumb: 'Application Development' }  // ✅
  },
  {
    path: 'automate',
    component: Automate,
    data: { breadcrumb: 'Automate' }  // ✅
  },

];