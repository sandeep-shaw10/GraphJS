"use strict";

$(document).ready(function () {
  //Set pevious State
  var SIZE = 22;
  var SPEED = 3;
  var ALGORITHM = 1;
  var startid, endid; //Initial Function

  displayGrid(SIZE); //sIZE SPEED AND SIZE

  $("[type=range]").change(function () {
    var newval = $(this).val(); //console.log(newval);

    if (this.id == "speed") {
      $("#speed_dis").text(newval);
      SPEED = newval;
    } else {
      $("#size_dis").text(newval);
      SIZE = newval;
      displayGrid(SIZE);
    }
  }); //Display grid Function

  function displayGrid(x) {
    $(".screen").html(" ");
    screenWidth = $(".screen").innerWidth() / SIZE;

    for (var i = 0; i < x * x; i++) {
      $(".screen").append('<div class="unit" id="' + i + '"></div>');
    }

    $(".unit").css("width", screenWidth + "px");
    $(".unit").css("height", screenWidth + "px");
  } //Resize Event Handler


  $(window).on("resize", function () {
    displayGrid(SIZE);
  }); //cHOOSE aLGORITHM

  $("#algo-select").on("click", function () {
    var choice = $(".form-select").val();

    if (choice == 1) {
      $(".title h1").text("Breadth First Search");
    } else if (choice == 2) {
      $(".title h1").text("Depth First Search");
    } else if (choice == 3) {
      $(".title h1").text("Dijkstra Algorithm");
    } else {
      $(".title h1").text("A* Algorithm");
    }

    ALGORITHM = choice;
  }); //oNCLICK HAndle Visualization

  $("#start").on("click", function () {
    decoder(ALGORITHM);
  }); //Handle algorithm visualization

  function decoder(algo) {
    if (algo == 1) {
      console.log("Call BFS");
    } else if (algo == 2) {
      console.log("Call DFS");
    } else if (algo == 3) {
      console.log("Call dJ");
    } else {
      console.log("Call aS");
    }
  } //Display---Animation---Onclick


  $(".unit").on('dblclick', function () {
    //console.log(startid);
    //console.log(endid);
    if (startid == undefined) {
      $(this).css("background", "#262626");
      startid = $(this).attr("id");
    } else if (endid == undefined) {
      $(this).css("background", "#262626");
      endid = $(this).attr("id");
    } else {//pass;
    }
  }); //Making Wall
  //generating wall array
  //Applying Algorithm one-by-one
  //===============================
});