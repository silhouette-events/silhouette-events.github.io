var volumeSlider = document.getElementById("volume-slider");
var volumeSliderDisplay = document.getElementById("volume-slider-display");
volumeSliderDisplay.style.width = volumeSlider.value * 0.35 + 'px';

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

volumeSlider.oninput = function() {
	volumeSliderDisplay.style.width = volumeSlider.value * 0.35 + 'px';
	player.setVolume(volumeSlider.value / 100);
}

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

function streamPlay() {
	player.play();
	displayPlay();
}

function streamPause() {
	player.pause();
	displayPause();
}

function displayPause() {
	document.getElementById('stream-button-play').style.display = 'inline-block';
	document.getElementById('stream-button-pause').style.display = 'none';
}

function displayPlay() {
	document.getElementById('stream-button-pause').style.display = 'inline-block';
	document.getElementById('stream-button-play').style.display = 'none';
}