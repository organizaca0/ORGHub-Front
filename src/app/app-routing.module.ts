import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home/home.component';
import { ProjetosComponent } from './projetos/projetos/projetos.component';
import { SobreComponent } from './sobre/sobre/sobre.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AuthGuard } from './security/auth-guard';
import { LoginComponent } from './login/login/login.component';
import { UserManagerComponent } from './user-management/user-manager/user-manager.component';
import { AdminRoleGuard } from './security/admin-guard';
import { enviroment } from '../enviroment/enviroment';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'projetos',
    component: ProjetosComponent,
  },
  { 
    path: 'sobre', 
    component: SobreComponent 
  },
  {
    canActivate: [AuthGuard],
    path: 'profile',
    component: ProfileComponent,
  },
  {
    canActivate: [AuthGuard, AdminRoleGuard],
    path: 'user-manager',
    component: UserManagerComponent,
  },
  {
    path: 'orgrow',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: enviroment.mfe.orgrow.remoteEntry,
        exposedModule: './QiaModule' 
      }).then((m) => m.OrgrownModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}