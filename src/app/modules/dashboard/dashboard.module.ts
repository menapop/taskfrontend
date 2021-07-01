import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule } from '@angular/material/dialog';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UnAuthorizeComponent } from './un-authorize/un-authorize.component';
@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    UnAuthorizeComponent,
  ],
  imports: [
    DashboardRoutingModule,
    // ChartsModule,
    NgbModule,
    CommonModule,
    SharedModule,
    MatDialogModule,
  ],
  providers:[MessageService ]
})
export class DashboardModule { }
