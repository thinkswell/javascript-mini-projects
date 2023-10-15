import discord from "discord.js";
import dotenv from "dotenv";
const {
    Client,
    GatewayIntentBits,
    REST,
    Routes
} = discord
const {
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent
} = GatewayIntentBits

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT = process.env.CLIENT_ID;

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];

const client = new Client({intents:[Guilds, GuildMembers, GuildMessages, MessageContent]});
const rest = new REST({ version: '10' }).setToken(TOKEN);

const main = async () => {
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands(CLIENT), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
        client.login(process.env.TOKEN);
    } catch (error) {
        console.error(error);
    }
}

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`)
})

client.on('messageCreate', (m) => {
    console.log(m.content);
});

client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        interaction.reply({content: "Pong!!"});
    }
})

main();

// client.login(process.env.TOKEN);