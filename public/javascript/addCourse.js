(function ($) {
    const $form = document.getElementById('addcourse_form');
    const nameError = document.getElementById('nameError');
    const courseIdError = document.getElementById('courseIdError');
    const creditsError = document.getElementById('creditsError');
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
    
    let name = document.forms["addcourse_form"]["name"].value;
    let courseId = document.forms["addcourse_form"]["courseId"].value;
    let credits = document.forms["addcourse_form"]["credits"].value;
    let professorName = document.forms["addcourse_form"]["professorName"].value;
    let professorEmail = document.forms["addcourse_form"]["professorEmail"].value;
    let taName = document.forms["addcourse_form"]["taName"].value;
    let taEmail = document.forms["addcourse_form"]["taEmail"].value;
    
    if (name.trim().length == 0) {
        nameError.style.display = "block";
        nameError.innerHTML = "Please enter name"
        $("#nameError").show().fadeOut(12000);
        valid = true;
    }
    if (courseId.trim().length == 0) {
        courseIdError.style.display = "block";
        courseIdError.innerHTML = "Please enter courseId"
        $("#courseIdError").show().fadeOut(12000);
        valid = true;
    }
    if (!/^[0-9]+$/.test(credits)) {
        creditsError.style.display = "block";
        creditsError.innerHTML = "Please enter credits"
        $("#creditsError").show().fadeOut(12000);
        valid = true;
    } else if (credits < 1 || credits > 3) {
        creditsError.style.display = "block";
        creditsError.innerHTML = "Please enter credits between 1 and 3"
        $("#creditsError").show().fadeOut(12000);
        valid = true;
    }

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
    nameError.style.display = "none";
    courseIdError.style.display = "none";
    creditsError.style.display = "none";
    professorNameError.style.display = "none";
    professorEmailError.style.display = "none";
    taNameError.style.display = "none";
    taEmailError.style.display = "none";
}
});
}
})(window.jQuery);