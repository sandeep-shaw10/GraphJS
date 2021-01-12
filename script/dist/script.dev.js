"use strict";

$(document).ready(function () {
  //Set pevious State
  var SIZE = 22;
  var SPEED = 3;
  var ALGORITHM = 1;
  var startid, endid;
  var isDown = false;
  var wall = []; //Initial Function

  displayGrid(SIZE); //sIZE SPEED AND SIZE

  $("[type=range]").change(function () {
    var newval = $(this).val();
    console.log(newval);

    if (this.id == "speed") {
      $("#speed_dis").text(newval);
      SPEED = newval;
    } else {
      $("#size_dis").text(newval);
      SIZE = newval;
      startid = undefined;
      endid = undefined;
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
    startid = undefined;
    endid = undefined;
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
    if (startid == undefined || endid == undefined) {
      alert("Select the starting and ending point.");
    } else {
      decoder(ALGORITHM);
      wallGenerate();
    }
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


  $("body").on("dblclick", ".unit", function () {
    console.log(startid);
    console.log(endid);

    if (startid == undefined) {
      $(this).css("background", "#262626");
      startid = $(this).attr("id");
    } else if (endid == undefined) {
      $(this).css("background", "#262626");
      endid = $(this).attr("id");
    } else {//pass;
    }
  }); //Clear Cell

  $("#clear").on("click", function () {
    startid = undefined;
    endid = undefined;
    wall = [];
    $(".unit").css("background", "#aafff3");
  }); //Double Click Custom WALL Mouse Event

  $("body").on("mousedown", ".unit", function () {
    isDown = true;
  });
  $("body").on("mouseup", ".unit", function () {
    isDown = false;
  });
  $("body").on("mouseover", ".unit", function () {
    if (isDown && $(this).css("background-color") != "rgb(38, 38, 38)") {
      if ($(this).css("background-color") === "rgb(1, 110, 253)") {
        $(this).css("background-color", " #aafff3");
      } else {
        $(this).css("background-color", "#016efd");
      } //console.log($(this).css("background-color"));

    }
  }); //Making Wall

  $("#wall").on("click", function () {
    wall = 0;

    for (var i = 0; i < SIZE * SIZE; i++) {
      if (i == startid || i == endid) {//pass
      } else {
        var x = Math.round(Math.random() * 10);

        if (x == 0 || x == 1 || x == 2) {
          $("#" + i).css('background', '#016efd');
        }
      }
    }

    console.log(wall);
  }); //generating wall array

  function wallGenerate() {
    wall = [];

    for (var i = 0; i < SIZE * SIZE; i++) {
      var x = $("#" + i).css("background-color");

      if (x == "rgb(1, 110, 253)") {
        wall.push(i);
      }
    }

    console.log(wall);
  } //Generate Array of Given Size
  //Make bfs dfs work ===> visual animate and path animate
  //Scope for the dijistra and algorithm
  //Scope of the the other algorithm to work
  //Applying Algorithm one-by-one
  //===============================

});