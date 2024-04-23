$(document).ready(function () {
  // Activate Carousel
  $("#carousel").carousel();

  // Enable Carousel Indicators
  $(".tutorial1").click(function () {
    $("#carousel").carousel(0);
  });
  $(".tutorial2").click(function () {
    $("#carousel").carousel(1);
  });
  $(".tutorial3").click(function () {
    $("#carousel").carousel(2);
  });
  $(".tutorial4").click(function () {
    $("#carousel").carousel(3);
  });
  $(".tutorial5").click(function () {
    $("#carousel").carousel(4);
  });
  $(".tutorial6").click(function () {
    $("#carousel").carousel(5);
  });
  $(".tutorial7").click(function () {
    $("#carousel").carousel(6);
  });
  $(".tutorial8").click(function () {
    $("#carousel").carousel(7);
  });
  $(".tutorial9").click(function () {
    $("#carousel").carousel(8);
  });

  // Enable Carousel Controls
  $(".left").click(function () {
    $("#carousel").carousel("prev");
  });
  $(".right").click(function () {
    $("#carousel").carousel("next");
  });
});
