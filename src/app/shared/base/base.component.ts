import { Component} from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent  {

  haveAdd;
  haveUpdate;
  haveDelete;
  haveView;
  // value: OutputPagePermissionDto;
  // getPermission(accountServiceProxy: AccountServiceProxy, pageId) {
  //   accountServiceProxy
  //     .getPagePermission(
    //      pageId,
  //       jwt_decode(localStorage.getItem('token')).RoleId
  //     )
  //     .subscribe(value => {
  //       value.map(val => {
  //         if (val.type === 0) {
  //           this.haveAdd = true;
  //         } else if (val.type === 1) {
  //           this.haveView = true;
  //         } else if (val.type === 2) {
  //           this.haveUpdate = true;
  //         } else if (val.type === 3) {
  //           this.haveDelete = true;
  //         }
  //       });
  //     });
  // }

}
