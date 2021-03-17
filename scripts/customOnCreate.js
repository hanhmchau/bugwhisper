export default function (options) {
	if (this.isAuthor && !this.getFlag("bugwhisper", "whisperTargets")) {
		this.setFlag("bugwhisper", "whisperTargets", prettifyWhisperTargets(options.whisperTargets));
	}
}

const prettifyWhisperTargets = (whisperTargets) => {
	if (whisperTargets) {
		return whisperTargets.map((target) => {
			const ltarget = target.toLowerCase();
			if (ltarget === "gm") return "Gamemaster";
			const user = game.users.entities.find((user) => user.data.name.toLowerCase() === ltarget);
			if (user) return user.data.name;
			return target;
		});
	}
	return whisperTargets;
};
