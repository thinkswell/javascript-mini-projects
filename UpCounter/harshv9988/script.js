var interval;

function startCounter(){
    var number = parseInt(document.getElementById("number").value);

    if(isNaN(number)){
        alert('Enter a number');
        clearInterval(interval);
        return;
    }
    if(number<1 || number>99){
        alert('out of bound');
        clearInterval('interval')
        return;
    }

    var current = document.querySelectorAll('.counter .current');
    var next = document.querySelectorAll(".counter .next");
    var count = 0;

    resetno(current,next,2);
    clearInterval(interval);

    interval = setInterval(function(){
        if(count==number){
            clearInterval(interval);
            alert('counter stopped');
            return;
        }
        Counter(current,next,1);
        count++;
    },1000)
}

function resetno(current,next,end){
    for(var i=0;i<end;i++){
        current[i].innerText = 0;
        next[i].innerText = 1;
    }
}

function Counter(current,next,index){
    let curr = current[index];
    let nex = next[index];

    if(curr.innerText == 9){
        Counter(current,next,index-1);
    }

    nex.classList.add('animate');
    setTimeout(function(){
        curr.innerText = nex.innerText;
        nex.classList.remove('animate');
        nex.innerText = parseInt(nex.innerText)+1;
        if(nex.innerText > 9)
        {
            nex.innerText = 0;
        }
    },500)
}