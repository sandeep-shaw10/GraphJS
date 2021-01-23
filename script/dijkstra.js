var Data;
var Queue = [];
var visited = [];
var gotit;

//Implementing Dijkstra Visualization
export function Dijkstra(arrayData,startNode,endNode,SPEED){

    Data = new Array(2);
    Data = arrayData;
    Queue = [];
    visited = [];
    let f1,f2 = false;
    gotit = false;

    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            if(Data[i][j].id==startNode){
                startNode = Data[i][j];
                f1=true;
            }
            if(Data[i][j].id==endNode){
                endNode = Data[i][j];
                f2 = true;
            }
        }
        if(f1 && f2){
            break;
        }
    }

    //Starting node to 0
    startNode.distance = 0;

    //Adding element to the queue
    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            Queue.push(Data[i][j]);
        }
    }

    while(Queue.length!=0){
        var min = getMinDistance(Queue); //Getting the minimum path
        if(min == undefined){
            break;
        }

        Queue = Queue.filter(item => item !== min); //Removing the current from Queue
        for (let i = 0; i < min.neighbors.length ; i++) { //Looping through the neighbours of min
            if(Queue.indexOf(min.neighbors[i])>=0){         //Checking if it's neighbour is in the queue
                let fun = min.distance + 1                  //1 is the weighted
                if(fun<min.neighbors[i].distance){
                    min.neighbors[i].distance = fun;
                    min.neighbors[i].path = min.id;
                    //Path-Find
                    if(min.neighbors[i].id == endNode.id){
                        gotit = true
                        break;
                    }
                    //====================Animate
                    if(!gotit){
                        visited.push(min.neighbors[i].id);
                    }
                    //=========================
                }
            }
        }
    }

    //console.log(endNode);
    //console.log(startNode);
    //console.log(Queue);
    //console.log(visited);

    djanimate(visited,startNode,endNode,gotit,SPEED);

}

function getMinDistance(queue){
    //Get minimum Distance
    var min = Infinity;
    var id;
    for (let i = 0; i < Queue.length; i++) {
        if(Queue[i].distance<min){
            min = Queue[i].distance;
            id = Queue[i];
        }
    }
    return id;
}

//Animate
function djanimate(data,start,stop,get,speed){
    //console.log(data);
    //console.log(stop);
    //console.log(stop);

    for (var i = 0; i < data.length; i++) {
        let x = data[i];
        //console.log(x+"==="+stop);
            setTimeout(function(){
                $("#"+x).addClass("animate");
                //console.log(x);
            },(i+1)*20*speed);
    }
    if(!get){
        setTimeout(function(){
            alert("Element cannot be found!");
            $("#wall").removeAttr('disabled');
            $("#clear").removeAttr('disabled');
            $("#size").removeAttr('disabled');
            $("#speed").removeAttr('disabled');
            $("#start").removeAttr('disabled');
        },(i+3)*20*speed);
    }

    if(gotit){
        pathAnimate(start,stop,i,speed)
    }
}

function pathAnimate(start,stop,frames,speed){
    let nodes = frames;
    //console.log(start);
    //console.log(stop);
    //console.log(frames);
    var x = stop;
    var trace = [];

    while (x != start) {
      let path = x.path;
      trace.push(path);
      for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
          if (Data[i][j].id == path) {
            x = Data[i][j];
          }
        }
      }
    }

    //console.log(trace);
    for (let i = trace.length - 2; i >= 0; i--) {
        setTimeout(function () {
          $("#" + trace[i]).addClass("path");
          //console.log("Trace = " + trace[i]);
        }, ++frames * 20*speed);
    }

    //console.log("Entered");
    setTimeout(function(){
        alert("Element Found! \nPath Distance : "+ (trace.length - 1) +"\nNode visited after searching "+(nodes)+" nodes.");
        $("#wall").removeAttr('disabled');
        $("#clear").removeAttr('disabled');
        $("#size").removeAttr('disabled');
        $("#speed").removeAttr('disabled');
        $("#start").removeAttr('disabled');
    },(++frames+2)*20*speed);


}
