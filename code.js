function duplicate(arr){
    for(let i=0 ; i<arr.length-1 ; i++){
        for(let j=i+1 ; j<arr.length ; j++){
            if(arr[i]===arr[j]){
              console.log(arr[i])   
              break ;
            }
        }

    }
}

duplicate([1,2,3,4,5,4,2,1])