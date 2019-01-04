class WindowsButton {
  render() { }
  onClick() { }
}

class HTMLButton {
  render() { }
  onClick() { }
}

class WebDialog {
  createButton() {
    return new WindowsButton()
  }
}

class WindowsDialog {
  createButton() {
    return new HTMLButton()
  }
}

class Application {
  constructor(factory) {
    this.factory = factory;
  }

  main() {
    factory.render();
  }
}

class ApplicationConfigurator {
  main() {
    let factory;
    const config = readApplicationConfigFile();
    
    if (config.OS == "Windows")
      factory = new WindowsDialog();
    else if (config.OS == "Web")
      factory = new WebDialog();
    else
      throw new Error("Error! Unknown operating system.");
    
    return new Application(factory);
  }
}