function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function partition(arr, low, high) {
    var point = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= point) {
            high--;
        }
        swap(arr, low, high);
        while (low < high && arr[low] <= point) {
            low++;
        }
        swap(arr, low, high);
    }
    return low;
}


function quickSort(arr) {
    if (!arr && arr.length < 2) {
        return arr;
    }
    var low = 0;
    var high = arr.length - 1;

    var qSort = function (arr, low, high) {
        if (low < high) {
            var point = partition(arr, low, high);
            qSort(arr, 0, point - 1);
            qSort(arr, point + 1, high);
        }
    };
    qSort(arr, low, high);
    console.log(arr);
}

// 用队列实现非递归快速排序
function quickSort1(arr) {
    var queue = [[0, arr.length - 1]];
    while (queue.length) {
        var range = queue.shift();
        var point = partition(arr, range[0], range[1]);
        // console.log(range[0], ':', range[1], ':', point, ':', arr, ':', queue);
        // 把每次操作后分堆的范围放进队列
        if (range[0] < point - 1) {
            queue.push([range[0], point - 1]);
        }
        if (range[1] > point + 1) {
            queue.push([point + 1, range[1]]);
        }
    }
    console.log(arr);
}

var arr = [23, 44, 6, 12, 345, 22, 125, 2, 33];