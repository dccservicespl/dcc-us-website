import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then((x) => x.routes),
      },
      {
        path: 'about_us',
        loadChildren: () => import('./about/about.route').then((x) => x.routes),
      },
      {
        path: 'success_stories',
        loadChildren: () => import('./success_stories/success_stories.route').then((x) => x.routes),
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.route').then((x) => x.routes),
      },
    ],
  },
];
