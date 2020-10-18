	var one=document.getElementById('onecircle');
	var y=one.getContext('2d');
	    document.body.appendChild(one);
	y.globalCompositeOperation='lighter';
	var fall=0;
	var i=fall%360;
	var i4=0;
	var i1=fall%360;
	var i3=fall%360;
	var x=[0,1,2,3,4,5];
	var laa=0;
	var pos=500;
	var r1=0;
	var color='yellow';
	var top1=0;
	var n11=0;;
	var obj;
	var ljk=100;
	var j=101;
	


	function fun(){
		cancelAnimationFrame(p);
		var bleep=new Audio();
		bleep.src="sound.mp3";
		bleep.play();
		
		document.getElementById("a").disabled=false;
		
	}



	function oppcircle(y1,r,color){
			var n;
			var li=0;
			
			if(y1+r>pos-20&&y1+r<pos+20&&color!='all')
				{
					if(color=='green')
					{
						if(i<-30&&i>-150)
						{
							li=1;
							
						}
					}
					if(color=='yellow')
					{
						if((i<=0&&i>-30)||(i>=-360&&i<-270))
						{
							li=1;
							
						}
					}
					if(color=='red')
					{
						if(i<-150&&i>-270)
							li=1;

					}
					
					if(li==0){
						fun();
						n11=2;
						document.getElementById("bb").disabled=true;
						
					}

				}
			if(y1-r>pos-20&&y1-r<pos+20&&color!='all')
			{
				if(color=='red')
				{
					if((i<-330&&i>=-360)||(i<=0&&i>-90))
					{
						li=1;
						
					}
				}
				if(color=='yellow')
				{
					if(i<-90&&i>-210)
					{
						li=1;
						
					}
				}
				if(color=='green'){
					if(i<-210&&i>-330)
						li=1;	
				}
				if(li==0){
					fun();
					n11=2;
					document.getElementById("bb").disabled=true;
					
				}

			}
			
			//color1
			var startangle=i*(Math.PI/180);
			var endangle=(i+120)*(Math.PI/180);
			y.beginPath();
			y.arc(500,y1,r,startangle,endangle);
			y.lineWidth=r/5;
			y.strokeStyle='yellow';
			y.stroke();
			//color2
			var startangle1=(i+120)*(Math.PI/180);
			var endangle1=(i+240)*(Math.PI/180);
			y.beginPath();
			y.arc(500,y1,r,startangle1,endangle1);
			y.lineWidth=r/5;
			y.strokeStyle='green';
			y.stroke();
			//color3
			var startangle2=(i+240)*(Math.PI/180);
			var endangle2=(i+360)*(Math.PI/180);
			y.beginPath();
			y.arc(500,y1,r,startangle2,endangle2);
			y.lineWidth=r/5;
			y.strokeStyle='red';
			y.stroke();
			
			if(i==-360)
				i=0;
			
		}
	function circle(y1,r,color){
			var kk;
			var li=0;
			if(y1+r>pos-20&&y1+r<pos+20&&color!='all')
				{
					
					if(color=='red')
					{
						if(i1>90&&i1<210)
						{
							li=1;
					
						}
					}
						
					
					
					if(color=='yellow')
					{
						if((i1>=0&&i1<90)||(i1>330&&i1<=360))
						{
							li=1;
						}
					}

					if(color=='green'){
						if(i1>210&&i1<330)
							li=1;
					}


					if(li==0){
						fun();	
						n11=2;
						document.getElementById("bb").disabled=true;
					}

				}
			//top of circle
			if(y1-r>pos-20&&y1-r<pos+20&&color!='all')
				{
					if(color=='red')
					{
						if((i1>=0&&i1<30)||(i1>270&&i1<=360))
							li=1;
						
					}
					if(color=='yellow')
					{	
						if(i1>150&&i1<270)
							li=1;
						
					}
					if(color=='green')
					{
						if(i1>30&&i1<150)
							li=1;
					}

				
					if(li==0){
						fun();
						n11=2;
						document.getElementById("bb").disabled=true;
						
					}

				}
			


			//color1
			var startangle=i1*(Math.PI/180);
			var endangle=(i1+120)*(Math.PI/180);
			y.beginPath();
			y.arc(500,y1,r,startangle,endangle);
			y.lineWidth=r/5;
			y.strokeStyle='yellow';
			y.stroke();
			//color2
			var startangle1=(i1+120)*(Math.PI/180);
			var endangle1=(i1+240)*(Math.PI/180);
			y.beginPath();
			y.arc(500,y1,r,startangle1,endangle1);
			y.lineWidth=r/5;
			y.strokeStyle='green';
			y.stroke();
			//color3
			var startangle2=(i1+240)*(Math.PI/180);
			var endangle2=(i1+360)*(Math.PI/180);
			y.beginPath();
			y.arc(500,y1,r,startangle2,endangle2);
			y.lineWidth=r/5;
			y.strokeStyle='red';
			y.stroke();
			
			if(i1==360)
				i1=0;
			
				y1=1000*kk;
			


		}
	function ball(yl,color){
			
			
			y.beginPath();
			y.arc(500,yl,5,0*Math.PI,2*Math.PI);
			y.lineWidth=10;
			y.strokeStyle=color;
			y.stroke();
			
		}
	function ballchange(yl){
			
			
			y.beginPath();
			y.arc(500,yl,5,0*Math.PI,2*Math.PI);
			y.lineWidth=10;
			y.strokeStyle='black';
			y.stroke();
			var nl=Math.random()*3;
			
			if(pos>=yl-20&&pos<=yl+20)
			{
				if(nl<=1)
				{
					color='red';
				}
				else if(nl>1&nl<=2)
				{
					color='yellow';
				}
				else if(nl>2&&nl<=3)
				{
					color='green';
				}
				
			}
			return color;
			

			
		}
		

 
	function triangle(y1,color){
		

			var li=0;
			
			y.beginPath();
			y.moveTo(500+Math.cos(-i1*Math.PI/180)-(-100*Math.sin(-i1*Math.PI/180)), y1+Math.sin(-i1*Math.PI/180)+(-100*Math.cos(-i1*Math.PI/180)));
			y.lineTo(500+86.6*Math.cos(-i1*Math.PI/180)-(50*Math.sin(-i1*Math.PI/180)), y1+86.6*Math.sin(-i1*Math.PI/180)+(50*Math.cos(-i1*Math.PI/180)));
			y.lineWidth=15;
			y.strokeStyle='red';
			y.lineCap = "round";
			y.stroke();
			y.beginPath();
			y.moveTo(500+86.6*Math.cos(-i1*Math.PI/180)-(50*Math.sin(-i1*Math.PI/180)), y1+86.6*Math.sin(-i1*Math.PI/180)+(50*Math.cos(-i1*Math.PI/180)));
			y.lineTo(500-86.6*Math.cos(-i1*Math.PI/180)-(50*Math.sin(-i1*Math.PI/180)), y1-86.6*Math.sin(-i1*Math.PI/180)+(50*Math.cos(-i1*Math.PI/180)));
			y.lineWidth=15;
			y.strokeStyle='yellow';
			y.lineCap = "round";
			y.stroke();
			y.beginPath();
			y.moveTo(500-86.6*Math.cos(-i1*Math.PI/180)-(50*Math.sin(-i1*Math.PI/180)), y1-86.6*Math.sin(-i1*Math.PI/180)+(50*Math.cos(-i1*Math.PI/180)));
			y.lineTo(500+Math.cos(-i1*Math.PI/180)-(-100*Math.sin(-i1*Math.PI/180)), y1+Math.sin(-i1*Math.PI/180)+(-100*Math.cos(-i1*Math.PI/180)));
			y.lineWidth=15;
			y.strokeStyle='green';
			y.lineCap = "round";
			y.stroke();
			if(i1==360)
				i1=0;
			if(pos-y1<100&&pos-y1>50&&color!='all')
			{
				if(color=='yellow')
				{
					if((i1>=0&&i1<=60)||(i1>=300&&i1<=360))
						li=1;
				}
				if(color=='red')
				{
					if(i1>180&&i1<300)
						li=1;
				}
				if(color=='green')
				{
					if(i1>60&&i1<180)
						li=1;
				}
				
				
				if(li==0){
					fun();
					n11=2;
					document.getElementById("bb").disabled=true;
					
				}
			}

			if(y1-pos<100&&y1-pos>50&&color!='all')
			{
				if(color=='yellow')
				{
					if(i1>120&&i1<240)
						li=1;
				}
				if(color=='red')
				{
					if(i1>0&&i1<120)
						li=1;
				}
				if(color=='green')
				{
					if(i1>240&&i1<360)
						li=1;
				}
				
				
				if(li==0){
					fun();
					n11=2;
					document.getElementById("bb").disabled=true;
				}
			}
			

		}
		function ys(y1,color){
			var li=1;
			i3++;
			y.beginPath();
			y.moveTo(425, y1);
			y.lineTo(425+86.6*Math.cos(-i3*Math.PI/180)-(50*Math.sin(-i3*Math.PI/180)), y1+86.6*Math.sin(-i3*Math.PI/180)+(50*Math.cos(-i3*Math.PI/180)));
			y.lineWidth=15;
			y.strokeStyle='red';
			y.lineCap = "round";
			y.stroke();
			y.beginPath();
			y.moveTo(425, y1);
			y.lineTo(425-86.6*Math.cos(-i3*Math.PI/180)-(50*Math.sin(-i3*Math.PI/180)), y1-86.6*Math.sin(-i3*Math.PI/180)+(50*Math.cos(-i3*Math.PI/180)));
			y.lineWidth=15;
			y.strokeStyle='yellow';
			y.lineCap = "round";
			y.stroke();
			y.beginPath();
			y.moveTo(425, y1);
			y.lineTo(425+Math.cos(-i3*Math.PI/180)-(-100*Math.sin(-i3*Math.PI/180)), y1+Math.sin(-i3*Math.PI/180)+(-100*Math.cos(-i3*Math.PI/180)));
			y.lineWidth=15;
			y.strokeStyle='green';
			y.lineCap = "round";
			y.stroke();
			if(i3==360)
				i3=0;
			if(y1-pos>=-86.6&&y1-pos<=86.6){
				if(color=='red')
				{
					if(i3>60&&i3<360){
						if((Math.sin(i3*Math.PI/180)*(y1-pos))>80||(Math.sin(i3*Math.PI/180)*(y1-pos))<92)
							li=0;
					}
				}
				if(color='yellow'){
					if(i3>30&&i3<150)
						li=1;
				}
				if(color='green'){
					if(i3>150&&i3<2700)
						li=1;
				}
				if(li==0)
					fall=0;
			}
		}
		function circle2(y1,color)
		{
			circle(y1,125,color);
			oppcircle(y1,100,color);
			
			

		}


		

		





