var volumeSlider = document.getElementById("volume-slider");
var volumeSliderDisplay = document.getElementById("volume-slider-display");
volumeSliderDisplay.style.width = volumeSlider.value * 0.94 + 'px';
var preMuteVolume = 25;

if (volumeSlider.value > 50) {
	document.getElementById('stream-button-volume-full').style.display = 'inline-block';
	document.getElementById('stream-button-volume-low').style.display = 'none';
	document.getElementById('stream-button-volume-mute').style.display = 'none';
} else {
	if (volumeSlider.value == 0) {
		document.getElementById('stream-button-volume-full').style.display = 'none';
		document.getElementById('stream-button-volume-low').style.display = 'none';
		document.getElementById('stream-button-volume-mute').style.display = 'inline-block';
	} else {
		document.getElementById('stream-button-volume-full').style.display = 'none';
		document.getElementById('stream-button-volume-low').style.display = 'inline-block';
		document.getElementById('stream-button-volume-mute').style.display = 'none';
	}
}

const options = {
	width: '100%',
	height: '100%',
	channel: "monstercat",
	autoplay: false,
	controls: false,
};

const player = new Twitch.Player("livestream", options);

player.addEventListener(Twitch.Player.READY, function() {
	player.setQuality('auto');
	player.setMuted(false);
	player.setVolume(0.5);
});

volumeSlider.oninput = function() {
	volumeSliderDisplay.style.width = volumeSlider.value * 0.94 + 'px';
	player.setVolume(volumeSlider.value / 100);
	if (volumeSlider.value > 50) {
		document.getElementById('stream-button-volume-full').style.display = 'inline-block';
		document.getElementById('stream-button-volume-low').style.display = 'none';
		document.getElementById('stream-button-volume-mute').style.display = 'none';
	} else {
		if (volumeSlider.value == 0) {
			document.getElementById('stream-button-volume-full').style.display = 'none';
			document.getElementById('stream-button-volume-low').style.display = 'none';
			document.getElementById('stream-button-volume-mute').style.display = 'inline-block';
		} else {
			document.getElementById('stream-button-volume-full').style.display = 'none';
			document.getElementById('stream-button-volume-low').style.display = 'inline-block';
			document.getElementById('stream-button-volume-mute').style.display = 'none';
		}
	}
}

function streamMute() {
	preMuteVolume = volumeSlider.value;
	volumeSlider.value = '0';
	volumeSliderDisplay.style.width = '0px';
	document.getElementById('stream-button-volume-full').style.display = 'none';
	document.getElementById('stream-button-volume-low').style.display = 'none';
	document.getElementById('stream-button-volume-mute').style.display = 'inline-block';
	player.setMuted(true);
}

function streamUnmute() {
	if (preMuteVolume == 0) {
		preMuteVolume = 25;
	}
	volumeSlider.value = preMuteVolume;
	volumeSliderDisplay.style.width = volumeSlider.value * 0.94 + 'px';
	document.getElementById('stream-button-volume-mute').style.display = 'none';
	if (preMuteVolume > 50) {
		document.getElementById('stream-button-volume-full').style.display = 'inline-block';
		document.getElementById('stream-button-volume-low').style.display = 'none';
	} else {
		document.getElementById('stream-button-volume-full').style.display = 'none';
		document.getElementById('stream-button-volume-low').style.display = 'inline-block';
	}
	player.setMuted(false);
	player.setVolume(preMuteVolume / 100);
}

player.addEventListener(Twitch.Player.PLAY, function() {
	document.getElementById('stream-button-pause').style.display = 'inline-block';
	document.getElementById('stream-button-play').style.display = 'none';
});

player.addEventListener(Twitch.Player.PAUSE, function() {
	document.getElementById('stream-button-play').style.display = 'inline-block';
	document.getElementById('stream-button-pause').style.display = 'none';
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

function toggleFullscreen() {
	if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
		document.exitFullscreen();
		document.getElementById('stream-button-fullscreen-exit').style.display = 'none';
		document.getElementById('stream-button-fullscreen-enter').style.display = 'inline-block';
	} else {
		document.querySelector('#livestream').requestFullscreen();
		document.getElementById('stream-button-fullscreen-enter').style.display = 'none';
		document.getElementById('stream-button-fullscreen-exit').style.display = 'inline-block';
	}
}