// Assuming you have Mongoose imported and your database connection established

const mongoose = require('mongoose');

// Define Doctor schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  // Add more fields as needed, such as age, specialty, etc.
});

// Create Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
