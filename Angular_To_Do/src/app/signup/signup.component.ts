

// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {

//   // ////////////////////////////////////
//   signupForm!: NgForm; 

//   passwordMismatch: boolean = false;

//   constructor(private router: Router) {}

//   onSignup(form: NgForm) {
//     if (form.value.password !== form.value.repassword) {
//       this.passwordMismatch = true;
//       return;
//     }
//     this.passwordMismatch = false;

   
//     let users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

    
//     if (users.some(user => user.email === form.value.email)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Email already exists!'
//       });
//       return; 
//     }

//     // New user addd
//     const newUser = {
//       name: form.value.name,
//       email: form.value.email,
//       password: form.value.password
//     };
//     users.push(newUser);

    
//     localStorage.setItem('users', JSON.stringify(users));

  
//     this.router.navigate(['/login']);
//   }

//   checkPasswords(form: NgForm) {
//     this.passwordMismatch = form.value.password !== form.value.repassword;
//   }
// }


import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  passwordMismatch: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.value.password !== form.value.repassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;
   // const users = JSON.parse(localStorage.getItem('users') || '[]');

       let users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === form.value.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email already exists!'
      });
      return;
    }

    // Local storage signup
    const newUser = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));


    Swal.fire('Success', 'Signup successful! Please log in.', 'success');
         this.router.navigate(['/login']);
         
    // API signup
  //  this.authService.signup(form.value.name, form.value.email, form.value.password).subscribe({
    //   next: () => {
    //     Swal.fire('Success', 'Signup successful! Please log in.', 'success');
    //     this.router.navigate(['/login']);
    //   },
    //   error: () => {
    //     Swal.fire('Error', 'Signup failed. Please try again later.', 'error');
    //   }
    // });
  }
}
