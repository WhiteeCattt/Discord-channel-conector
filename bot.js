const config = require("./config.json");
const { Client, GatewayIntentBits } = require("discord.js")
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
client.login(config.token)
client.on("ready", () => {
    console.log("The bot has begun its work!");
})

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    for (const server of config.servers.filter(s => s.server_id !== message.guild.id)) {
        client.guilds.cache.get(server.server_id).channels.cache.get(server.channel_id).send(`**${message.author.globalName}** » ${message.content
        .replace(/@everyone/g, "everyone")
        .replace(/@here/g, "here")}`)
    }
})
