let canvas = document.getElementById("draw");
let ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#ff0000"

let hue =220;
const circles = 500;
let mouse= {
    x:undefined,
    y: undefined
}

window.addEventListener('mousemove' ,e=>{
    mouse.x= e.x;
    mouse.y = e.y;
    
})
window.addEventListener('resize', ()=>{
    
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
    initilize();
})
function Circle(x,y,radius,dx,dy,hue){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2,true);
       ctx.fill();
        
    }

    this.update = function(){
    if(this.x+ this.radius >innerWidth || this.x - this.radius<0)
            {this.dx =-this.dx;}
   
    if(this.y+ this.radius>innerHeight || this.y - this.radius<0)
         {this.dy =-this.dy;}

     this.x+=this.dx;
    this.y+= this.dy;

    if(mouse.x - this.x < 50 && mouse.x -this.x >-50 && 
        mouse.y - this.y < 50 && mouse.y -this.y >-50 && this.radius <50)
      { this.radius+=1.5;}
    else if(this.radius>this.minRadius)
    {
        this.radius--;
    }


    this.draw();
    }
}

let circleArray =[];

function initilize(){

    circleArray=[];
    for(let i=0; i<=circles;i++){
        let radius = Math.random() *5 +2;

        let x = Math.random() * (innerWidth -radius*2) +radius;
        let y = Math.random() * (innerHeight -radius*2) +radius;
       
        let dx =(Math.random() -0.5)*2;
        let dy =(Math.random() -0.5)*2;

        circleArray.push(new Circle(x,y,radius,dx,dy,hue));
        hue+=0.2;
    }
}


function animate()
{
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    for(let i=0; i<circleArray.length;i++){
        circleArray[i].update();
    }

 
}
animate();

initilize()
