document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Collecting user input data from the form
    const fullName = document.getElementById("fullName").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const gradeAndSection = document.getElementById("gradeAndSection").value;
    const purpose = document.getElementById("purpose").value;
    const card = document.querySelector('select[name="CARD"]').value;
    const forms = document.querySelector('select[name="CREDENTIALS"]').value;
    const others = document.getElementById("otherInput").value; // Assuming input field for "OTHERS"

    // Creating the data object with the collected information
    const data = {
      fullName: fullName,
      userName: userName,
      email: email,
      gradeAndSection: gradeAndSection,
      purpose: purpose,
      card: card,
      forms: forms,
      others: others,
    };

    // Sending POST request to the server
    fetch("/api/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Parse response body as JSON
          return response.json();
        } else {
          // Throw an error if response is not ok
          throw new Error("Failed to send data.");
        }
      })
      .then((data) => {
        // Log the returned value from the server
        console.log("Returned value from server:", data);

        // Display success popup
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data sent successfully!",
          confirmButtonText: "OK",
        }).then((result) => {
          // If user clicks OK, navigate to another page
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      })
      .catch((error) => {
        // Display error popup
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          confirmButtonText: "OK",
        });
      });
  });

document.getElementById("cancelButton").addEventListener("click", function () {
  // Redirect to the root URL
  window.location.href = "/";
});
