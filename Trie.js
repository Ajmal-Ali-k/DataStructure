class TrieNode {
    constructor(){
        this.children = {}
        this.isWord = false
    }
}

class Trie {
    constructor(){
     this.root = new TrieNode()
    }

    insert(word){
        let current = this.root 

        for(let i = 0; i < word.length; i++){
            let char = word[i]
            if(!current.children[char]){
                current.children[char] = new TrieNode()
            }
            current = current.children[char]
        }
        current.isWord = true
    }

    search(word){
        let current = this.root 

        for(let i =0 ; i< word.length ;i++){
            const char = word[i]
            if(!current.children[char]){
                return false
            }
            current = current.children[char]

        }
        return current.isWord
    }
    startWith(prefix){
        let current = this.root
        for(let i = 0 ; i < prefix.length ;i++){
            let char = prefix[i]
            if(!current.children[char]){
                return false
            }
            current = current.children[char]
        }
        return true
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


// class TrieNode {
//     constructor(){
//         this.children ={}
//         this.isWord = false
//     }
// }

//  class Trie {
//     constructor() {
//         this.root = new TrieNode()
//     }

//     insert(value){
//         let current = this.root

//         for(let i =0 ; i<value.length;i++){
//             let char = value[i]
//             if(!current.children[char]){
//                 current.children[char] = new TrieNode()
//             }
//             current = current.children[char]
//         }
//         this.isWord = true
//     }

//     search(word){
//         let current = this.root
         
//         for(let i = 0 ; i < word.length ; i++ ){
//             let char = word[i]
//             if(!current.children[char]){
//                 return false
//             }
//             current = current.children[char]
//         }
//         return this.isWord 
//     }
//     startWith(word){
//         let current = this.root

//         for(let i = 0 ; i< word.length ; i++){
//             let char = word[i]
//             if(!current.children[char]){
//                 return false
//             }
//             current = current.children[char]
//         }
//         return true
//     }

// print(){
//     let word = []
//     function printWord(node,prefix){
//         if(node.isWord){
//             word.push(prefix)
//         }
//         for(const key in node.children){
//             let childNode = node.children[key]
//             let  newPrifix = prefix + key
//             printWord(childNode,newPrifix)
//         }
//     }
//     printWord(this.root,"")
//     return words
// }
//  }

 const trie = new Trie();
 trie.insert("apple");
 trie.insert("app");
 trie.insert("application");
 
 console.log(trie.print()); // Output: ["apple", "app", "application"]
 
