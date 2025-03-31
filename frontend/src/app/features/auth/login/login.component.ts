import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notiffication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notification: NotificationService,
        private router: Router
    ){
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if(this.loginForm.valid){
            this.authService.login(
                this.loginForm.value.email,
                this.loginForm.value.password
            ).subscribe({
                next: () => {
                    this.notification.showSuccess('Login successful');
                },
                error: (err: any) => this.notification.showError(err.message)
            });
        }
    }
}