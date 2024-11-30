const mongoose = require("mongoose");
//SCEHEME each datatype would be

const EmployeeModel = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    dateofJoining: { type: Date },
    title: { type: String },
    department: { type: String },
    employeeType: { type: String },
    currentStatus: { type: Boolean, default: true },
});

module.exports = mongoose.model("EmployeeModel", EmployeeModel);
