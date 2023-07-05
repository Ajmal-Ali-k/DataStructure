class Graph {
    constructor(){

        this.adjecencylist = {}
    }

    addVertex(vertex){
        if(!this.adjecencylist[vertex]){
            this.adjecencylist[vertex] = new Set()
        }

    }
  
    addEdge(vertex1,vertex2){
        if(!this.adjecencylist[vertex1]){
            this.addVertex(vertex1)
        }
        if(!this.adjecencylist[vertex2]){
            this.addVertex(vertex2)
        }
        this.adjecencylist[vertex1].add(vertex2)
        this.adjecencylist[vertex2].add(vertex1)
    }
    hasEdge(vertex1,vertex2){
        return (this.adjecencylist[vertex1].has(vertex2) && 
        this.adjecencylist[vertex2].has(vertex1)
    )}
    removeEdge(vertex1,vertex2){
        if(this.adjecencylist[vertex1]){
            this.adjecencylist[vertex1].delete(vertex2)
        }
        if(this.adjecencylist[vertex2]){
            this.adjecencylist[vertex2].delete(vertex1)
        }
    }
    removeVertex(vertex){
        if(!this.adjecencylist[vertex]){
            return 
        }
        for(let adjacentvertex of this.adjecencylist[vertex]){
            this.removeEdge(vertex,adjacentvertex)
        }
        delete this.adjecencylist[vertex]

    }
    display(){
        for(let vertex in this.adjecencylist){
            console.log(vertex + "->" + [...this.adjecencylist[vertex]])
        }
    }
}


const graph = new Graph()

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")

graph.addEdge("A","B")
graph.addEdge("B","C")
graph.display()
console.log(graph.hasEdge("A","c"))



//  graph.removeEdge("A","B")
//  graph.display()
 graph.removeVertex("B")
 graph.display()