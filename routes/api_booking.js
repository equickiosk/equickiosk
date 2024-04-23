const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(bodyParser.json());

let db = new sqlite3.Database("./kiosk.db");

router.get("/", async (req, res) => {
  try {
    const bookings = await getAllAsync();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const createBookingDto = req.body;
    const booking = await createAsync(createBookingDto);
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const success = await deleteByIdAsync(id);
    if (success) {
      res.status(200).json({ message: "Record deleted successfully" });
    } else {
      res
        .status(404)
        .json({ error: "Record not found or could not be deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

async function getAllAsync() {
  const bookings = [];
  const tableName = "Bookings";
  const query = `SELECT Id, FirstName, LastName, ContactNumber, Email, Department, Principal, VicePrincipal, GuidanceOffice, OSD, DateBooked FROM ${tableName}`;

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      rows.forEach((row) => {
        const booking = {
          id: row.Id,
          firstName: row.FirstName,
          lastName: row.LastName,
          contactNumber: row.ContactNumber,
          email: row.Email,
          department: row.Department,
          principal: row.Principal,
          vicePrincipal: row.VicePrincipal,
          guidanceOffice: row.GuidanceOffice,
          osd: row.OSD,
          dateBooked: row.DateBooked,
        };
        bookings.push(booking);
      });
      resolve(bookings);
    });
  });
}

async function getByIdAsync(id) {
  const tableName = "Bookings";
  const query =
    `SELECT Id, FirstName, LastName, ContactNumber, Email, Department, Principal, VicePrincipal, GuidanceOffice, OSD, DateBooked ` +
    `FROM ${tableName} WHERE Id = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row) {
        resolve({
          id: row.Id,
          firstName: row.FirstName,
          lastName: row.LastName,
          contactNumber: row.ContactNumber,
          email: row.Email,
          department: row.Department,
          principal: row.Principal,
          vicePrincipal: row.VicePrincipal,
          guidanceOffice: row.GuidanceOffice,
          osd: row.OSD,
          dateBooked: row.DateBooked,
        });
      } else {
        resolve(null);
      }
    });
  });
}

async function createAsync(createBookingDto) {
  const tableName = "Bookings";
  const query =
    `INSERT INTO ${tableName} (FirstName, LastName, ContactNumber, Email, Department, Principal, VicePrincipal, GuidanceOffice, OSD, DateBooked) ` +
    `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); SELECT last_row_insert_rowid();`;

  return new Promise((resolve, reject) => {
    db.run(
      query,
      [
        createBookingDto.firstName,
        createBookingDto.lastName,
        createBookingDto.contactNumber,
        createBookingDto.email,
        createBookingDto.department,
        createBookingDto.principal,
        createBookingDto.vicePrincipal,
        createBookingDto.guidanceOffice,
        createBookingDto.osd,
        new Date().toString(),
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        const id = this.lastID;
        getByIdAsync(id)
          .then((booking) => resolve(booking))
          .catch((err) => reject(err));
      }
    );
  });
}

async function deleteByIdAsync(id) {
  const tableName = "Bookings";
  const query = `DELETE FROM ${tableName} WHERE Id = ?`;

  try {
    const rowsAffected = await new Promise((resolve, reject) => {
      db.run(query, [id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });

    return rowsAffected > 0;
  } catch (ex) {
    console.error(`Error deleting record with ID ${id}: ${ex.message}`);
    return false;
  }
}

module.exports = router;
