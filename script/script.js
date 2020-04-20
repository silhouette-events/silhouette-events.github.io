const options = {
	width: 640,
	height: 360,
	channel: "monstercat",
	autoplay: false,
	controls: true,
};

const player = new Twitch.Player("player", options);

player.addEventListener(Twitch.Player.READY, function() {
	player.setQuality('160p30');
	player.setMuted(false);
	player.setVolume(0.5);
});

player.addEventListener(Twitch.Player.PLAY, function() {
	document.getElementById('status').innerHTML = 'playing';
});

player.addEventListener(Twitch.Player.PAUSE, function() {
	document.getElementById('status').innerHTML = 'paused';
});

player.addEventListener(Twitch.Player.ONLINE, function() {
	document.getElementById('status2').innerHTML = 'online';
});

player.addEventListener(Twitch.Player.OFFLINE, function() {
	document.getElementById('status2').innerHTML = 'offline';
});

player.addEventListener(Twitch.Player.PLAYING, function() {
	console.log(player.getQualities());
});

var mouseE = document.querySelector('.volume-slider-con');
var eInner = document.querySelector('.volume-slider');
var drag = false;
mouseE.addEventListener('mousedown',function(ev){
   drag = true;
   updateBar(ev.clientY);
});
document.addEventListener('mousemove',function(ev){
   if(drag){
      updateBar(ev.clientY);
   }
});
document.addEventListener('mouseup',function(ev){
 drag = false;
});
var updateBar = function (x, vol) {
   var volume = mouseE;
        var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetTop;
            percentage = 100 * position / volume.clientHeight;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }

        //update volume bar and video volume
        eInner.style.height = percentage +'%';
		document.getElementById('volume-knob').style.top = (percentage - 5) / 2.5 +'px';
		//eInner.style.top = 100 - percentage + 'px';
	var newVolume = 1 - percentage / 100
	alert(newVolume);
        player.setVolume(newVolume);
};
