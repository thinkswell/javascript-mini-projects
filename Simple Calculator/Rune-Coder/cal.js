$(document).ready(function()
{
	var num = [];
	var str="";
	var d = 0;
	var no = "";
	var frmt;
	var c = 0;
	var ch = ' ';
	var i;
	var pos = 0;
	var p = 0;
	var o = 0;
	var ans = "";
	numfor = new Intl.NumberFormat('en-US');
	$(".number").click(print);
	$("#point").click(print);
	$("#ans").click(prvans);
	function prvans()
	{
		$("#preview").slideDown();
		ans = ans.replace(/,/g,'');
		ans = ans.substring(2);
		o=0;
		for(i=0; i<ans.length; i++)
		{
			var dig = ans.charAt(i);
			num.push(dig);
			c++;
			str += dig;
		}
		var res = parse(str);
		document.getElementById("problem").innerHTML = str;
		frmt = numfor.format(res);
		document.getElementById("preview").innerHTML = "= "+frmt;
	}
	function print(event)
	{
		$("#preview").slideDown();
		c++;
		var id = event.target.id;
		var dig = id.charAt(1);
		if(dig >= '0' && dig <= '9')
			d++;
		if(dig == 'o')
			dig='.';
		var pt = str.indexOf('.');
		if(pt == -1)
			pt=c;
		if(d <= 9 )
		{
			o=0;
			p=0;
			num.push(dig);
			str += dig;
			var res = parse(str);
			if(str.charAt(0) == '0')
				str=str.substring(1);
			document.getElementById("problem").innerHTML = str;
			frmt = numfor.format(res);
			document.getElementById("preview").innerHTML = "= "+frmt;
		}
	}
	$("#backspace").click(del);
	function del()
	{
		c = num.length;
		 if(num[c-1] >= '0' && num[c-1] <= '9')
			 d--;
	 	if(num[c-2] == '+' || num[c-2] == '-' || num[c-2] == '*' || num[c-2] == '/')
		  {
		 				num.pop();
		    c--;
		  }
		 c--;
	 	o=0;
	 	num.pop();
		 str = "";
		 for(i = 0; i< c; i++)
			 str += num[i];
		 var pt = str.indexOf('.');
		 if(pt == -1)
			 p=0;
		
	if(str == "")
			{	 document.getElementById("problem").innerHTML = "";
							document.getElementById("preview").innerHTML = "";
							}
							else{
											var res = parse(str);
		     frmt = numfor.format(res);	document.getElementById("problem").innerHTML = str;
		document.getElementById("preview").innerHTML = "= "+frmt;
		}
		
		
	}
	$("#clear").click(clr);
	function clr()
	{
		$("#preview").slideDown();
		document.getElementById("problem").innerHTML = "";
		document.getElementById("preview").innerHTML = "";
		num.splice(0,num.length);
		str="";
		c=0;
		p=0;
		o=0;
		d=0;
	}
	$("#percentage").click(prcntg);
	function prcntg()
	{
		p++;
		if (p <= 1)
		{
			for (i = c-1; i >= 0; i--)
			{
				ch = str.charAt(i);
				if(ch < '0' || ch > '9' && ch != '.' && ch !=' ')
				{
					pos = i+1;
					break;
				}
			}
			var per = str.substring(pos);
			str = parse(per+"*0.01");
			c=pos;
			frmt = numfor.format(str);
			for (i = 0; i<frmt.length ; i++)
				num[c++]=frmt.charAt(i);
			c = num.length;
			str = "";
			for(i = 0; i< c; i++)
				str += num[i];
			document.getElementById("problem").innerHTML = str;
			document.getElementById("preview").innerHTML = "= "+frmt;
		}
	}
	$("#d\\/").click(ops);
	$("#m\\*").click(ops);
	$("#m\\-").click(ops);
	$("#p\\+").click(ops);
	function ops(event)
	{
		
		if(d<9 && o<1)
		{
			var id;
			var dig;
			o++;
			if(c>0)
			{
			id = event.target.id;
			dig = id.charAt(1);
			num.push(dig);
			str += dig;
			if(str.charAt(0) == '0')
				str=str.substring(1);
			if(dig == "*")
				document.getElementById("problem").innerHTML += "&times";
			else if(dig == "/")
				document.getElementById("problem").innerHTML += "&divide";
			else
				document.getElementById("problem").innerHTML += dig;
			}
			else
			{
				id = event.target.id;
				dig = id.charAt(1);
				num.push(dig);
				str += dig;
				if(str.charAt(0) == '0')
					str=str.substring(1);
				if(dig == "-")
					document.getElementById("problem").innerHTML += dig;
			}
			c++;
			no = "";
			p=0;
		}
	}
	$("#equals").click(rslt);
	function rslt()
	{
		ans = document.getElementById("preview").innerHTML;
		document.getElementById("problem").innerHTML = ans;
		document.getElementById("preview").innerHTML = "";
		$("#preview").slideUp();
		num.splice(0,num.length);
		str="";
		c=0;
		p=0;
		o=0;
	}

	function parse(s)
	{
		return Function(`'use strict'; return (${s})`)();
	}
});
