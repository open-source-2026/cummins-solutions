import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const about = () => import('./shared/presentation/views/about/about').then(m => m.About);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);

// Routes of boundend context preservation ( In the future )




const baseTitle = 'Cummins Solutions';

export const routes: Routes = [

  { path: 'home', component: Home, title: `${baseTitle} - Home`},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'about', loadComponent: about },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Not Found` },

];
