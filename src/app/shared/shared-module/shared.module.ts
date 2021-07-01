import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from './AuthService';
import { AuthGuardService } from './AuthGuardService';
import { SafePipe } from './Pipes/safe.pipe';
import { SafeHtmlPipe } from './Pipes/safeHtml.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfigService } from '../AppConfigService';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AccountService, API_BASE_URL } from '../swagger/SwaggerGenerated';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { FileUploadModule } from 'primeng/fileupload';
export function getApiBaseUrl(): string {
  return AppConfigService.appConfig.ApiBaseUrl;
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, document.baseURI + '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    InputComponent,
    DropDownComponent,
    SafePipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader, // exported factory function needed for AoT compilation
        deps: [HttpClient],
      },
      isolate: false,
    }),
     InputTextModule,
     TableModule,
      ToastModule,
     ButtonModule,
     DropdownModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FileManagerAllModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    SafePipe,
    SafeHtmlPipe,
    TranslateModule,
    InputComponent,
    InputTextModule,
    TableModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    DropDownComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers:[
     AuthGuardService,
    AuthService,
    AccountService,
    { provide: API_BASE_URL, useFactory: getApiBaseUrl },
    
  //  MessageService,
  ]
})
export class SharedModule { }
