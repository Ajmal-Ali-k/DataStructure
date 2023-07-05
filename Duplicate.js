function findCommonElements(arr1, arr2, arr3) {
    let i = 0, j = 0, k = 0;
    const commonElements = [];
  
    while (i < arr1.length && j < arr2.length && k < arr3.length) {
      if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
        commonElements.push(arr1[i]);
        i++;
        j++;
        k++;
      } else if (arr1[i] < arr2[j]) {
        i++;
      } else if (arr2[j] < arr3[k]) {
        j++; 
      } else {
        k++;
      }
    }
  
    return commonElements;
  }
  

  const arr1 = [1, 3, 4, 6, 7, 9];
  const arr2 = [2, 3, 6, 7];
  const arr3 = [3, 6, 7, 8, 10];
  
  const commonElements = findCommonElements(arr1, arr2, arr3);
  console.log(commonElements);
  