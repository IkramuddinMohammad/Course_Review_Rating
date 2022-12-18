(function ($) {
  const $form = document.getElementById('adminregister_form');
  const passcode = document.getElementById('passcode')
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passcodeError = document.getElementById('passcodeError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const error = document.getElementById('error-msg')

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
    $form.addEventListener("submit", function adminregister(event) {
      event.preventDefault();
      var valid = false;
      var passcodeVal = passcode.value.replace(/\s/g, "");
      var emailVal = email.value.replace(/\s/g, "");
      var passwordVal = password.value.replace(/\s/g, "");

      if (passcodeVal.length == 0) {
        passcodeError.style.display = "block";
        passcodeError.innerHTML = "Please enter firstname"
        $("#passcodeError").show().fadeOut(12000);
        passcodeError.focus();
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
        passcodeError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
      }

      $.ajax({
        type: "Post",
        url: "/courses/admin/register",
        contentType: 'application/json',
        data: JSON.stringify({
          passcode: passcodeVal,
          email: emailVal,
          password: passwordVal
        }),
        dataType: "text",
        success: function (data) {
          window.location.replace("/");
        }, error: function (r) {
          error.innerHTML= r.responseText;
          error.style.display = "show"
        }
      })
    });
  }
})(window.jQuery);