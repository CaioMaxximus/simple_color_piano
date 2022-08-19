export const queue = function (max_size) {

    let itens = []
    let head = 0;
    let tail = -1;
    let size = 0
    let maxSize = max_size

    return {
        enqueue: function (ele) {
            let exit = ""
            if (size === maxSize) {
                exit = this.dequeue();

            }
            if (tail > -1) {
                let tailPos =  (tail + 1) % (maxSize);
                tail = tailPos
            }
            else{
                tail += 1
            }
            itens[tail] = ele;
            console.log(tail, ele)
            size += 1;
            return exit
        },

        dequeue: function () {
            if (size > 0) {
                let exit = itens[head];
                delete itens[head];
                size -= 1
                head = (head + 1) % (maxSize)
                return exit;
            }
            return "";
        },
        getQueue: () => itens
        , getSize: () => size
    }
}


