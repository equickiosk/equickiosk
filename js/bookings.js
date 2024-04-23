function fetchBookings() {
  fetch("/api/booking")
    .then((response) => response.json())
    .then((data) => {
      const bookings = document.getElementById("bookings");
      bookings.innerHTML = ""; // Clear existing data
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.firstName}</td>
                        <td>${item.lastName}</td>
                        <td>${item.contactNumber}</td>
                        <td>${item.email}</td>
                        <td>${item.department}</td>
                        <td>${item.principal}</td>
                        <td>${item.vicePrincipal}</td>
                        <td>${item.guidanceOffice}</td>
                        <td>${item.osd}</td>
                        <td>${item.dateBooked}</td>
                        <td><button class="btn btn-danger" onclick="confirmDelete(${item.id})">Delete</button></td> <!-- Delete button -->
                    `;
        bookings.appendChild(row);
      });
    })
    .catch((error) => {
      console.log(error);
      console.error("Error fetching bookings:", error);
    });
}

function confirmDelete(id) {
  if (confirm(`Are you sure you want to delete ${id}?`)) {
    deleteItem(id);
  }
}

function deleteItem(id) {
  fetch(`/api/booking/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Item with ID ${id} deleted successfully.`);
        fetchBookings(); // Refresh the queue after deletion
      } else {
        console.error("Failed to delete item:", response.status);
      }
    })
    .catch((error) => console.error("Error deleting item:", error));
}

function createCSV() {
  const confirmation = confirm(
    "Are you sure you want to export the bookings to CSV?"
  );
  if (!confirmation) {
    return; // Do nothing if user cancels
  }

  fetch("/api/booking")
    .then((response) => response.json())
    .then((data) => {
      let csvContent =
        "ID,First Name,Last Name,Contact Number,Email,Department,Principal Schedule,Vice Principal Schedule,Guidance Office Schedule,OSD Schedule,Date Booked\n";
      data.forEach((item) => {
        csvContent += `${item.id},${item.firstName},${item.lastName},${item.contactNumber},${item.email},${item.department},${item.principal},${item.vicePrincipal},${item.guidanceOffice},${item.osd},${item.dateBooked}\n`;
      });
      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "bookings.csv";
      link.click();
    })
    .catch((error) => {
      console.error("Error generating CSV:", error);
    });
}

// Fetch queue initially and then refresh every 5 seconds
fetchBookings();
setInterval(fetchBookings, 5000);
