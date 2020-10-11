$(document).ready(function()
{
	$("#gameinfo").hide();
	$("#board").hide();
	$(".result").hide();
	$("#inst").hide();
	$("#load").hide();
	var cards = shuffle($("#board>div").get());
	$("#board").html(cards);
	var cardflpd = [];
	var cardids;
	var ovr;
	var c = 0, i, time = 100, flips = 1, match = 0, imagesLoaded = 0;
	var totalImages = $('img').length;
	$("#b1").click(function()
	{
		$("#menu").hide();
		$("#load").show();
		$('img').each(function(idx, img){
			$('<img>').on('load', imageLoaded).attr('src', $(img).attr('src'));
		});
		function imageLoaded()
		{
			imagesLoaded++;
			if(imagesLoaded == totalImages)
				allImagesLoaded();
		}
		function allImagesLoaded()
		{
			$("#gameinfo").show();
			$("#board").show();
			$("#load").hide();
			ovr = setInterval(function()
			{
				time--;
				document.getElementById("tmrmn").innerHTML = time;
				if(time == 0)
					los();
			},1000);
		}
	});
	$("#b2").click(function()
	{
		$("#menu").hide();
		$("#inst").show();
	});
	$("#bck").click(function()
	{
		$("#menu").show();
		$("#inst").hide();
	});
	$(".cards").click(flip);
	function flip()
	{
		cardids=this.id;
		var dig = cardids.substring(1);
		if(flipped(parseInt(dig,10)) == 0)
		{
			cardflpd[c++] = parseInt(dig,10);
			$("#"+cardids).addClass('visible');
			if(c % 2 == 0)
				misormatch(parseInt(dig,10));
			else
				document.getElementById("flpcnt").innerHTML = flips++;
			if(c == 20)
				win();
		}
	}
	function flipped(newcard)
	{
		for(i = 0; i<c ; i++)
		{
			if(newcard == cardflpd[i])
				return 1;
		}
		return 0;
	}
	function misormatch(newcard)
	{
		if(newcard % 2 == 0)
		{
			if(cardflpd[c-2] != (newcard-1))
				mis(newcard,cardflpd[c-2]);
			else
				match++;
		}
		else
		{
			if(cardflpd[c-2] != (newcard+1))
				mis(newcard,cardflpd[c-2]);
			else
				match++;
		}
	}
	function mis(prsntcard, prvcard)
	{
		setTimeout(function()
		{
			$("#c"+prsntcard.toString()).removeClass('visible');
			$("#c"+prvcard.toString()).removeClass('visible');
			cardflpd[c-1] = 25;
			cardflpd[c-2] = 25;
			c=c-2;
		}, 500);
	}
	function los()
	{
		clearInterval(ovr);
		$("#gameinfo").slideUp();
		$("#board").slideUp();
		$("#loss").slideDown();
		document.getElementById("lostim").innerHTML = time;
		document.getElementById("fliplos").innerHTML = flips;
		document.getElementById("crdmat").innerHTML = match;
	}
	function win()
	{
		clearInterval(ovr);
		$("#gameinfo").slideUp();
		$("#board").slideUp();
		$("#win").slideDown();
		document.getElementById("wintim").innerHTML = time;
		document.getElementById("flipwin").innerHTML = flips;
	}
	function shuffle(arr)
	{
		var curindx = arr.length;
		var tmpval, ranindx;
		while(0 != curindx)
		{
			ranindx = Math.floor(Math.random() * curindx);
			curindx--;
			tmpval = arr[curindx];
			arr[curindx] = arr[ranindx];
			arr[ranindx] =  tmpval;
		}
		return arr;
	}
	$(".btn").click(function(){
		location.reload();
	});
});