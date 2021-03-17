export default function (name) {
	// Whisper to groups
	if (["GM", "DM"].includes(name.toUpperCase())) {
		return game.users.entities.filter((u) => u.isGM);
	} else if (name.toLowerCase() === "players") {
		return game.users.players;
	}

	// Match against lowercase name
	const lname = name.toLowerCase();

	// Whisper to a single person
	let user = game.users.entities.find((u) => u.name.toLowerCase() === lname);
	if (user) return [user];
	let actor = game.users.entities.find((a) => a.character && a.character.name.toLowerCase() === lname);
	if (actor) return [actor];

    const result = customGetWhisperRecipients(lname);
	if (result) return result;

	// Otherwise return an empty array
	return [];
}

const customGetWhisperRecipients = (name) => {
	let actor = game.actors.entities.find(a => a.data.name.toLowerCase() === name);
	if (actor) {
		const permission = actor.data.permission;
		const owners = [];
		for (const user in permission) {
			if (user !== "default" && permission[user] === CONST.ENTITY_PERMISSIONS.OWNER) {
				owners.push(user);
			}
        }
		return game.users.entities.filter(u => owners.includes(u.id))
	}
};
