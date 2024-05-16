export function timestampSorter(arr) {



    arr.sort(function (x, y) {
        return x.timestamp - y.timestamp;
    })


    // for (let i = 1; i < arr.length; i++) {
    //   let current = arr[i]['timestamp'];

    //   let j = i - 1;

    //   while (j >= 0 && arr[j]['timestamp'] > current) {
    //     arr[j + 1] = arr[j]; 
    //     j--;
    //   }

    //   arr[j + 1]['timestamp'] = current;
    // }

    return arr;
}