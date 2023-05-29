//serial number generator function

const fs = require("fs");
const path = require("path");

const CUSTOM_DIRECTORY = path.join(__dirname, "../public/files");
const SERIAL_NUMBER_FILE = path.join(CUSTOM_DIRECTORY, "serial_number.txt");
let currentNumber;

function initializeSerialNumber() {
  try {
    const serialNumberData = fs.readFileSync(SERIAL_NUMBER_FILE, "utf8");
    currentNumber = parseInt(serialNumberData, 10);
    if (isNaN(currentNumber)) {
      throw new Error("Invalid serial number data");
    }
  } catch (err) {
    currentNumber = 0;
  }
}

function generateSerialNumber() {
  currentNumber++;
  const serialNumber = currentNumber.toString().padStart(4, "0");
  fs.mkdirSync(CUSTOM_DIRECTORY, { recursive: true });
  fs.writeFileSync(SERIAL_NUMBER_FILE, currentNumber.toString(), "utf8");
  return serialNumber;
}

// Initialize the serial number on server start
initializeSerialNumber();

module.exports = {
  generateSerialNumber,
};

