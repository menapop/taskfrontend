import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { CreateRoleDto, OutPutPermissionDto, OutPutRoleDto, PermissionService, RoleService, UpdateRoleDto } from 'src/app/shared/swagger/SwaggerGenerated';
import { NumberValidators } from 'src/app/shared/Validators/number.validator';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit  {
  form: FormGroup;
  allRoles: OutPutRoleDto[];
  allPermissions:OutPutPermissionDto[]
  isUpdate = false;
  deleteId;
  selectedValues: string[] = [];
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private translate: TranslateService,
    private messageService: MessageService,
    private permissionService: PermissionService
  ) {
    super();
  }

  cols;
  ngOnInit(): void {
    this.GetAllPermissions();
    this.getAllRole();    
    this.createForm();
  }

 GetAllPermissions()
 {
   this.permissionService.getAllPermissions().subscribe(res=>{
     this.allPermissions=res;
   })
 }

  createForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      permissions:new FormControl([],[Validators.required]),
    //  hasFullAccess:new FormControl()
    });
   
  }
 
 
  getAllRole() {
    this.roleService.getAllRoles().subscribe((value) => {
      this.allRoles = value;
      this.cols = [{ field: 'name', header: 'Name' }];
      debugger;
    });
  }
  setEdit(allRoles: OutPutRoleDto) {    
    this.roleService.updateRoleGet(allRoles.id).subscribe(res=>{
      this.form.patchValue( {...res,permissions:res.permissions.map(i=>i.toString())});
    })
     
  }
  addRole() {
    console.log(this.form.value)
    if (this.form.valid) {
      let createRoleDto: CreateRoleDto = {
        name: this.form.value.name,   
        permissions:this.form.value.permissions.map((i) => Number(i)),
        hasFullAccess:false,
      } as CreateRoleDto;

      this.roleService.addRole(createRoleDto).subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('success'),
            detail: this.translate.instant('RecoredAdded'),
          });
          this.createForm();
          this.getAllRole();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('Error'),
            detail: this.translate.instant('RecoredIsExist'),
          });
          this.createForm();
        }
      );
    }
  }
  updateRole() {
    if (this.form.valid) {
      var updateRoleDto: UpdateRoleDto = {
        id: this.form.value.id,
        name: this.form.value.name,       
        permissions:this.form.value.permissions.map((i) => Number(i)),
      } as UpdateRoleDto;
      this.roleService.updateRolePost(updateRoleDto).subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('success'),
            detail: this.translate.instant('RecoredUpdated'),
          });
          this.isUpdate = false;
          this.createForm();
          this.getAllRole();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('Error'),
            detail: this.translate.instant('CanotUpdateRecord'),
          });
          this.createForm();
        }
      );
    }
  }

  
  //#region Delete

  showDeleteConfirm(value) {
    this.deleteId = value;
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure you whant to Delete This?',
      detail: 'Confirm to proceed',
    });
  }

  onDeleteConfirm() {
    this.roleService.deleteRole(this.deleteId).subscribe(
      (value) => {
        this.deleteId = 0;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Role Deleted',
        });
        this.isUpdate = false;
        this.createForm();
        this.getAllRole();
      },
      (error) => {
        this.deleteId = 0;
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('Error'),
          detail: this.translate.instant('Error'),
        });
      }
    );
    this.messageService.clear('c');
  }

  onDeleteReject() {
    this.messageService.clear('c');
  }
}
