const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(bodyParser.json());

let db = new sqlite3.Database("./kiosk.db");

router.get("/", async (req, res) => {
  try {
    const registrars = await getAllAsync();
    res.status(200).json(registrars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const createRegistrarDto = req.body;
    const registrar = await createAsync(createRegistrarDto);
    res.status(201).json(registrar);
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
  const registrars = [];
  const tableName = "Registrars";
  const query = `SELECT Id, FullName, UserName, Email, GradeAndSection, Purpose, Card, Forms, Others, DateRegistered FROM ${tableName}`;

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      rows.forEach((row) => {
        const registrar = {
          id: row.Id,
          fullName: row.FullName,
          userName: row.UserName,
          email: row.Email,
          gradeAndSection: row.GradeAndSection,
          purpose: row.Purpose,
          card: row.Card,
          forms: row.Forms,
          others: row.Others,
          dateRegistered: row.DateRegistered,
        };
        registrars.push(registrar);
      });
      resolve(registrars);
    });
  });
}

async function getByIdAsync(id) {
  const tableName = "Registrars";
  const query =
    `SELECT Id, FullName, UserName, Email, GradeAndSection, Purpose, Card, Forms, Others, DateRegistered ` +
    `FROM ${tableName} WHERE Id = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row) {
        thermalPrint(row);
        resolve({
          id: row.Id,
          fullName: row.FullName,
          userName: row.UserName,
          email: row.Email,
          gradeAndSection: row.GradeAndSection,
          purpose: row.Purpose,
          card: row.Card,
          forms: row.Forms,
          others: row.Others,
          dateRegistered: row.DateRegistered,
        });
      } else {
        resolve(null);
      }
    });
  });
}

async function createAsync(createRegistrarDto) {
  const tableName = "Registrars";
  const query =
    `INSERT INTO ${tableName} (FullName, UserName, Email, GradeAndSection, Purpose, Card, Forms, Others, DateRegistered) ` +
    `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); SELECT last_insert_rowid();`;

  return new Promise((resolve, reject) => {
    db.run(
      query,
      [
        createRegistrarDto.fullName,
        createRegistrarDto.userName,
        createRegistrarDto.email,
        createRegistrarDto.gradeAndSection,
        createRegistrarDto.purpose,
        createRegistrarDto.card,
        createRegistrarDto.forms,
        createRegistrarDto.others,
        new Date().toString(),
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        const id = this.lastID;
        getByIdAsync(id)
          .then((registrar) => resolve(registrar))
          .catch((err) => reject(err));
      }
    );
  });
}

async function deleteByIdAsync(id) {
  const tableName = "Registrars";
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

function thermalPrint(row) {
  try {
    const escpos = require("escpos");
    escpos.USB = require("escpos-usb");
    const device = new escpos.USB();
    const options = { encoding: "GB18030" /* default */ };
    const printer = new escpos.Printer(device, options);
    console.log('Printing');
    device.open(function (error) {
      printer
        .font("a")
        .align("lt")
        .style("normal")
        .size(1, 1)
        .text(`ID: ${row.Id}`)
        .text(`Full Name: ${row.FullName}`)
        .text(`Email: ${row.Email}`)
        .text(`Grade and Section: ${row.GradeAndSection}`)
        .text(`Purpose: ${row.Purpose}`)
        .text(`Card: ${row.Card}`)
        .text(`Forms: ${row.Forms}`)
        .text(`Others: ${row.Others}`)
        .text(`Date Registered: ${row.DateRegistered}`)
        .cut()
        .close();
    });
  } catch (ex) {
    console.log(ex);
    console.error(`Error printing: ${ex.message}`);
    return false;
  }
}

module.exports = router;
