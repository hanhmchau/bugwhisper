export default function (options) {
	if (this.isAuthor && !this.getFlag("bugwhisper", "whisperTargets")) {
		this.setFlag("bugwhisper", "whisperTargets", options.whisperTargets);
	}
}