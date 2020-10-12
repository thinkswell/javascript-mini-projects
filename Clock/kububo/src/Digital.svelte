<script>
  let today = new Date();
	$: hours = today.getHours();
	$: minutes = today.getMinutes();
	$: seconds = today.getSeconds();

	setInterval(() => {
		today = new Date();
	}, 1000);
</script>

<div class="clock d-flex justify-content-center">
  <div class="hours mx-1">{(hours > 9) ? hours % 12 : '0'+hours}</div>
  <div>:</div>
  <div class="minutes mx-1">{(minutes > 9) ? minutes : '0'+minutes}</div>
  <div>:</div>
  <div class="seconds mx-1">
    {(seconds > 9) ? seconds : '0'+seconds}
    <span class="small">{(hours > 12) ? 'PM' : 'AM'}</span>
  </div>
</div>

<style>
  .clock > div {
    font-size: 9rem;
    font-weight: 500;
    display: inline-block;
  }
  .clock span {
    font-size: 4rem;
    font-weight: 100;
    display: inline-block;
  }
</style>