function isLower(str){
    if(str === str.toLowerCase()){
        return true
    }else{
        return false
    }
}

function buttonCopy(){
    navigator.clipboard.writeText(myId);
    console.log(myId)
    /*
    const msg = document.getElementById('copymsg')
    msg.innerText = "Copied!"
    setTimeout(() => {
        msg.innerText = ""
    }, 2500);
    */
}

function buttonPaste(){
    
}

function generateCode(){
    return Math.random().toString(36).slice(2,7).toUpperCase();
}

let arr = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomStr() {
    var ans = '';
    for (var i = 5; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}

var t = document.getElementById('input-form')

t.addEventListener('keypress', function(event){
    //Prevent the value to be added
    event.preventDefault();
    //Regex that you can change for whatever you allow in the input (here any word character --> alphanumeric & underscore)
    var reg = /\w/g;
    //retreive the input's value length
    var inputChar = String.fromCharCode(event.which);
    //retreive the input's value length
    var inputLength = t.value.length;
    if ( reg.test(inputChar) && (inputLength < 5) ) {
        //if input length < 4, add the value
        t.value = t.value + inputChar;
    }else{
        //else do nothing
        return;
    }
});
  
