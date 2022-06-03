require("dotenv").config();

const onDiscordMessage = (client, aliases, callback) => {
    aliases = typeof aliases === "string" ? [aliases] : aliases;

    client.on("message", (message) => {
        const { content } = message;
        const [userCommand] = content.split(" ");
        let isValidCommand = false;

        aliases.forEach((alias) => {
            if (userCommand === `${process.env.PREFIX}${alias}`) {
                isValidCommand = true;
            }
        });

        if (isValidCommand) {
            callback(message);
        }
    });
};

module.exports = onDiscordMessage;
