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
	constructor() {
		this.dialog; 
	}

	initialize() {
		const config = readApplicationConfigFile();

		if (config.OS == "Windows")
			this.dialog = new WindowsDialog();
		else if (config.OS == "Web")
			this.dialog = new WebDialog();
		else
			throw new Error("Error! Unknown operating system.");
	}

	main() {
		dialog.initialize();
		dialog.render();
	}
}
