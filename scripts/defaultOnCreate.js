import customOnCreate from "./customOnCreate.js";

export default function (data, options, userId) {
	this.__proto__.__proto__._onCreate(data, options, userId);
	customOnCreate.call(this, options);
	ui.chat.postOne(this, true);
	if (options.chatBubble && canvas.ready) {
		this.collection.sayBubble(this);
	}
}