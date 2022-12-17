(function ($) {
    const $form = document.getElementById('editcourse_form');
    const professorNameError = document.getElementById('professorNameError');
    const professorEmailError = document.getElementById('professorEmailError');
    const taNameError = document.getElementById('taNameError');
    const taEmailError = document.getElementById('taEmailError');
    let validateEmail = (email) => {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!emailRegex.test(email))
          return false;
        return true
      };
    if($form){
    $form.addEventListener("submit", function addCourse(event) {
        event.preventDefault();
    var valid = false;
    
    let professorName = document.forms["editcourse_form"]["professorName"].value;
    let professorEmail = document.forms["editcourse_form"]["professorEmail"].value;
    let taName = document.forms["editcourse_form"]["taName"].value;
    let taEmail = document.forms["editcourse_form"]["taEmail"].value;


if (professorName.trim().length == 0) {
    professorNameError.style.display = "block";
    professorNameError.innerHTML = "Please enter Professor Name"
    $("#professorNameError").show().fadeOut(12000);
    valid = true;
}
if (professorEmail.trim().length == 0) {
    professorEmailError.style.display = "block";
    professorEmailError.innerHTML = "Please enter Professor Email"
    $("#professorEmailError").show().fadeOut(12000);
    valid = true;
}else if (!validateEmail(professorEmail)) {
    professorEmailError.style.display = "block";
    professorEmailError.innerHTML = "Please enter valid email"
    $("#professorEmailError").show().fadeOut(12000);
    valid = true;
  }
if (taName.trim().length == 0) {
    taNameError.style.display = "block";
    taNameError.innerHTML = "Please enter Ta Name"
    $("#taNameError").show().fadeOut(12000);
    valid = true;
}
if (taEmail.trim().length == 0) {
    taEmailError.style.display = "block";
    taEmailError.innerHTML = "Please enter Ta Email"
    $("#taEmailError").show().fadeOut(12000);
    valid = true;
}else if (!validateEmail(taEmail)) {
    taEmailError.style.display = "block";
    taEmailError.innerHTML = "Please enter valid email"
    $("#taEmailError").show().fadeOut(12000);
    valid = true;
  }
if (valid) {
    return;
} else {
    professorNameError.style.display = "none";
    professorEmailError.style.display = "none";
    taNameError.style.display = "none";
    taEmailError.style.display = "none";
}
});
}
})(window.jQuery);