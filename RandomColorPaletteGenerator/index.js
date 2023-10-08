$(function() {
	var a = randomColor();
	var b = randomColor();
	var c = randomColor();
	var d = randomColor();
	$('.first').css({
		backgroundColor: a
	});
	$('.second').css({
		backgroundColor: b
	});
	$('.third').css({
		backgroundColor: c
	});
	$('.fourth').css({
		backgroundColor: d
	});
	$('.first > h1').html(a);
	$('.second > h1').html(b);
	$('.third > h1').html(c);
	$('.fourth > h1').html(d);
	$('body').keyup(function(e) {
    if (e.keyCode == 32){
      var randomone = randomColor();
			var randomtwo = randomColor();
			var randomthree = randomColor();
			var randomfour = randomColor();
      $('.first').animate({
				backgroundColor: randomone
			});
			$('.second').animate({
				backgroundColor: randomtwo
			});
			$('.third').animate({
				backgroundColor: randomthree
			});
			$('.fourth').animate({
				backgroundColor: randomfour
			});
			$('.first > h1').html(randomone);
			$('.second > h1').html(randomtwo);
			$('.third > h1').html(randomthree);
			$('.fourth > h1').html(randomfour);
    }
  });
});