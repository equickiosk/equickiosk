document.addEventListener("DOMContentLoaded", function () {
  // Function to handle form submission
  document
    .getElementById("dataForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Fetch all bookings to get the count
      fetch("/api/booking")
        .then((response) => {
          if (response.ok) {
            // Parse response body as JSON
            return response.json();
          } else {
            // Throw an error if response is not ok
            throw new Error("Failed to fetch bookings.");
          }
        })
        .then((bookings) => {
          // Check if the number of bookings exceeds 10
          if (bookings.length >= 10) {
            // Display error popup using Swal.fire
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "The bookings are full. Cannot add more bookings.",
              confirmButtonText: "OK",
            });
          } else {
            // If the number of bookings is less than 10, proceed with form submission
            // Get form data
            const formData = new FormData(event.target);

            // Create JSON object to store form data with camelCasing
            const bookingData = {
              firstName: formData.get("first_name"),
              lastName: formData.get("last_name"),
              contactNumber: formData.get("contact_number"),
              email: formData.get("email"),
              department: formData.get("department"),
              principal: formData.get("principal_schedule"),
              vicePrincipal: formData.get("vice_principal_schedule"),
              guidanceOffice: formData.get("guidance_office_schedule"),
              osd: formData.get("osd_schedule"),
            };

            // Send bookingData to server
            fetch("/api/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
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

                // Display success popup using Swal.fire
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
                // Display error popup using Swal.fire
                console.error("Error:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: error.message,
                  confirmButtonText: "OK",
                });
              });
          }
        })
        .catch((error) => {
          // Display error popup using Swal.fire
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            confirmButtonText: "OK",
          });
        });
    });
});
