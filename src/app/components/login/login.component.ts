import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form): void {
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }
    const { usernameOrEmail, password } = form.value;
    this.userService.loginUser(usernameOrEmail, password).subscribe(
      (response: any) => {
        console.log('Login successful', response.message);
        this.router.navigate(['/']); 
      },
      (error) => {
        this.error = error.error.message;
        console.error('Login error:', error.error.message);
        setTimeout(() => {
          this.error = ''
        }, 3000);
      }
    );
  }
}