var p;

	
function sss(){

	var t;
	



function animate(){
	
  	p= requestAnimationFrame(animate);
    y.clearRect(0, 0, one.width, one.height);
    if(localStorage.getItem("topper")!=null){
		top1=localStorage.getItem("topper");
		document.getElementById("def").innerHTML=top1;
    }
	else
		top1=1;
	
	if((parseInt(top1))<fall)
		localStorage.setItem("topper",fall);
		pos++;
		
		
		ball(pos,color);


		var l=pos;
		for(laa=1;laa<ljk;laa++){

			obj=obj+circle(fall-1600*laa,125,color)+triangle(fall-1600*laa+400,color)+oppcircle(fall-1600*laa+800,125,color)+circle2(fall-1600*laa+1200,color)+ballchange(fall-20000*laa+10000,color);

		}
		sprite(fall-100000);


		function sprite(y1){
			
			ball(y1,'black');
			if(pos<=y1){
				i4++;

				if(i4<100){
					color='all';

					fall=fall+100;
				}
				else if(i4==100){
					color='yellow';
				}

			}
		}

		
		if(fall<=10000)
				i1=i1+0.5;
			else
				i1=i1+1;
		if(fall<=10000)
			i=i-1;
		else
			i=i-2;
		
		document.getElementById("a").disabled=true;
		
		
		
		
		var n1=fall;

		

		document.addEventListener("keypress",space);
		document.addEventListener("click",space);
		function space(event){
			var q=event.keyCode;
			if(q==32)
			j=0;
			
		}



		if(j<=3){

				if(pos>=300)
				{
					
					n1=n1+2;
					l=l-15;
					

				}
				if(pos<300)
				{
					
					n1=n1+17;
				}
				pos=l;
				fall=n1;
				j++;
			}
			else{
				
				pos=l;
				fall=n1;

			}
		document.getElementById('abc').innerHTML=fall;
		
		if(pos>=600){
		fun();
		fall=0;
	}


  }

	p=requestAnimationFrame(animate);
}
	document.addEventListener("keypress",pause);
	
		function pause(event){
			if(n11==0){
			var q=event.keyCode;
			n11=1;
			if(q==112||q==80)
				fun();			
			}
			if(n11==1){
			var q=event.keyCode;
			n11=0;
			if(q==114||q==82)
				sss();
			}
		}
	
