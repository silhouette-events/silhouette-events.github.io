window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var screenWidth = screen.width;
var volumeSlider = document.getElementById("volume-slider");
var volumeSliderDisplay = document.getElementById("volume-slider-display");
volumeSlider.value = 100;
volumeSliderDisplay.style.width = '94px';
var preMuteVolume = 100;
var chatStatus = 0;
var playStatus = 0;
var onlineStatus = 0;
var fullscreenStatus = 0;
var resStatus;
var firstPlay = 0;
var activeStatus = 1;

if (document.getElementById('banner').clientWidth > 800) {
	resStatus = 1;
} else {
	resStatus = 0;
}

window.onload = function() {
	document.getElementById('banner-offline-marker').style.opacity = '0';
	setTimeout(function() {
		document.getElementById('banner-offline-marker').innerHTML = "we're not live right now";
		document.body.style.overflowY = 'auto';
		if (onlineStatus == 0) {
			document.getElementById('banner-offline-marker').style.opacity = '1';
			document.getElementById('banner').style.height = '50vh';
		}
	}, 500);
}

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
	channel: "beatsturningstaff",
	autoplay: false,
	controls: false,
};

const player = new Twitch.Player("livestream", options);

player.addEventListener(Twitch.Player.READY, function() {
	player.setQuality('auto');
	player.setMuted(false);
	player.setVolume(1);
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
		preMuteVolume = 100;
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
	playStatus = 1;
});

player.addEventListener(Twitch.Player.PAUSE, function() {
	document.getElementById('stream-button-play').style.display = 'inline-block';
	document.getElementById('stream-button-pause').style.display = 'none';
	playStatus = 0;
});

player.addEventListener(Twitch.Player.ONLINE, function() {
	onlineStatus = 1;
	playerOnline();
});

player.addEventListener(Twitch.Player.OFFLINE, function() {
	onlineStatus = 1;
	playerOffline();
});

player.addEventListener(Twitch.Player.PLAYING, function() {
	console.log(player.getQualities());
	if (firstPlay == 0) {
		displayPlay();
	}
});

player.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, function() {
	alert('playback blocked');
	player.pause();
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
	document.getElementById('stream-center-icon').style.transition = 'opacity 0.1s, transform 0.5s';
	document.getElementById('stream-center-icon').style.opacity = '1';
	document.getElementById('stream-center-icon').style.transform = 'scale(2)';
	document.getElementById('stream-center-icon-play').style.display = 'none';
	document.getElementById('stream-center-icon-pause').style.display = 'block';
	setTimeout(function() {
		document.getElementById('stream-center-icon').style.opacity = '0';
		setTimeout(function() {
			document.getElementById('stream-center-icon').style.transition = '0s';
			document.getElementById('stream-center-icon').style.transform = 'scale(1)';
		}, 100);
	}, 400);
}

function displayPlay() {
	firstPlay = 1;
	document.getElementById('stream-button-pause').style.display = 'inline-block';
	document.getElementById('stream-button-play').style.display = 'none';
	document.getElementById('stream-center-icon').style.transition = 'opacity 0.1s, transform 0.5s';
	document.getElementById('stream-center-icon').style.opacity = '1';
	document.getElementById('stream-center-icon').style.transform = 'scale(2)';
	document.getElementById('stream-center-icon-pause').style.display = 'none';
	document.getElementById('stream-center-icon-play').style.display = 'block';
	setTimeout(function() {
		document.getElementById('stream-center-icon').style.opacity = '0';
		setTimeout(function() {
			document.getElementById('stream-center-icon').style.transition = '0s';
			document.getElementById('stream-center-icon').style.transform = 'scale(1)';
		}, 100);
	}, 400);
}

function toggleChat() {
	if (chatStatus == 0) {
		chatStatus = 1;
		document.getElementById('livestream-chat-container').style.transition = 'width 0.4s, left 0.4s';
		document.getElementById('livestream-chat-container').style.width = '400px';
		document.getElementById('livestream-chat-container').style.left = 'calc(100% - 400px)';
		document.getElementById('livestream').style.width = 'calc(100% - 400px)';
		document.getElementById('chat-mouse-detector').style.display = 'block';
		setTimeout(function() {
			document.getElementById('livestream-chat-container').style.transition = '0s';
		}, 400);
	} else {
		chatStatus = 0;
		document.getElementById('livestream-chat-container').style.transition = 'width 0.4s, left 0.4s';
		document.getElementById('livestream-chat-container').style.width = null;
		document.getElementById('livestream-chat-container').style.left = null;
		document.getElementById('livestream').style.width = '100%';
		document.getElementById('chat-mouse-detector').style.display = 'none';
		setTimeout(function() {
			document.getElementById('livestream-chat-container').style.transition = '0s';
		}, 400);
	}
}

var timeoutID;
 
