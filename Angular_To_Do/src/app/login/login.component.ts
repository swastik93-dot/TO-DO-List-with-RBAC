


// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
 
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

//   constructor(private router: Router, private authService: AuthService) { }

//   onLogin(form: NgForm) {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const localUser = users.find((user: any) => user.email === form.value.email && user.password === form.value.password);

//     if (localUser) {
//       // Local storage login
//       sessionStorage.setItem('currentUserEmail', localUser.email);
//       this.router.navigate(['/todolist']);
//     } else {

//       this.router.navigate(['/todolist']);
      
 
//     }
//   }
// }


import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) { }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (email === 'admin@gmail.com' && password === '123') {
      sessionStorage.setItem('currentUserEmail', email);
      this.router.navigate(['/admin']);
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const localUser = users.find((user: any) => user.email === email && user.password === password);

      if (localUser) {
        sessionStorage.setItem('currentUserEmail', localUser.email);
        this.router.navigate(['/todolist']);
      } else {
        Swal.fire('Error', 'Invalid email or password', 'error');
      }
    }
  }
}