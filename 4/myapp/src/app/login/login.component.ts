import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    const userData: any[] = JSON.parse(localStorage.getItem('userData') ?? '[]');
    console.log(userData);

    console.log(this.username,this.password);
    
    // Find the user with matching username and password
    const user = userData.find(u => u.username == this.username && u.password == this.password);
    console.log(user);
    
    if (user) {
      alert('Login successful!');
      // Perform the necessary actions after successful login
    } else {
      alert('Invalid username or password.');
      // Handle the case of invalid credentials
    }
  }
}