function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);
 
    startTimer();
}
setup();
 
function startTimer() {
    timeoutID = window.setTimeout(goInactive, 2000);
}
 
function resetTimer(e) {
    window.clearTimeout(timeoutID);
 
    goActive();
}
 
function goInactive() {
	document.getElementById('stream-mouse-detector').style.cursor = 'none';
	document.getElementById('stream-button-panel-container').style.pointerEvents = 'none';
	document.getElementById('stream-button-panel-container').style.opacity = '0';
	if (firstPlay == 1) {
		activeStatus = 0;
	}
}
 
function goActive() {
	document.getElementById('stream-mouse-detector').style.cursor = 'auto';
	document.getElementById('stream-button-panel-container').style.pointerEvents = 'auto';
	document.getElementById('stream-button-panel-container').style.opacity = '1';
    startTimer();
	setTimeout(function() {
		activeStatus = 1;
	}, 400);
}

function streamToggle() {
	if (playStatus == 0) {
		player.play();
		displayPlay();
	} else {
		player.pause();
		displayPause();
	}
}

jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
  return this.each(function(){
    var clicks = 0, self = this;
    jQuery(this).click(function(event){
      clicks++;
      if (clicks == 1) {
        setTimeout(function(){
          if(clicks == 1) {
            single_click_callback.call(self, event);
          } else {
            double_click_callback.call(self, event);
          }
          clicks = 0;
        }, timeout || 300);
      }
    });
  });
}

$("#stream-mouse-detector").single_double_click(function() {
	if (screen.width <= 800) {
		if (activeStatus == 1) {
			streamToggle();
		}
	} else {
		streamToggle();
	}
}, function() {
	toggleFullscreen();
});

$("#chat-mouse-detector").single_double_click(function() {
	chatStatus = 0;
	document.getElementById('livestream-chat-container').style.transition = 'width 0.4s, left 0.4s';
	document.getElementById('livestream-chat-container').style.width = '0px';
	document.getElementById('livestream-chat-container').style.left = '100%';
	document.getElementById('livestream').style.width = '100%';
	document.getElementById('chat-mouse-detector').style.display = 'none';
	setTimeout(function() {
		document.getElementById('livestream-chat-container').style.transition = '0s';
	}, 400);
}, function() {
	toggleFullscreen();
})

document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }
    var key = event.key || event.keyCode;
    if (key === 'F' || key === 'f' || key === 70) {
        toggleFullscreen();
    }
});

$(window).keypress(function(e) {
    if (e.which === 32) {
        streamToggle();
    }
	if (e.which === 32 && e.target == document.body) {
		return false;
	}
});

function playerOnline() {
	document.getElementById('livestream-container').style.transition = 'height 1s';
	document.getElementById('livestream-container').style.height = '100vh';
	document.getElementById('banner').style.height = '0px';
	document.getElementById('livestream-container').style.borderTop = '2px solid red';
	document.getElementById('banner-offline-marker').style.opacity = '0';
	if (document.getElementById('livestream-container').clientWidth < 800) {
		document.getElementById('livestream-container').style.minHeight = 'calc(56.25vw + 350px)';
	}
	goActive();
	setTimeout(function() {
		document.getElementById('livestream-container').style.pointerEvents = 'auto';
		document.getElementById('livestream-container').style.transition = '0s';
		document.getElementById('livestream-container').style.borderTop = '2px solid transparent';
		goActive();
	}, 1000);
}

function playerOffline() {
	document.exitFullscreen();
	document.getElementById('stream-button-fullscreen-exit').style.display = 'none';
	document.getElementById('stream-button-fullscreen-enter').style.display = 'inline-block';
	document.getElementById('livestream-container').style.borderTop = '2px solid red';
	document.getElementById('livestream-container').style.transition = 'height 1s';
	document.getElementById('livestream-container').style.height = '0px';
	document.getElementById('livestream-container').style.minHeight = '0px';
	document.getElementById('banner-offline-marker').style.opacity = '1';
	document.getElementById('livestream-container').style.pointerEvents = 'none';
	document.getElementById('banner').style.height = '50vh';
	chatStatus = 0;
	document.getElementById('livestream-chat-container').style.transition = 'width 0.4s, left 0.4s';
	document.getElementById('livestream-chat-container').style.width = null;
	document.getElementById('livestream-chat-container').style.left = null;
	document.getElementById('livestream').style.width = '100%';
	document.getElementById('chat-mouse-detector').style.display = 'none';
	setTimeout(function() {
		document.getElementById('livestream-chat-container').style.transition = '0s';
		setTimeout(function() {
			document.getElementById('livestream-container').style.transition = '0s';
			document.getElementById('livestream-container').style.borderTop = '2px solid transparent';
		}, 6000);
	}, 400);
}

