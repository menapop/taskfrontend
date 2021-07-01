import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Optional
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  private baseUrl: string;
  public isCollapsed = true;
  @ViewChild('navbar-cmp', { static: false }) button;
  notificationsCount;
  subscription: Subscription;

  constructor(
    location: Location,
    public dialog: MatDialog,
    private element: ElementRef,
    private router: Router,
    public translate: TranslateService,
  ) {
    
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
     this.subscription= new Subscription();
    
  }

  pageName = '';
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    this.router.events.subscribe(() => {
      this.getTitle();
    });
 
  }


  ToEnglish() {
    localStorage.setItem('lan', 'en');
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr');
  }

  ToArabic() {
    localStorage.setItem('lan', 'ar');
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');

    document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
  }
  getTitle() {
    /*let pageurl = this.router.url.split('/')[
      this.router.url.split('/').length - 1
    ];
    if (pageurl === undefined) {
      pageurl = 'Home';
    }
    this.translate.get(pageurl).subscribe(value => {
      this.pageName = value;
    });*/
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/Login']);
  }
  sidebarToggle() {
    debugger;
    if (this.sidebarVisible === true) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  } 

  sidebarOpen() {
    this.sidebarVisible = false;
    debugger
    try {
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      const mainPanel = document.getElementsByClassName(
        'main-panel'
      )[0] as HTMLElement;
      // setTimeout(() => {
      //   toggleButton.classList.add('toggled');
      // }, 500);

      document.getElementsByClassName('wrapper')[0].classList.remove('nav-open');
     
   
    } catch (e) {}
  }
  sidebarClose() {
    this.sidebarVisible = true;
    debugger
    try {
      const html = document.getElementsByTagName('html')[0];
      const mainPanel = document.getElementsByClassName(
        'main-panel'
      )[0] as HTMLElement;

      document.getElementsByClassName('wrapper')[0].classList.add('nav-open');
      this.toggleButton.classList.remove('toggled');

   
    } catch (e) {}
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(NotificationComponent, {
    //   width: '350px',
    //   panelClass:"Notification_fix",
    //   position:{
    //     top:'60px',
    //     right:"75px"
    //   },
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

 
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}
