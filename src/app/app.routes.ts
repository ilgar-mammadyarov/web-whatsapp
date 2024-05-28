import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'home',
    component: MainComponent,
    title: 'Home page',
  },
];

export default routes;
