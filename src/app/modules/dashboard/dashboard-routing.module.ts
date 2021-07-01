import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/shared-module/AuthGuardService';
import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UnAuthorizeComponent } from './un-authorize/un-authorize.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'unauthorize',
        component: UnAuthorizeComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'usermanagment',
        loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
      }
    ],
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
