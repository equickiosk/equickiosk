const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const device  = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp1');

const options = { encoding: "GB18030" /* default */ }

const printer = new escpos.Printer(device, options);

device.open(function(error){
  printer
  .font('a')
  .align('lt')
  .style('normal')
  .size(1, 1)
  .text('Printer testing')
  .cut()
  .close();
});
