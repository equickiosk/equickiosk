### Create a copy of kiosk-empty.db to kiosk.db
### 1. Open the terminal
### 2. Plug the thermal printer
### 3. Setup the thermal printer
```sh
sudo chmod -R 777 /dev/bus/usb/
```
```sh
sudo udevadm control --reload-rules
```

### 4. For testing the printer
```sh
sudo node test.js
```
```sh
node test.js
```

### 5. For running the server
```sh
sudo npm start
```

### 6. If not working, run this command to refresh the packages
```sh
npm install
```
