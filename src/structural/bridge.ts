// The "abstraction" defines the interface for the "control"
// part of the two class hierarchies. It maintains a reference
// to an object of the "implementation" hierarchy and delegates
// all of the real work to this object.
class RemoteControl {
  protected device: Device;

  constructor(device) {
    this.device = device;
  }

  togglePower() { this.device.isEnabled() ? this.device.disable() : this.device.enable()}
  volumeDown() { this.device.setVolume(this.device.getVolume() - 10); }
  volumeUp() { this.device.setVolume(this.device.getVolume() + 10); }
  channelDown() { this.device.setChannel(this.device.getChannel() - 1);}
  channelUp() { this.device.setChannel(this.device.getChannel() + 1); }
}
    
// You can extend classes from the abstraction hierarchy
// independently from device classes.
class AdvancedRemoteControl extends RemoteControl {
  mute() { this.device.setVolume(0); }
}

// The "implementation" interface declares methods common to all
// concrete implementation classes. It doesn't have to match the
// abstraction's interface. In fact, the two interfaces can be
// entirely different. Typically the implementation interface
// provides only primitive operations, while the abstraction
// defines higher-level operations based on those primitives.
interface Device {
  isEnabled()
  enable()
  disable()
  getVolume()
  setVolume(percent)
  getChannel()
  setChannel(channel)
}

// All devices follow the same interface.
class Tv implements Device {
  isEnabled() {}
  enable() {}
  disable() {}
  getVolume() {}
  setVolume(percent) {}
  getChannel() {}
  setChannel(channel) {}
}
class Radio implements Device {
  isEnabled() {}
  enable() {}
  disable() {}
  getVolume() {}
  setVolume(percent) {}
  getChannel() {}
  setChannel(channel) {}
}

// Somewhere in client code.
const tv = new Tv();
const remote = new RemoteControl(tv);
remote.togglePower();

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.mute();