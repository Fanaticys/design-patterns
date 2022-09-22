// The interface of a remote service.
interface ThirdPartyYoutubeLib {
  listVideos();
  getVideoInfo(id);
  downloadVideo(id);
}

// The concrete implementation of a service connector. Methods
// of this class can request information from YouTube. The speed
// of the request depends on a user's internet connection as
// well as YouTube's. The application will slow down if a lot of
// requests are fired at the same time, even if they all request
// the same information.
class ThirdPartyYoutubeClass implements ThirdPartyYoutubeLib {
    listVideos() {} // Send an API request to YouTube.
    getVideoInfo(id) {} // Get metadata about some video.
    downloadVideo(id) {} // Download a video file from YouTube.
}

// To save some bandwidth, we can cache request results and keep
// them for some time. But it may be impossible to put such code
// directly into the service class. For example, it could have
// been provided as part of a third party library and/or defined
// as `final`. That's why we put the caching code into a new
// proxy class which implements the same interface as the
// service class. It delegates to the service object only when
// the real requests have to be sent.
class CachedYoutubeClass implements ThirdPartyYoutubeLib {
    private service: ThirdPartyYoutubeLib;
    private listCache; 
    private videoCache;
    private needReset;

    constructor (service: ThirdPartyYoutubeLib) {
      this.service = service
    }

    listVideos() {
      if (this.listCache == null || this.needReset) {
        this.listCache = this.service.listVideos()
      }
      return this.listCache;
    }

    getVideoInfo(id) {
      if (this.videoCache == null || this.needReset) {
        this.videoCache = this.service.getVideoInfo(id)
      }
      return this.videoCache;
    }

    downloadVideo(id) {
      if (!downloadExists(id) || this.needReset) {
        this.service.downloadVideo(id);
      }
    }
}
// The GUI class, which used to work directly with a service
// object, stays unchanged as long as it works with the service
// object through an interface. We can safely pass a proxy
// object instead of a real service object since they both
// implement the same interface.
class YoutubeManager {
  protected service: ThirdPartyYoutubeLib

    constructor (service: ThirdPartyYoutubeLib) {
      this.service = service;
    }

    // Render the video page.
    renderVideoPage(id) {
      info = this.service.getVideoInfo(id);
    }

    // Render the list of video thumbnails.
    renderListPanel() {
      list = this.service.listVideos();
    }

    reactOnUserInput(id) {
      this.renderVideoPage(id);
      this.renderListPanel();
    }
}

// The application can configure proxies on the fly.
class Application {
  init() {
    const aYouTubeService = new ThirdPartyYoutubeClass();
    const aYouTubeProxy = new CachedYoutubeClass(aYouTubeService);
    const manager = new YoutubeManager(aYouTubeProxy);
    manager.reactOnUserInput(id);
  }
}