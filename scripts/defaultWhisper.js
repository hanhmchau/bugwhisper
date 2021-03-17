const defaultWhisper = (command, match, chatData, createOptions, customWhisperFunction) => {
	// Prepare whisper data
	chatData.type = CONST.CHAT_MESSAGE_TYPES.WHISPER;
	delete chatData.speaker;

	// Determine the recipient users
	let users = [];
	let message = "";
	switch (command) {
		case "whisper":
            const names = match[2].replace(/[\[\]]/g, "").split(",").map(n => n.trim());
			users = names.reduce((arr, n) => arr.concat(ChatMessage.getWhisperRecipients(n)), []);
			message = match[3];
            customWhisperFunction(chatData, names, createOptions);
            break;
		case "reply":
			message = match[2];
			const w = this._lastWhisper;
			if (w) {
				const group = new Set(w.data.whisper);
				group.add(w.data.user);
				group.delete(game.user._id);
				users = Array.from(group).map((id) => game.users.get(id));
			}
			break;
		case "gm":
			message = match[2];
			users = ChatMessage.getWhisperRecipients("gm");
			break;
		case "players":
			message = match[2];
			users = ChatMessage.getWhisperRecipients("players");
			break;
	}

	// Ensure we have valid whisper targets
	if (!users.length) throw new Error("No target users exist for this whisper.");
	if (users.some((u) => !u.isGM) && !game.user.can("MESSAGE_WHISPER")) {
		throw new Error("You do not have permission to send whispered chat messages to other players.");
	}

	// Update chat data
	chatData.whisper = users.map((u) => u._id);
	chatData.content = message;
	chatData.sound = CONFIG.sounds.notification;
};

export default defaultWhisper;
