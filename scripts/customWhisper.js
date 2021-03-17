const customWhisper = (chatData, whisperTargets, createOptions) => {
    addSpeaker(chatData);
    createOptions.whisperTargets = whisperTargets;
};

const addSpeaker = chatData => {
    const controlledToken = canvas.tokens.controlled[0];
    if (controlledToken) {
        const actor = controlledToken.actor;
        chatData.speaker = {
            actor: actor.id,
            alias: actor.data.name,
            token: controlledToken.id
        };
        return;
    }

    const defaultActor = game.user.character;
    if (defaultActor) {
        chatData.speaker = {
            actor: defaultActor.id,
            alias: defaultActor.data.name
        };
        return;
    }
};

export default customWhisper;
