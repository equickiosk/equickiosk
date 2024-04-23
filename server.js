const express = require("express");
const path = require("path");
const os = require("os");
const app = express();

app.use("/img", express.static(path.join(__dirname, "img")));

app.use("/css", express.static(path.join(__dirname, "css")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);

app.use("/js", express.static(path.join(__dirname, "js")));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use("/js", express.static(path.join(__dirname, "node_modules/glyphicons")));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/sweetalert2/dist"))
);

app.use("/backup", express.static(path.join(__dirname, "backup")));

app.use("/fonts", express.static(path.join(__dirname, "fonts")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "home.html"));
});

app.get("/booking", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "booking.html"));
});

app.get("/enrollment", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "enrollment.html"));
});

app.get("/tutorial", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "tutorial.html"));
});

app.get("/registrar", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "registrar.html"));
});

app.get("/bookings", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "bookings.html"));
});

app.get("/registrars", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "registrars.html"));
});

const apiRegistrar = require("./routes/api_registrar");
app.use('/api/registrar', apiRegistrar);

const apiBooking = require("./routes/api_booking");
app.use('/api/booking', apiBooking);

const map = require("./routes/map");
app.use('/map', map);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages", "blank.html"));
});

const getServerURL = () => {
  const ipAddress = getIPAddress();
  const port = 54765; // Your port number
  return `http://${ipAddress}:${port}`;
};

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress = '';
  for (const interface in interfaces) {
    interfaces[interface].forEach((details) => {
      if (details.family === 'IPv4' && !details.internal) {
        ipAddress = details.address;
      }
    });
  }
  return ipAddress;
};

const port = 54765;

app.listen(port, function () {
  console.log(`Server is up at port ${port}`);
  console.log(`Server IP address: ${getIPAddress()}`); // Print IP address
  console.log(`Server is up at: ${getServerURL()}`);
});