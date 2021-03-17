"use strict";

import { libWrapper } from "./lib/libwrapper.js";
import customWhisper from "./scripts/customWhisper.js";
import defaultWhisper from "./scripts/defaultWhisper.js";
import defaultOnCreate from "./scripts/defaultOnCreate.js";
import customGetWhisperRecipients from "./scripts/customGetWhisperRecipients.js";

Hooks.on("setup", () => {
	libWrapper.register(
		"bugwhisper",
		"ChatLog.prototype._processWhisperCommand",
		(...args) => {
			defaultWhisper(...args, customWhisper);
		},
		"OVERRIDE"
	);

	libWrapper.register("bugwhisper", "ChatMessage.getWhisperRecipients", customGetWhisperRecipients, "OVERRIDE");

	libWrapper.register("bugwhisper", "ChatMessage.prototype._onCreate", defaultOnCreate, "OVERRIDE");
});
