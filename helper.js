const { ObjectId } = require('mongodb');
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//const regex = new RegExp('([A-Za-z0-9  ])\w+');
const passwordRegex = new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
const adminCookieString = "AdminCookie"

let sessionValidation =  (authcookie) => {
  let studentLoggedIn = false, adminLoggedIn =false;
  let studentId = "", adminId="";
  if (authcookie === adminCookieString) {
    studentLoggedIn = false;
    adminLoggedIn = true;
    adminId = authcookie
  }else{
    studentId= authcookie
  }
  if (!studentId) studentLoggedIn = false;
  else studentLoggedIn = true;
  return {adminLoggedIn: adminLoggedIn, studentLoggedIn:studentLoggedIn, studentId:studentId, adminId:adminId}
}


let semsterValue =  (semsterval) => {
  var reg = /[^0-9](?=[0-9])/g;
  var result = semsterval.replace(reg, '$& ');
  return (result[0].toUpperCase() + result.slice(1))
}
let validateId = (methodName, id, tex) => {
  if (!id) throw `${methodName}: ${tex} provide valid id`;
  if (typeof id !== 'string') throw `${methodName}: ${tex} should be a string`;
  if (id.trim().length === 0) throw `${methodName}: ${tex} cannot be empty or space`;
  id = id.trim();
  if (!ObjectId.isValid(id)) throw `${methodName}: ${tex} invalid object id`;
  return id
}; 

let validateName = (methodName, name, nameString) => {
  if (!name) throw `${methodName}: ${nameString} should not be empty`;
  if (typeof name !== "string") throw `${methodName}: ${nameString} is not a string`;
  name = name.trim();
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(specialChars.test(name)== true) throw `${methodName}: ${nameString} name cannot have special characters`;;
  if (name === "") throw `${methodName}: ${nameString} cannot be blank spaces`;
  return name;
};

let validateString = (methodName, name, nameString) => {
  if (!name) throw `${methodName}: ${nameString} should not be empty`;
  if (typeof name !== "string") throw `${methodName}: ${nameString} is not a string`;
  name = name.trim();
  if (name === "") throw `${methodName}: ${nameString} cannot be blank spaces`;
  return name;
};


let validateEmail = (methodName, email, emailString) => {
  if (!email) throw `${methodName}: ${emailString} should not be empty`;
  if (typeof email !== "string") throw `${methodName}: ${emailString} is not a string`;
  email = email.trim();
  if (email === "") throw `${methodName}: ${emailString} should not be blank spaces`;
  if (!emailRegex.test(email)) throw `${methodName}: ${emailString} is not proper format`;
  return email
};

let validatePassword = (methodName, password) => {
  if (!password) throw `${methodName}: Password should not be empty`;
  if (typeof password !== "string") throw `${methodName}: Password is not a string`;
  password = password.trim();
  if (password === "") throw `${methodName}: Password should not be blank spaces`;
  if (password.length < 6) throw `${methodName}: Password length is less than four characters`;
  if (!password.match(passwordRegex)) throw `${methodName}: Password format should have atleast one uppercase, one lower case, one numeric value and one special character`;
  return password;
};

let validateNumber = (methodName, num, tex) => {
  if (!num) throw `${methodName}: ${tex} should not be empty `;
  if (typeof num != "number") throw `${methodName}: ${tex} is not a number`;
  return num;
};

module.exports = {
  sessionValidation,
  semsterValue,
  validateId,
  validateName,
  validateEmail, 
  validatePassword, 
  validateNumber,
  validateString
};