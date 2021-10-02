$(document).ready(function () {
  const notice = $(".notice");
  $(".gen-pass-form").submit(function (event) {
    event.preventDefault();
    var digit = $("#digit").val();
    if (digit != 0) {
      var pattern =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789@#$";
      var index = 0;
      var password = "";
      for (var i = 0; i <= digit; i++) {
        index = Math.floor(Math.random() * (pattern.length - 1));
        password += pattern[index];
      }
      $("#password").val(password);
    } else {
      notice.removeClass("d-none");
      notice.html("<b>please enter any digit to get password</b>");
      setTimeout(function () {
        notice.html("");
        notice.addClass("d-none");
      }, 3000);
    }
  });
});
