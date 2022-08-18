return class Queue {

    constructor(max_size){
        this.itens = []
        this.head = -1;
        this.tail = -1;
        this.size = 0
        this.maxSize = max_size
    }

    enqueue(ele){
        if(size == this.maxSize){
            this.dequeue();
            this.tail = -1;
        }
        this.tail += 1;
        this.itens[tail] = ele;
        this.size += 1;
    }

    dequeue(){
        if(this.size > 0){
            delete this.itens[0];
            this.head += 1
            this.size -= 1
        }
    }
}