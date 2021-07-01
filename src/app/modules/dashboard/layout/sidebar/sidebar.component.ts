import { AuthService } from './../../../../shared/shared-module/AuthService';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { EventEmitter } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router, NavigationExtras } from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  baseMenuePages = [];

  @Input() hidmenu: boolean;
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.baseMenuePages.forEach((e) => {
      e.show = false;
    });
  }
  ngOnInit() {
    // this.baseMenuePages.push({
    //   name: 'UserManagment',
    //   dname: 'UserManagment',
    //   pages: [
    //     { name: 'Roles', dname: 'Roles' },
    //     { name: 'RolesPermissions', dname: 'RolesPermissions' },
    //     { name: 'Users', dname: 'Users' },
    //   ],
    // });
    this.baseMenuePages.push({
      name: 'usermanagment',
      dname: 'User Management',
      pages: [
        { name: 'Roles', dname: 'Roles' },
        { name: 'Users', dname: 'Users' },
      ],
      show: false,
      materialicons: 'assets/img/icons (6).png',
    });
    
    

    // this.menuePages = this.authService.getMenuPagePermission().filter((em) => em.name !== 'Dashboard');
    // this.baseMenuePages = this.baseMenuePages
    //   .map((value) => {
    //     const mbCheck = this.menuePages.filter((em) => em.name === value.name)[0];
    //     if (mbCheck) {
    //       const cloneValue: any = JSON.parse(JSON.stringify(value));
    //       cloneValue.pages.forEach((val) => {
    //         const page = mbCheck.pages.filter((em) => em.name === val.name)[0];
    //         if (!page) {
    //           // tslint:disable-next-line: triple-equals
    //           value.pages = value.pages.filter((p) => p.name != val.name);
    //         }
    //       });
    //       return value;
    //     }
    //   })
    //   .filter((em) => em !== undefined);
  }
  navigatePage(navigator: string, pageId) {
    this.baseMenuePages.forEach((e) => {
      e.show = false;
    });
    this.authService.currentPage = pageId;
    this.router.navigate([navigator]);
  }
  snb_menu(e) {
    let show_sub = e.show;
    this.baseMenuePages.forEach((el) => {
      el.show = false;
    });
    e.show = !show_sub;
  }
  hide(e) {
    debugger;
    e.show = false;
  }
}
