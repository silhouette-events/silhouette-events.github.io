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

var slider = document.getElementById("volume-slider");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  player.setVolume(this.value);
} 