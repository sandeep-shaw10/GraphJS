"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dijkstra = Dijkstra;
var Data;
var Queue = [];
var visited = [];
var gotit; //Implementing Dijkstra Visualization

function Dijkstra(arrayData, startNode, endNode) {
  Data = new Array(2);
  Data = arrayData;
  Queue = [];
  visited = []; //console.log(Data[0][0]);

  var f1,
      f2 = false;
  gotit = false;

  for (var i = 0; i < Data.length; i++) {
    for (var j = 0; j < Data.length; j++) {
      if (Data[i][j].id == startNode) {
        startNode = Data[i][j];
        f1 = true;
      }

      if (Data[i][j].id == endNode) {
        endNode = Data[i][j];
        f2 = true;
      }
    }

    if (f1 && f2) {
      break;
    }
  } //Every element to infinity


  for (var _i = 0; _i < Data.length; _i++) {
    for (var _j = 0; _j < Data.length; _j++) {
      Data[_i][_j].distance = Infinity;
    }
  } //Starting node to 0


  startNode.distance = 0; //Adding element to the queue

  for (var _i2 = 0; _i2 < Data.length; _i2++) {
    for (var _j2 = 0; _j2 < Data.length; _j2++) {
      Queue.push(Data[_i2][_j2]);
    }
  }

  while (Queue.length != 0) {
    var min = getMinDistance(Queue); //Getting the minimum path
    //console.log(min.neighbors[0].id);

    if (min == undefined) {
      break;
    }

    Queue = Queue.filter(function (item) {
      return item !== min;
    }); //Removing the current from Queue

    for (var _i3 = 0; _i3 < min.neighbors.length; _i3++) {
      //Looping through the neighbours of min
      if (Queue.indexOf(min.neighbors[_i3]) >= 0) {
        //Checking if it's neighbour is in the queue
        var fun = min.distance + 1; //1 is the weighted

        if (fun < min.neighbors[_i3].distance) {
          min.neighbors[_i3].distance = fun;
          min.neighbors[_i3].path = min.id; //console.log(min.neighbors[i].distance + " : "+min.neighbors[i].path);
          //Path-Find

          if (min.neighbors[_i3].id == endNode.id) {
            gotit = true;
            break;
          } //====================Animate


          if (!gotit) {
            visited.push(min.neighbors[_i3].id);
          } //=========================

        }
      }
    }
  } //console.log(endNode);
  //console.log(startNode);
  //console.log(Queue);
  //console.log(visited);


  djanimate(visited, startNode, endNode, gotit);
}

function getMinDistance(queue) {
  //Get minimum Distance
  var min = Infinity;
  var id;

  for (var i = 0; i < Queue.length; i++) {
    if (Queue[i].distance < min) {
      min = Queue[i].distance;
      id = Queue[i];
    }
  }

  return id;
} //Animate


function djanimate(data, start, stop, get) {
  var _loop = function _loop() {
    var x = data[i]; //console.log(x+"==="+stop);

    setTimeout(function () {
      $("#" + x).addClass("animate"); //console.log(x);
    }, (i + 1) * 100);
  };

  //console.log(data);
  //console.log(stop);
  //console.log(stop);
  for (var i = 0; i < data.length; i++) {
    _loop();
  }

  if (!get) {
    setTimeout(function () {
      alert("Element cannot be found!");
    }, (i + 3) * 100);
  }

  if (gotit) {
    pathAnimate(start, stop, i);
  }
}

function pathAnimate(start, stop, frames) {
  var nodes = frames;
  console.log(start);
  console.log(stop);
  console.log(frames);
  var x = stop;
  var trace = [];

  while (x != start) {
    var path = x.path;
    trace.push(path);

    for (var i = 0; i < Data.length; i++) {
      for (var j = 0; j < Data.length; j++) {
        if (Data[i][j].id == path) {
          x = Data[i][j];
        }
      }
    }
  } //console.log(trace);


  var _loop2 = function _loop2(_i4) {
    setTimeout(function () {
      $("#" + trace[_i4]).addClass("path"); //console.log("Trace = " + trace[i]);
    }, ++frames * 100);
  };

  for (var _i4 = trace.length - 2; _i4 >= 0; _i4--) {
    _loop2(_i4);
  } //console.log("Entered");


  setTimeout(function () {
    alert("Element Found! \nPath Distance : " + (trace.length - 1) + "\nNode visited after searching " + nodes + " nodes.");
  }, (++frames + 2) * 100);
}