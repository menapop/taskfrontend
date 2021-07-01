import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CreateUserDto, OutPutRoleDto, OutputUserDto, RoleService, UpdateUserDto, UserService } from 'src/app/shared/swagger/SwaggerGenerated';
import {FileSaver} from 'file-saver';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  FileTitle='Users';
  form: FormGroup;
  allUsers: OutputUserDto[];
  allRoles : OutPutRoleDto[];
  isUpdate = false;
  deleteId;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService : RoleService,
    private translate: TranslateService,
    private messageService: MessageService,
  ) {}

  cols;
  ngOnInit(): void {
    this.getAllRoles();
    this.getAllUsers();    
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      password:new FormControl('', [Validators.required]),
      roles: new FormArray([
        this.AddRoleFormGroup()
      ])
    });
    
   
  }
  AddRoleFormGroup() : FormGroup
  {
    return  this.fb.group(
      {
        roleId:new FormControl('',[Validators.required]),
      });
  }
 
  public get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  addRole() {
    this.roles.push(
      this.fb.group({
        roleId: new FormControl('', [Validators.required]),
      })
    );
  }

  deleteRole(index) {
    this.roles.removeAt(index);
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((value) => {
      this.allUsers = value;
      this.allUsers = value.map((em) => {
        em.roles = em.roles.map((es) => ({
          roleId: es,
        })) as any;
        return em;
      });
      this.cols = [
        { field: 'firstName', header: 'first Name' },
        { field: 'middleName', header: 'middleName' },
        { field: 'lastName', header: 'last Name' },
        { field: 'email', header: 'email' },
        {field: 'mobile', header: 'mobile' },
    
    ];
     
    });
  }

  getAllRoles()
  {
    this.roleService.getAllRoles().subscribe(res=>{
      this.allRoles=res;
      console.log(this.allRoles)
    })
  }
  setEdit(allUsers: OutputUserDto) {    
   console.log(allUsers);
     
     for( let i=0;i<allUsers.roles.length-1;i++)
       {
        this.roles.push(
          this.fb.group({
            roleId: new FormControl('', [Validators.required]),
          })
        );
       }
       this.form.patchValue(allUsers);
  }
  addUser() {
    if (this.form.valid) {
      let createUserDto: CreateUserDto = {
       email:this.form.value.email,
       firstName:this.form.value.firstName,
       lastName:this.form.value.lastName,
       middleName:this.form.value.middleName,
       mobile:this.form.value.mobile,
       password:this.form.value.password,
       roles:this.form.value.roles.map((em) => Number(em.roleId))
      } as CreateUserDto;

      this.userService.addUser(createUserDto).subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('success'),
            detail: this.translate.instant('RecoredAdded'),
          });
          this.createForm();
          this.getAllUsers();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('Error'),
            detail: this.translate.instant('EmailIsExist'),
          });
          this.createForm();
        }
      );
    }
  }
  updateUser() {
    if (this.form.valid) {
      var updateUserDto: UpdateUserDto = {
        id:this.form.value.id,
        email:this.form.value.email,
       firstName:this.form.value.firstName,
       lastName:this.form.value.lastName,
       middleName:this.form.value.middleName,
       mobile:this.form.value.mobile,
       roles:this.form.value.roles.map((em) => Number(em.roleId))     
      } as UpdateUserDto;
      console.log(updateUserDto);
      this.userService.updateUser(updateUserDto).subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('success'),
            detail: this.translate.instant('RecoredUpdated'),
          });
          this.isUpdate = false;
          this.createForm();
          this.getAllUsers();
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
      summary: 'Are you sure you want to delete this User?',
      detail: 'Confirm to proceed',
    });
  }

  onDeleteConfirm() {
    this.userService.deleteUser(this.deleteId).subscribe(
      (value) => {
        this.deleteId = 0;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Role Deleted',
        });
        this.isUpdate = false;
        this.createForm();
        this.getAllUsers();
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


saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

}