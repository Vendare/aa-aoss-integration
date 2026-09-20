Hooks.once("ready", () => {
    if (!game.modules.get("autoanimations")?.active) {
        ui.notifications.error("Automated Animations is not active! Please enable the Automated Animations Module");
        return;
    }
    console.log("AA-AOS-Integratuion is Ready. Registering hooks.");
    registerHooksAOSS();
});

function registerHooksAOSS() {
    Hooks.on("updateChatMessage", async (msg) => callAnimation(msg));
}

async function callAnimation(msg) {
    const test = msg.test ?? msg.system.test;
    if (!test) { return; }
    const item = test.item;
    if(!item) { return; }
    const targets = test.targetTokens.map(t => { return { document:t }; });
    if (!targets || targets.length === 0) { return; }
    const sourceToken = canvas.tokens.get(msg.speaker.token)
        ?? canvas.tokens.placeables.find(t => t.actor?.id === msg.speaker.actor);

    console.log(`AA-AOSS-Integration | Play Animation of "${item.name}" for Actor ${sourceToken.actor.name} against ${targets.map(t => t.document.actor.name).join(",")} `);
    await AutomatedAnimations.playAnimation(sourceToken, item, {
        targets: targets
    });
}

