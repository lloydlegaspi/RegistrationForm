document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var termsChecked = document.getElementById("terms").checked;
  var dobValue = document.getElementById("dob").value;

  // Validate password match
  if (password !== confirmPassword) {
    Swal.fire({
      title: "Oops!",
      text: "Passwords do not match.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // Validate Terms & Conditions acceptance
  if (!termsChecked) {
    Swal.fire({
      title: "Attention!",
      text: "You must agree to the Terms & Conditions.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }

  // Validate Date of Birth (at least 18 years old)
  if (dobValue) {
    var today = new Date();
    var birthDate = new Date(dobValue);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      Swal.fire({
        title: "Oops!",
        text: "You must be at least 18 years old.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  }

  // All validations passed
  Swal.fire({
    title: "Success!",
    text: "Registration successful!",
    icon: "success",
    confirmButtonText: "OK",
  });
  document.getElementById("regForm").reset();
});

// Password visibility toggle
document.querySelectorAll(".toggle-password").forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    var targetId = this.getAttribute("data-target");
    var input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      this.innerHTML = '<img src="public/eye.png" alt="Hide Password" />';
    } else {
      input.type = "password";
      this.innerHTML = '<img src="public/eye-off.png" alt="Show Password" />';
    }
  });
});
