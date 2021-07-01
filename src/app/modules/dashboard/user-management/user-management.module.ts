import { NgModule } from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { PermissionService, RoleService, UserService } from 'src/app/shared/swagger/SwaggerGenerated';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    RoleComponent,
    UsersComponent
  ],
  imports: [
    SharedModule,
    UserManagementRoutingModule,
    CheckboxModule
  ],
  providers:[RoleService,UserService,PermissionService]
})
export class UserManagementModule { }
