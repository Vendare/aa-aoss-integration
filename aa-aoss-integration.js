Hooks.once("ready", () => {
    if (!game.modules.get("autoanimations")?.active) {
        ui.notifications.error("Automated Animations is not active! Please enable the Automated Animations Module");
        return;
    }
    console.log("AA-AOS-Integratuion is Ready. Registering hooks.");
    registerHooksAOSS();
});

function registerHooksAOSS() {
    Hooks.on("createChatMessage", async (msg) => callAnimation(msg));
}

async function callAnimation(msg) {
    const test = msg.system.test;
    const item = test.item;
    const targets = test.targetTokens
    const sourceToken = canvas.tokens.get(msg.speaker.token)
        ?? canvas.tokens.placeables.find(t => t.actor?.id === msg.speaker.actor);

    console.log(`AA-AOSS-Integration | Play Animation of "${item.name}" for Actor ${sourceToken.actor.name} against ${targets.map(t => t.actor.name).join(",")} `);
    await AutoAnimations.playAnimation(sourceToken, targets, item);
}

