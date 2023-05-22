$(document).ready(function() {
    // Check if local storage is supported
    if (typeof(Storage) === "undefined") {
      alert("Local storage is not supported in this browser.");
      return;
    }
  
    // Check if user data is already stored in local storage
    var userData = localStorage.getItem("userData");
    if (userData) {
      displayUserData(JSON.parse(userData));
    }
  
    // Handle form submission
    $("#registration-form").submit(function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get user input
      var name = $("#name").val();
      var email = $("#email").val();
      var username = $("#username").val();
  
      // Create an object with user data
      var user = {
        name: name,
        email: email,
        username: username
      };
  
      // Send the user data to the server using AJAX POST request
      $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts", // JSONPlaceholder URL
        type: "POST",
        data: JSON.stringify(user),
        contentType: "application/json",
        success: function(response) {
          // Store the user data in local storage
          var storedData = localStorage.getItem("userData");
          var userData = storedData ? JSON.parse(storedData) : [];
          userData.push(user);
          localStorage.setItem("userData", JSON.stringify(userData));
  
          // Display the user data on a new page
          displayUserData(userData);
  
          // Redirect to the new page
        //   window.location.href = "data-list.html"; // Replace with your data list page URL
        },
        error: function() {
          alert("An error occurred while processing your request. Please try again.");
        }
      });
    });
  
    // Function to display user data on a new page
    function displayUserData(userData) {
      var dataListHTML = "<h2>Data List</h2>";
      if (userData.length === 0) {
        dataListHTML += "<p>No user data available.</p>";
      } else {
        dataListHTML += "<ul>";
        userData.forEach(function(user) {
          dataListHTML += "<li>Name: " + user.name + "</li>";
          dataListHTML += "<li>Email: " + user.email + "</li>";
          dataListHTML += "<li>Username: " + user.username + "</li>";
          dataListHTML += "<br>";
        });
        dataListHTML += "</ul>";
      }
  
      $("body").html(dataListHTML);
    }
  });
  