

// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   isSignupOrLogin: boolean = false;
//   isTodolist: boolean = false;

//   constructor(private router: Router) {
//     // Subscribe to router events to detect route changes
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.checkRoute(event.url);
//       }
//     });
//   }

//   ngOnInit(): void {
//     // Initial route check
//     this.checkRoute(this.router.url);
//   }

//   checkRoute(url: string): void {
//     this.isSignupOrLogin = url.includes('/signup') || url.includes('/login');
//     this.isTodolist = url.includes('/todolist');
//   }

//   onLogout(): void {
//     sessionStorage.removeItem('currentUserEmail'); 
//     this.router.navigate(['/login']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSignupOrLogin: boolean = false;
  isTodolist: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {
    // Subscribe to router events to detect route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  ngOnInit(): void {
    // Initial route check
    this.checkRoute(this.router.url);
  }

  checkRoute(url: string): void {
    this.isSignupOrLogin = url.includes('/signup') || url.includes('/login');
    this.isTodolist = url.includes('/todolist');
    this.isAdmin = url.includes('/admin');
  }

  onLogout(): void {
    sessionStorage.removeItem('currentUserEmail');
    sessionStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/login']);
  }
}