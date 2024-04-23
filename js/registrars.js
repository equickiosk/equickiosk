function fetchRegistrars() {
  fetch("/api/registrar")
    .then((response) => response.json())
    .then((data) => {
      const registrars = document.getElementById("registrars");
      registrars.innerHTML = ""; // Clear existing data
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.fullName}</td>
                        <td>${item.userName}</td>
                        <td>${item.email}</td>
                        <td>${item.gradeAndSection}</td>
                        <td>${item.purpose}</td>
                        <td>${item.card}</td>
                        <td>${item.forms}</td>
                        <td>${item.others}</td>
                        <td>${item.dateRegistered}</td>
                        <td><button class="btn btn-danger" onclick="confirmDelete(${item.id})">Delete</button></td> <!-- Delete button -->
                    `;
        registrars.appendChild(row);
      });
    })
    .catch((error) => {
      console.log(error);
      console.error("Error fetching registrars:", error);
    });
}

function confirmDelete(id) {
  if (confirm(`Are you sure you want to delete ${id}?`)) {
    deleteItem(id);
  }
}

function deleteItem(id) {
  fetch(`/api/registrar/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Item with ID ${id} deleted successfully.`);
        fetchRegistrars(); // Refresh the queue after deletion
      } else {
        console.error("Failed to delete item:", response.status);
      }
    })
    .catch((error) => console.error("Error deleting item:", error));
}

// Fetch queue initially and then refresh every 5 seconds
fetchRegistrars();
setInterval(fetchRegistrars, 5000);
