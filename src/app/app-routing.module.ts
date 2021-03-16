import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
  import {SearchComponent} from './search/search.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: '/search', pathMatch: 'full' },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  }
];
