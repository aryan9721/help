import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string ='';
  password: string = '';

  register() {
    // Perform registration logic here, e.g., make an HTTP request to a backend API
    const userData: any[] = JSON.parse(localStorage.getItem('userData') ?? '[]');
    const user = {
      username: this.username,
      password: this.password
    }
    userData.push(user)
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Sucessfully registered');
  }
}
