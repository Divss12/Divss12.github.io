class Stack{
    constructor(array = []){
        this.data = array;
        this.size = array.length;
    }
    
    push(data){
        this.data[this.size] = data;
        this.size++;
        return this.data;
    }

    pop(){
        if(this.size < 1){return undefined;}
        
        const popped = this.data[this.size-1];
        this.size--;
        return popped;
    }

    peek(){
        return this.size > 0 ? this.data[this.size] : undefined;
    }

    isNotEmpty(){
        return this.size > 0;
    }
}


//Also including get random int here

function getRandInt(min, max){
    //return [min, max) (min inclusive max exclusive)
    return Math.floor(Math.random()*(max-min)) + min;
}

//Also including remove value from array

function remItem(arr, val){
    let ind = arr.indexOf(val);
    if(ind > -1){arr.splice(ind, 1);}
    return arr;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
