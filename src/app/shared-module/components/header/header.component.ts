import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/authService/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username = "";
 initial=""

  designation = "";
  Manager: any = "Mohsin Saeed";
  headerData: any = {
    // title: 'Attendance',
    // tabs:[{title:'My Attendance',url:'connect/attendance', isActive:true},{title:'My Requests',url:'', isActive:false},{title:'Team Requests',url:'', isActive:false}],
    // subtitle: ['My Attendance','My Requests','Team Requests'],
    // isTab: true,
  };
  currentroute: any;
  isWidget: boolean = false;
  constructor(private _headerService: HeaderService, private router: Router, private _authS: AuthService,private sharedService: SharedService) {
    const urlSegments = this.router.url.split('/');
    const moduleSegment = urlSegments[2];
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "";
    this.initial=localStorage.getItem('initial') || "";

    this._headerService.currentHeaderData.subscribe((data:any) => {
      this.headerData = data;
      debugger
      console.log("header Date===>", data)
    });


  }

  showChatWidget() {
    this.isWidget = !this.isWidget;
    this.sharedService.setShowChatWidget(this.isWidget);
  }
  
  signOut() {
    this._authS.doLogout();
  }

  navigateTab(url:any) {
    this.router.navigateByUrl(url);
  }
}
