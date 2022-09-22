// These are some of the classes of a complex 3rd-party video
// conversion framework. We don't control that code, therefore
// can't simplify it.

class VideoFile {}
class OggCompressionCodec {}
class MPEG4CompressionCodec {}
class CodecFactory {}
class BitrateReader {}
class AudioMixer {}

// We create a facade class to hide the framework's complexity
// behind a simple interface. It's a trade-off between
// functionality and simplicity.
class VideoConverter  {
  convert(filename, format): File {
    const file = new VideoFile(filename);
    const sourceCodec = new CodecFactory.extract(file);
    let destinationCodec = format == "mp4" ? new MPEG4CompressionCodec() : new OggCompressionCodec();

    const buffer = BitrateReader.read(filename, sourceCodec);
    let result = BitrateReader.convert(buffer, destinationCodec)
    result = (new AudioMixer()).fix(result)
    return new File(result);
  }
}

// Application classes don't depend on a billion classes
// provided by the complex framework. Also, if you decide to
// switch frameworks, you only need to rewrite the facade class.

class Application {
  main() {
    const convertor = new VideoConverter();
    const mp4 = convertor.convert("youtubevideo.ogg", "mp4");
    mp4.save();
  }
}