var eventList = [];
var element = document.getElementById('event-list-container');
$.getJSON( "https://beatsturning.com/data/getevents.php", function(data){
	eventList = JSON.parse(data);
	console.log(eventList);
	var i = 0;
	while (i < eventList.length) {
		var newDiv = document.createElement('div');
		element.appendChild(newDiv);
		newDiv.classList.add("event-container");
		var newImg = document.createElement('div');
		newImg.classList.add("event-image");
		newDiv.appendChild(newImg);
		newImg.style.backgroundImage = "url('https://beatsturning.com/data/event-thumbnails/" + eventList[i]['img-id'] + "')";
		var newTextSpace = document.createElement('div');
		newTextSpace.classList.add("event-text-container");
		newDiv.appendChild(newTextSpace);
		var newTitle = document.createElement('h4');
		var newNode = document.createTextNode(eventList[i]['title']);
		newTitle.appendChild(newNode);
		newTextSpace.appendChild(newTitle);
		var newPara = document.createElement('p');
		var newNode = document.createTextNode(eventList[i]['description']);
		newPara.appendChild(newNode);
		newTextSpace.appendChild(newPara);
		var newLink = document.createElement('a');
		var newNode = document.createTextNode(eventList[i]['link-msg']);
		newLink.appendChild(newNode);
		newTextSpace.appendChild(newLink);
		newLink.href = 'https://' + eventList[i]['link'];
		newLink.target = '_blank';
		i++;
	}
});

function toggleFullscreen() {
	if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
		document.exitFullscreen();
		document.getElementById('stream-button-fullscreen-exit').style.display = 'none';
		document.getElementById('stream-button-fullscreen-enter').style.display = 'inline-block';
		fullscreenStatus = 0;
		if (document.getElementById('banner').clientWidth <= 800) {
			document.getElementById('livestream').style.height = '56.25vw';
		}
	} else {
		document.querySelector('#livestream-container').requestFullscreen();
		document.getElementById('stream-button-fullscreen-enter').style.display = 'none';
		document.getElementById('stream-button-fullscreen-exit').style.display = 'inline-block';
		fullscreenStatus = 1;
		if (document.getElementById('banner').clientWidth <= 800) {
			document.getElementById('livestream').style.height = '100vh';
		}
	}
}

setInterval(function() {
	if (document.getElementById('banner').clientWidth > 800 && resStatus == 0) { //resize to large
		resStatus = 1;
		//alert('resize to large');
		document.getElementById('livestream').style.height = window.innerHeight + 'px';
		document.getElementById('livestream-chat-parent').style.height = null;
		document.getElementById('livestream-chat-parent').style.minHeight = '0px';
		document.getElementById('stream-button-volume-container').style.display = null;
		document.getElementById('livestream-container').style.minHeight = '0px';
		player.setVolume(1);
		volumeSlider.value = 100;
		volumeSliderDisplay.style.width = '94px';
		player.setMuted(false);
	}
	
	if (document.getElementById('banner').clientWidth <= 800 && resStatus == 1) { //resize to small
		resStatus = 0;
		//alert('resize to small');
		chatStatus = 0;
		document.getElementById('livestream').style.height = '56.25vw';
		document.getElementById('livestream-chat-container').style.width = null;
		document.getElementById('livestream-chat-container').style.left = null;
		document.getElementById('livestream').style.transition = '0s';
		document.getElementById('livestream').style.width = '100%';
		document.getElementById('chat-mouse-detector').style.display = 'none';
		document.getElementById('livestream-container').style.minHeight = '350px';
		setTimeout(function() {
			document.getElementById('livestream').style.transition = 'width 0.4s';
		}, 50);
	}
	if (document.getElementById('banner').clientWidth <= 800) {
		if (fullscreenStatus == 0) {
			document.getElementById('livestream-chat-parent').style.height = 'calc(' + window.innerHeight + 'px - 56.25vw)';
			document.getElementById('livestream-chat-parent').style.display = 'block';
		} else {
			document.getElementById('livestream-chat-parent').style.display = 'none';
		}
	}
	
}, 0);

if (screen.width > 800) {
	document.getElementById('stream-button-volume-full').style.display = 'inline-block';
	document.getElementById('stream-button-volume-low').style.display = 'none';
	document.getElementById('stream-button-volume-mute').style.display = 'none';
	player.setVolume(1);
	volumeSlider.value = 100;
	volumeSliderDisplay.style.width = '94px';
	player.setMuted(false);
} else {
	document.getElementById('stream-button-volume-full').style.display = 'none';
	document.getElementById('stream-button-volume-low').style.display = 'none';
	document.getElementById('stream-button-volume-mute').style.display = 'none';
	document.getElementById('stream-button-volume-container').style.display = 'none';
	player.setVolume(1);
	volumeSlider.value = 100;
	volumeSliderDisplay.style.width = '94px';
	player.setMuted(false);
}