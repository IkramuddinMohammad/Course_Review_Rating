(function ($) {
  const $form = document.getElementById('register_form');
  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const firstnameError = document.getElementById('firstnameError');
  const lastnameError = document.getElementById('lastnameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const error = document.getElementById('error-msg')
  var totalCourse = document.getElementById('total_course')
  let courses = [];
  let coursesError = []
  for(let i=0; i<totalCourse.value; i++){
    let j = i+1
    courses[i] = document.getElementById("coursetaken"+j);
    coursesError[i] = document.getElementById("coursetaken"+j+"Error");
  }
 
  let validateEmail = (email) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email))
      return false;
    return true
  };

  let validatePassword = (password) => {
    const passwordRegex = new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
    if (!passwordRegex.test(password))
      return false;
    return true
  };
  if ($form) {
    $form.addEventListener("submit", function register(event) {
      event.preventDefault();
      var valid = false;
      var firstNameVal = firstName.value.replace(/\s/g, "");
      var lastNameVal = lastName.value.replace(/\s/g, "");
      var emailVal = email.value.replace(/\s/g, "");
      var passwordVal = password.value.replace(/\s/g, "");

      if (firstNameVal.length == 0) {
        firstnameError.style.display = "block";
        firstnameError.innerHTML = "Please enter firstname"
        $("#firstnameError").show().fadeOut(12000);
        valid = true
      }
      let courseVal = []
      if(courses.length>0){
        for(let i=0;i<courses.length;i++){
          courseVal[i] = courses[i].value.toString()
          if (courseVal[i].replace(/\s/g, "") == 0) {
            coursesError[i].style.display = "block";
            coursesError[i].innerHTML = "Please enter courseid"
            $("#coursetaken"+i+"Error").show().fadeOut(12000);
            valid = true
          }
        }
      }else{
            $("#coursesError1").innerHTML = "Please enter courseid"
            $("#coursetaken1Error").show().fadeOut(12000);
            valid = true
      }
      
      if (lastNameVal.length == 0) {
        lastnameError.style.display = "block";
        lastnameError.innerHTML = "Please enter lastname"
        $("#lastnameError").show().fadeOut(12000);
        valid = true
      }

      if (emailVal.length == 0) {
        emailError.style.display = "block";
        emailError.innerHTML = "Please enter email"
        $("#emailError").show().fadeOut(12000);
        valid = true;
      } else if (!validateEmail(emailVal)) {
        emailError.style.display = "block";
        emailError.innerHTML = "Please enter valid email"
        $("#emailError").show().fadeOut(12000);
        valid = true;
      }

      if (passwordVal.length == 0) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Please enter password"
        $("#passwordError").show().fadeOut(12000);
        valid = true;
      } else if (passwordVal.length < 8) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Password should be atleast 8 characters long"
        $("#passwordError").show().fadeOut(12000);
        valid = true;
      } else if (!validatePassword(passwordVal)) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Password should contain one uppercase, one lower case, one special character and one number"
        $("#passwordError").show().fadeOut(12000);
        valid = true;
      }

      if (valid) {
        return;
      } else {
        firstnameError.style.display = "none";
        lastnameError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
      }
      $.ajax({
        type: "Post",
        url: "/students/register",
        contentType: 'application/json',
        data: JSON.stringify({
          firstname: firstNameVal,
          lastname: lastNameVal,
          email: emailVal,
          password: passwordVal,
          courseTaken: courseVal
        }),
        dataType: "text",
        success: function (data) {
           window.location.replace("/");
        },
         error: function (r) {
          error.innerHTML= r.responseText;
          error.style.display = "show"
        }
      })

    });
  }
})(window.jQuery);