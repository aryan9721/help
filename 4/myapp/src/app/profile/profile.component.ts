import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData: any; // Change the type according to your user data structure

  getUserData() {
    // Perform logic to fetch user data, e.g., make an HTTP request to a backend API
    // Assign the fetched user data to the `userData` property
    this.userData = {
      username: 'JohnDoe',
      email: 'john.doe@example.com'
      // Include other user data properties as needed
    };
  }
}
