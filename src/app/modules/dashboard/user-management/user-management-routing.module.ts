import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [

  {
    path: 'Roles',

    component: RoleComponent,
  },
  {
    path: 'Users',

    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
