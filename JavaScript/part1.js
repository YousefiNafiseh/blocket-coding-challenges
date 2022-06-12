var Component = function (config) {
	for (let property in config) {
		this[property] = config[property]
	}
}
var list = new Array("Item 1", "Item 2", "Item 3");
var instance = new Component({ id: "XF-254", list: list });
