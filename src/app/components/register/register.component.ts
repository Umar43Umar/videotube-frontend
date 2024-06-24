import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  avatarFile: File | null = null;
  coverImageFile: File | null = null;
  error: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [null, Validators.required],
      coverImage: [null]
    });
  }

  onFileChange(event: any, field: string) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (field === 'avatar') {
          this.avatarFile = file;
        } else if (field === 'coverImage') {
          this.coverImageFile = file;
        }
      };
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.registerForm.value.fullName);
    formData.append('email', this.registerForm.value.email);
    formData.append('username', this.registerForm.value.username);
    formData.append('password', this.registerForm.value.password);

    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile, this.avatarFile.name);
    }

    if (this.coverImageFile) {
      formData.append('coverImage', this.coverImageFile, this.coverImageFile.name);
    }

    console.log('Form data to submit:', formData);

    this.userService.registerUser(formData).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login'])
        this.registerForm.reset();
        this.avatarFile = null;
        this.coverImageFile = null;
      },
      error => {
        this.error = error.error.message;
        console.error('Error registering user', error);
        setTimeout(() => {
          this.error = ''
        }, 3000);
      }
    );
  }
}
