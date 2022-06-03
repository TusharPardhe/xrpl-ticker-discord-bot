const { Client, Intents, Permissions } = require("discord.js");

const onDiscordMessage = require("./functions/messages");
const getTokenPrice = require("./functions/getTokenPrice");
require("dotenv").config();

const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

discordClient.on("ready", () => {
    // clear messages
    // onDiscordMessage(discordClient, ["clear"], (message) => {
    //     if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    //         message.channel.messages.fetch().then((res) => {
    //             message.channel.bulkDelete(res, true);
    //         });
    //     }
    // });

    onDiscordMessage(discordClient, ["editionsTicker"], async (message) => {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR || Permissions.FLAGS.MODERATE_MEMBERS)) {
            const bot = message.guild.members.cache.find((member) => member.id === discordClient.user.id);
            const tokenPrice = await getTokenPrice();
            discordClient.user.setStatus("online");
            discordClient.user.setActivity("éditions booklet", { type: "WATCHING" });

            setInterval(() => {
                const title = `${tokenPrice} XRP`;
                bot.setNickname(title);
            }, 10000);
        }
    });
});

discordClient.login(process.env.DISCORD_TOKEN);
