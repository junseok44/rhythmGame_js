var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var YTplayer;
function onYouTubeIframeAPIReady() {
  YTplayer = new YT.Player("player", {
    width: "1000",
    height: "1000",
    videoId: "Km71Rr9K-Bw",
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function startVideo() {
  YTplayer.playVideo();
}

function onPlayerReady(event) {
  // event.target.playVideo();
  document.querySelector("iframe").addEventListener("click", (e) => {
    console.log("clicked");
    e.preventDefault();
    return;
  });
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}
function stopVideo() {
  YTplayer.stopVideo();
}
