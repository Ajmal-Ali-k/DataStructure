class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    preOrder(root) {
        if (root) {
            console.log(root.value);
            this.preOrder(root.left);
            this.preOrder(root.right);
        }
    }
    inOrder(root) {
        if (root) {
            this.inOrder(root.left);
            console.log(root.value);
            this.inOrder(root.right);
        }
    }
    postOrder(root) {
        if (root) {
            this.postOrder(root.left);
            this.postOrder(root.right);
            console.log(root.value);
        }
    }
    levelOrder() {
        const queue = [];
        queue.push(this.root);
        while (queue.length) {
            let curr = queue.shift();
            console.log(curr.value);
            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
        }
    }
    search(value) {
        return this.searchNode(this.root, value);
    }
    searchNode(node, value) {
        if (node === null) {
            return false;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
        }
    }
    minimumVal(root) {
        if (!root.left) {
            return root.value;
        } else {
            return this.minimumVal(root.left);
        }
    }
    maximumVal(root) {
        if (!root.right) {
            return root.value;
        } else {
            return this.maximumVal(root.right);
        }
    }
    remove(value) {
        if (!this.root) {
            return null;
        } else {
            this.root = this.deleteNode(this.root, value);
        }
    }
    deleteNode(root, value) {
        if (root.value < value) {
            root.left = this.deleteNode(root.left, value);
        } else if (root.value > value) {
            root.right = this.deleteNode(root.right, value);
        } else {
            if (!root.right && !root.left) {
                return null;
            } else if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            }
            root.value = this.minimumVal(root.left);
            root.right = this.deleteNode(root.right, root.value);
        }
        return root;
    }
}

// [1, 1, 2, 4, 5, 7, 10, 100]

// heap bottom up
function heapIfyBottomUp(arr, len, parentInd) {
    let largest = parentInd;
    let left = parentInd * 2 + 1;
    let right = left + 1;
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== parentInd) {
        [arr[parentInd], arr[largest]] = [arr[largest], arr[parentInd]];
        heapIfyBottomUp(arr, len, largest);
    }
    return arr;
}
function heapSort(arr) {
    let len = arr.length;
    let lastParent = Math.floor(len / 2 - 1);
    let lastChild = len - 1;

    while (lastParent >= 0) {
        heapIfyBottomUp(arr, len, lastParent);
        lastParent--;
    }
    while (lastChild >= 0) {
        [arr[0], arr[lastChild]] = [arr[lastChild], arr[0]];
        heapIfyBottomUp(arr, lastChild, 0);
        lastChild--;
    }
    return arr;
}
// console.log(heapSort([4, 1, 2, -7, 41, 5, 8, 35, 45, 100]));

// Trie
class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isWord = true;
    }

    search(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.isWord;
    }

    startsWith(prefix) {
        let current = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return true;
    }
    print() {
        let words = [];
        function printWord(node, prefix) {
            if (node.isWord) {
                words.push(prefix);
            }
            for (const key in node.children) {
                let childNode = node.children[key];
                let newPrefix = prefix + key;
                printWord(childNode, newPrefix);
            }
        }
        printWord(this.root, "");
        return words;
    }
}
const trie = new Trie();
trie.insert("s");
trie.insert("a");
trie.insert("j");

console.log(trie.print());
// console.log(trie.print());

class Graph {
    constructor() {
        this.adjacentList = {};
    }
    addVertex(vertex) {
        if (!this.adjacentList[vertex]) {
            this.adjacentList[vertex] = new Set();
        }
    }
    addEdge(vertex1, vertex2) {
        if (!this.adjacentList[vertex1]) {
            this.addVertex(vertex1);
        }
        if (!this.adjacentList[vertex2]) {
            this.addVertex(vertex2);
        }
        this.adjacentList[vertex1].add(vertex2);
        this.adjacentList[vertex2].add(vertex1);
    }
    hasEdge(vertex1, vertex2) {
        return this.adjacentList[vertex1].has(vertex2) && this.adjacentList[vertex2].has(vertex1);
    }
    removeEdge(vertex1, vertex2) {
        if (this.adjacentList[vertex1]) {
            this.adjacentList[vertex1].delete(vertex2);
        }
        if (this.adjacentList[vertex2]) {
            this.adjacentList[vertex2].delete(vertex1);
        }
    }
    removeVertex(vertex) {
        if (!this.adjacentList[vertex]) {
            return;
        }
        for (let adjacent of this.adjacentList[vertex]) {
            this.removeEdge(vertex, adjacent);
        }
        delete this.adjacentList[vertex];
    }
    bfs(startVertex) {
        const queue = [];
        const visited = {};

        visited[startVertex] = true;
        queue.push(startVertex);

        while (queue.length) {
            const currentVertex = queue.shift();
            console.log(currentVertex);
            this.adjacentList[currentVertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
    }

    dfs(startVertex) {
        const visited = {};
        const stack = [];

        visited[startVertex] = true;
        stack.push(startVertex);

        while (stack.length > 0) {
            const currentVertex = stack.pop();
            // console.log(currentVertex);
            this.adjacentList[currentVertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
    }
    display() {
        for (let vertex in this.adjacentList) {
            console.log(vertex, "->", [...this.adjacentList[vertex]]);
        }
    }
}

const graph = new Graph();

// Add vertices
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

// Add edges
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");

// graph.bfs("A");
// graph.display();
// graph.dfs("C");

// heap
class MaxHeap {
    constructor() {
        this.arr = [];
    }
    insert(data) {
        this.arr.push(data);
        // also write
        // this.sinkUp()
        // return arr
        let i = this.arr.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.arr[i] <= this.arr[parent]) {
                break;
            }
            [this.arr[i], this.arr[parent]] = [this.arr[parent], this.arr[i]];
            i = parent;
        }
    }
    remove() {
        const n = this.arr.length;
        if (n === 0) {
            return null;
        }
        let max = this.arr[0];
        this.arr[0] = this.arr[n - 1];
        this.arr.pop();
        this.heapIfyBottomUp(this.arr, n - 1, 0);
        return max;
    }
    sinkUp() {
        let i = this.arr.length - 1;
        const element = this.arr[i];
        while (i > 0) {
            let parentIdx = Math.floor((i - 1) / 2);
            let parent = this.arr[parentIdx];
            if (element <= parent) break;
            this.arr[parentIdx] = element;
            this.arr[i] = parent;
            i = parentIdx;
        }
    }
    heapIfyBottomUp(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
          
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.heapIfyBottomUp(arr, n, largest);
        }
    }
    heapSort() {
        const n = this.arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapIfyBottomUp(this.arr, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            [this.arr[0], this.arr[i]] = [this.arr[i], this.arr[0]];
            this.heapIfyBottomUp(this.arr, i, 0);
        }
        return this.arr;
    }
}
const max = new MaxHeap();
max.insert(10);
max.insert(40);
max.insert(1);
max.insert(150);
max.insert(100);
max.heapSort();
console.log(max.arr);