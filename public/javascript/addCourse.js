function validate(form) {
  let name = document.forms["addcourse_form"]["name"].value;
  let courseId = document.forms["addcourse_form"]["courseId"].value;
  let credits = document.forms["addcourse_form"]["credits"].value;
  let professorName = document.forms["addcourse_form"]["professorName"].value;
  let professorEmail = document.forms["addcourse_form"]["professorEmail"].value;
  let taName = document.forms["addcourse_form"]["taName"].value;
  let taEmail = document.forms["addcourse_form"]["taEmail"].value;
  const nameError = document.getElementById('nameError');
  const courseIdError = document.getElementById('courseIdError');
  const creditsError = document.getElementById('creditsError');
  const professorNameError = document.getElementById('professorNameError');
  const professorEmailError = document.getElementById('professorEmailError');
  const taNameError = document.getElementById('taNameError');
  const taEmailError = document.getElementById('taEmailError');

  if (form) {
    let valid = false;
    if (name.trim().length == 0) {
      nameError.style.display = "block";
      nameError.innerHTML = "Please enter name"
      valid= true
      return false
    }
    if (courseId.trim().length == 0) {
      courseIdError.style.display = "block";
      courseIdError.innerHTML = "Please enter courseId"
      valid= true
      return false
    }
    if (!/^[0-9]+$/.test(credits)) {
      creditsError.style.display = "block";
      creditsError.innerHTML = "Please enter credits"
      valid= true
      return false
    } else if (credits < 1 || credits > 3) {
      creditsError.style.display = "block";
      creditsError.innerHTML = "Please enter credits between 1 and 3"
      valid= true
      return false
    }

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
      nameError.style.display = "none";
      courseIdError.style.display = "none";
      creditsError.style.display = "none";
      professorNameError.style.display = "none";
      professorEmailError.style.display = "none";
      taNameError.style.display = "none";
      taEmailError.style.display = "none";
      return true
    }
  }
}
