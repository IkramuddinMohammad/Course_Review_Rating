function validate(form) {
let professorName = document.forms["editcourse_form"]["professorName"].value;
let professorEmail = document.forms["editcourse_form"]["professorEmail"].value;
let taName = document.forms["editcourse_form"]["taName"].value;
let taEmail = document.forms["editcourse_form"]["taEmail"].value;
const professorNameError = document.getElementById('professorNameError');
const professorEmailError = document.getElementById('professorEmailError');
const taNameError = document.getElementById('taNameError');
const taEmailError = document.getElementById('taEmailError');

if(form){
  let valid = false;
  if (professorName.trim().length == 0) {
    professorNameError.style.display = "block";
    professorNameError.innerHTML = "Please enter Professor Name"
    valid= true
      return false
  }
  if (professorEmail.trim().length == 0) {
    professorEmailError.style.display = "block";
    professorEmailError.innerHTML = "Please enter Professor Email"
    valid= true
      return false
  } else if (!validateEmail(professorEmail)) {
    professorEmailError.style.display = "block";
    professorEmailError.innerHTML = "Please enter valid email"
    valid= true
      return false
  }
  if (taName.trim().length == 0) {
    taNameError.style.display = "block";
    taNameError.innerHTML = "Please enter Ta Name"
    valid= true
      return false
  }
  if (taEmail.trim().length == 0) {
    taEmailError.style.display = "block";
    taEmailError.innerHTML = "Please enter Ta Email"
    valid= true
      return false
  } else if (!validateEmail(taEmail)) {
    taEmailError.style.display = "block";
    taEmailError.innerHTML = "Please enter valid email"
    valid= true
      return false
  }
  if (!valid) {
    professorNameError.style.display = "none";
    professorEmailError.style.display = "none";
    taNameError.style.display = "none";
    taEmailError.style.display = "none";
    return true;
  }
}
}