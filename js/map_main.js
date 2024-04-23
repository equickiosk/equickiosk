$(document).ready(function () {
  // Activate Carousel
  $("#mainmap").carousel();

  // Enable Carousel Indicators
  $(".main0").click(function () {
    $("#mainmap").carousel(0);
  });
  $(".main1").click(function () {
    $("#mainmap").carousel(1);
  });
  $(".main2").click(function () {
    $("#mainmap").carousel(2);
  });
  $(".main3").click(function () {
    $("#mainmap").carousel(3);
  });
  $(".main4").click(function () {
    $("#mainmap").carousel(4);
  });
  $(".main5").click(function () {
    $("#mainmap").carousel(5);
  });

  // Enable Carousel Controls
  $(".left").click(function () {
    $("#mainmap").carousel("prev");
  });
  $(".right").click(function () {
    $("#mainmap").carousel("next");
  });
});
