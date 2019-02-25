// The interface of a remote service.
interface ThirdPartyYoutubeLib is
  method listVideos()
  method getVideoInfo(id)
  method downloadVideo(id)

// The concrete implementation of a service connector. Methods
// of this class can request information from YouTube. The speed
// of the request depends on a user's internet connection as
// well as YouTube's. The application will slow down if a lot of
// requests are fired at the same time, even if they all request
// the same information.
class ThirdPartyYoutubeClass implements ThirdPartyYoutubeLib is
    method listVideos() is
        // Send an API request to YouTube.

    method getVideoInfo(id) is
        // Get metadata about some video.

    method downloadVideo(id) is
        // Download a video file from YouTube.

// To save some bandwidth, we can cache request results and keep
// them for some time. But it may be impossible to put such code
// directly into the service class. For example, it could have
// been provided as part of a third party library and/or defined
// as `final`. That's why we put the caching code into a new
// proxy class which implements the same interface as the
// service class. It delegates to the service object only when
// the real requests have to be sent.
class CachedYoutubeClass implements ThirdPartyYouTubeLib is
    private field service: ThirdPartyYouTubeClass
    private field listCache, videoCache
    field needReset

    constructor CachedYoutubeClass(service: ThirdPartyYouTubeLib) is
        this.service = service

    method listVideos() is
      if (listCache == null || needReset)
        listCache = service.listVideos()
      return listCache

    method getVideoInfo(id) is
    if (videoCache == null || needReset)
      videoCache = service.getVideoInfo(id)
    return videoCache

    method downloadVideo(id) is
    if (!downloadExists(id) || needReset)
      service.downloadVideo(id)

// The GUI class, which used to work directly with a service
// object, stays unchanged as long as it works with the service
// object through an interface. We can safely pass a proxy
// object instead of a real service object since they both
// implement the same interface.
class YoutubeManager is
    protected field service: ThirdPartyYouTubeLib

    constructor YoutubeManager(service: ThirdPartyYouTubeLib) is
      this.service = service

    method renderVideoPage() is
      info = service.getVideoInfo()
    // Render the video page.

    method renderListPanel() is
      list = service.listVideos()
    // Render the list of video thumbnails.

    method reactOnUserInput() is
      renderVideoPage()
      renderListPanel()

// The application can configure proxies on the fly.
class Application is
method init() is
aYouTubeService = new ThirdPartyYouTubeClass()
aYouTubeProxy = new CachedYouTubeClass(aYouTubeService)
manager = new YouTubeManager(aYouTubeProxy)
manager.reactOnUserInput()