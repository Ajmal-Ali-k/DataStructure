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
            console.log(arr[i],'largest',arr[largest]);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            console.log(arr[i],'shamble',arr[largest]);
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
max.insert(100)
max.heapSort();
console.log(max.arr);
max.remove()
max.heapSort();
console.log(max.arr);