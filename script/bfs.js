var Data;
var Queue = [];
var visited = [];

//Implementing BFS Traversal
export function BreadthFirstSearch(arrayData,startNode,endNode,SPEED){

    Data = new Array(2);
    Data = arrayData;
    Queue = [];
    visited = [];
    //console.log(Data[0][0]);
    let found = false;

    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            if(Data[i][j].id==startNode){
                startNode = Data[i][j];
                found = true;
                break;
            }
            if(found){
                break;
            }
        }
    }
    //console.log(startNode)

    Queue.push(startNode);
    visited.push(startNode);
    //console.log(Queue);
    //console.log(visited);

    while(Queue.length != 0){
        let x = Queue.shift();
        //console.log(x);
        for (let i = 0; i < x.neighbors.length; i++) {
            if (checkVisitedNode(x.neighbors[i])){
                Queue.push(x.neighbors[i]);
                visited.push(x.neighbors[i]);
            }
        }
    }

    bfsAnimate(visited,endNode,SPEED)
}

//Check Visited Node
function checkVisitedNode(node){
    for (let i = 0; i < visited.length; i++) {
        if(node == visited[i]){
            return false;
        }   
    }
    return true;
}

//function Animate
function bfsAnimate(data,stop,speed){
    //console.log(data);
    //console.log(stop);
    let notfound = true;

    for (var i = 1; i < data.length; i++) {
        let x = data[i].id;
        if(x!=stop){
            setTimeout(function(){
                $("#"+x).addClass("animate");
                //console.log(x);
            },(i+1)*20*speed);
        }else{
            notfound = false;
            setTimeout(function(){
                alert("Element Found! \nNode visited after searching "+(i-1)+" nodes.");
                $("#wall").removeAttr('disabled');
                $("#clear").removeAttr('disabled');
                $("#size").removeAttr('disabled');
                $("#speed").removeAttr('disabled');
                $("#start").removeAttr('disabled');
            },(i+3)*20*speed);
            break
        }
    }
    if(notfound){
        setTimeout(function(){
            alert("Element cannot be found!");
            $("#wall").removeAttr('disabled');
            $("#clear").removeAttr('disabled');
            $("#size").removeAttr('disabled');
            $("#speed").removeAttr('disabled');
            $("#start").removeAttr('disabled');
        },(i+3)*20*speed);
    }
}