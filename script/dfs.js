var Data;
var visited = [];
var spotted = false

//Implementing BFS Traversal
export function DepthFirstSearch(arrayData,startNode,endNode){

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
    console.log(visited)
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
