var Data;
var visited = [];
var spotted = false

//Implementing BFS Traversal
export function DepthFirstSearch(arrayData,startNode,endNode,SPEED){

    Data = new Array(2);
    Data = arrayData;
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
    graphTraversal(startNode,endNode);
    dfsanimate(visited,endNode,SPEED);
}
//Recursion
function graphTraversal(node,stop){
    //console.log(node);
    if(spotted){
        //pass
    }else{
        node.visited = true;
        visited.push(node.id);
        for (let i = 0; i < node.neighbors.length; i++) {
            if(!node.neighbors[i].visited){
                graphTraversal(node.neighbors[i]);
            }  
        }
        if(node==stop){
            spotted = true;
        }
    }
}

//Animate
function dfsanimate(data,stop,speed){
    //console.log(data);
    //console.log(stop);
    let notfound = true;

    for (var i = 1; i < data.length; i++) {
        let x = data[i];
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
