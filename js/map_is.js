$(document).ready(function () {
  // Activate Carousel
  $("#ismap").carousel();

  // Enable Carousel Indicators
  $(".is1").click(function () {
    $("#ismap").carousel(0);
  });
  $(".is2").click(function () {
    $("#ismap").carousel(1);
  });
  $(".is3").click(function () {
    $("#ismap").carousel(2);
  });
  $(".is4").click(function () {
    $("#ismap").carousel(3);
  });
  $(".is5").click(function () {
    $("#ismap").carousel(4);
  });

  // Enable Carousel Controls
  $(".left").click(function () {
    $("#ismap").carousel("prev");
  });
  $(".right").click(function () {
    $("#ismap").carousel("next");
  });
});
