import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@nartc/client/core/home').then((m) => m.ClientCoreHomeModule),
  },
];
