export default function (name) {
	const foundUsers = tryGetUsers(name);
	if (foundUsers.length > 0) {
		return {
			users: foundUsers,
			names: foundUsers.map((u) => u.data.name),
		};
	}

	const primaryCharacter = tryGetPrimaryCharacter(name);
	if (primaryCharacter) {
		console.warn(primaryCharacter);
		return {
			users: [primaryCharacter],
			names: [primaryCharacter.character.name],
		};
	}

	const foundActor = tryGetActors(name);
	if (foundActor) {
		return {
			users: getOwnersOf(foundActor),
			names: [foundActor.data.name],
		};
	}

	return [];
}

const tryGetUsers = (name) => {
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

	// Otherwise return an empty array
	return [];
};

const tryGetPrimaryCharacter = (name) => {
	const lname = name.toLowerCase();

	let actor = game.users.entities.find((a) => a.character && a.character.name.toLowerCase() === lname);
	return actor;
};

const tryGetActors = (name) => {
	const lname = name.toLowerCase();

	return game.actors.entities.find((a) => a.data.name.toLowerCase() === lname);
};

const getOwnersOf = (actor) => {
	const permission = actor.data.permission;
	const owners = [];
	for (const user in permission) {
		if (user !== "default" && permission[user] === CONST.ENTITY_PERMISSIONS.OWNER) {
			owners.push(user);
		}
	}
	return game.users.entities.filter((u) => owners.includes(u.id));
};
