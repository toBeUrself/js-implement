function binarySearch(arr, target) {
    var index = -1;
    if (!arr || !arr.length) {
        return index;
    }

    var mid;
    var low = 0;
    var high = arr.length - 1;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (target < arr[mid]) {
            high = mid - 1;
        } else if (target > arr[mid]) {
            low = mid + 1;
        } else {
            index = mid;
            break;
        }
    }
    return index;
}


var arr = [2, 14, 16, 19, 23, 265, 289, 567, 346788];

binarySearch(arr, 23);