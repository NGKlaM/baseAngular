import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/Auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    ToastModule,
    RouterLink,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[MessageService],
})
export class RegisterComponent {
userForm: FormGroup;

constructor(
  private authService: AuthService,
  private formBuilder: FormBuilder,
  private messageService: MessageService,
  private router: Router
){
  this.userForm = this.formBuilder.group({
    email: ['',Validators.required],
    password:['',Validators.required],
    confirmpassword: ['',Validators.required],
  });
}
onSubmit(){
  if (this.userForm.valid) {
    const formData = this.userForm.value;

    if (formData.password === formData.confirmpassword){
      this.authService
      .SignUp({email: formData.email, password: formData.password })
      .subscribe((data: any) =>{
        if (data.status === 0){
          this.messageService.add({
            severity:'success',
            summary: 'Success',
            detail: 'Tạo tài khoản thành công !',
          });
          this.userForm.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email đã tồn tại'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Mật khẩu sai',
      });
    }
  }
}
}
