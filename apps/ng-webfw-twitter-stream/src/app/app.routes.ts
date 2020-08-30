import { Routes } from '@angular/router';

export const appRoutes: Routes = [
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
];
