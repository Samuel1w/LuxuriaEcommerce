import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  imports:[CommonModule,FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Output() onClose = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<void>();

  mode: 'login' | 'register' = 'login';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService) {}

  switchMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }

  submit() {
    const action = this.mode === 'login'
      ? this.auth.login(this.email, this.password)
      : this.auth.register(this.email, this.password);

    action.subscribe({
      next: () => {
        this.onSuccess.emit();
        this.onClose.emit();
      },
      error: (err) => this.error = 'Invalid credentials or existing account.'
    });
  }
}
