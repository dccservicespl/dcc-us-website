import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/main/home', pathMatch: 'full' },
  {
    path: 'main',
    data: { breadcrumb: null },  
    children: [
      {
        path: '',
        loadChildren: () => import('./app/main/main.routes').then((x) => x.routes),
      },
    ],
  },
  { path: '**', redirectTo: '/main/home' },
];