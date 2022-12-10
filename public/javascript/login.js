(function ($) {
  const $form = $('#login');
  var $form = $('#login-form'),
    email = $('#email'),
    password = $('#password')
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
  $form.addEventListener("submit", function login(event) {
    event.preventDefault();
    $(".error-msg").hide();
    var valid = false;
    var emailVal = email.val();
    var passwordVal = password.val();
    if (emailVal.trim().length == 0) {
      $("#emailError").innerHTML = "Please enter email"
      $("#emailError").show().fadeOut(5000);
      valid = true;
    } else if (!validateEmail(emailVal)) {
      $("#emailError").innerHTML = "Please enter valid email"
      $("#emailError").show().fadeOut(5000);
      valid = true;
    }

    if (passwordVal.trim().length == 0) {
      $("#passwordError").innerHTML = "Please enter password"
      $("#passwordError").show().fadeOut(5000);
      valid = true;
    } else if (passwordVal.length < 8) {
      $("#passwordError").innerHTML = "Password should be atleast 8 characters long"
      $("#passwordError").show().fadeOut(5000);
      valid = true;
    } else if (!validatePassword(passwordVal)) {
      $("#passwordError").innerHTML = "Password should contain one uppercase, one lower case, one special character and one number"
      $("#passwordError").show().fadeOut(5000);
      valid = true;
    }

    if (valid) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "/students/login",
      contentType: "application/json",
      data: JSON.stringify({
        username: emailVal,
        password: passwordVal,
      }),
      dataType: "text",
      success: function (responseMessage) {
        window.location.replace("/");
      },
      error: function (responseError) {
        console.log(responseError);
        error.innerHTML = JSON.parse(
          responseError.responseText
        ).message.preventXSS();
        error.show();
      },
    });
  });
})(window.jQuery);