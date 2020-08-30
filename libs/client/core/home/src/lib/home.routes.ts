import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'web-fw',
        pathMatch: 'full',
      },
      {
        path: 'web-fw',
        loadChildren: () =>
          import('@nartc/client/core/web-frameworks').then(
            (m) => m.ClientCoreWebFrameworksModule,
          ),
      },
    ],
  },
];
