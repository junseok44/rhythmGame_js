class YouTubePlayer {
  constructor() {
    this.videoId = null;
    this.width = 800;
    this.height = 800;
    this.YTplayer = null;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  setYoutubePlayer() {}

  changeVideo(videoId) {
    this.videoId = videoId;
    if (this.YTplayer) {
      this.YTplayer.cueVideoById(videoId);
    }
  }

  onYouTubeIframeAPIReady() {
    this.YTplayer = new YT.Player("player", {
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: {
        controls: 0,
        disablekb: 1,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        // onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
  }

  startVideo() {
    if (this.YTplayer) {
      this.YTplayer.playVideo();
    }
  }

  onPlayerReady(event) {
    document.querySelector("iframe").addEventListener("click", (e) => {
      e.preventDefault();
      return;
    });
  }

  pauseVideo() {
    if (this.YTplayer) {
      this.YTplayer.pauseVideo();
    }
  }

  stopVideo(time) {
    if (this.YTplayer) {
      if (time) {
        this.YTplayer.stopVideo(time);
      } else {
        this.YTplayer.stopVideo();
      }
    }
  }
}
