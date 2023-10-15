# Discord Bot
[![N|Solid](https://pbs.twimg.com/card_img/1706660851640635392/ekbkjgsu?format=jpg&name=4096x4096)](https://nodesource.com/products/nsolid)

# Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
    - [Commands](#commands)
3. [Technology Used](#technology-used)
4. [Installation](#installation)
    - [Install Python](#install-nodejs)
    - [Install Dependencies](#install-dependencies)
    - [Create Files](#create-files)
    - [Set Up Environment Variables](#set-up-environment-variables)
    - [Load Environment Variables](#load-environment-variables)
    - [Bot Initialization](#bot-initialization)


## Introduction
Welcome to our Discord bot project! This bot is designed as a versatile tool with plans for future feature enhancements as we continue to develop it.


## Features 
### COMMANDS
- `.help` :Use this command to access information about the bot's available commands and how to use them. You can request a list of all commands or details about a specific command. Here's a sample output:
```sh
## coming soon...
LevelSystem:
    level      
    levelreset 
Me:
    me         
    mem        
Music:
    join       
    leave      
    play
Moderation:
    ban
    unban
    kick
    clear
## working commands...     
    ping       
```

- `/level`: Check your or other users' levels within our leveling system. We've implemented an XP and level tracking system to enhance your Discord experience.
  
-  `/levelreset`: Reset a user's level and XP back to a certain starting point or zero with this command.

- `/me`: View your own profile information or personal statistics within our server or community. This command provides details about your username, avatar, roles, join date, and more.

- `/mem @user`: Retrieve personal statistics about another member within our server or community.

- `/play`:  Make the bot join a voice channel and enjoy audio playback, including music and sound effects.

- `/join`: Summon the bot into a voice channel to participate in voice-related activities such as music playback or voice commands.

- `/leave`: Dismiss the bot from a voice channel when it's no longer needed.

- `/ping`: Measure the bot's latency or response time with this simple command. It provides you with the time it takes for a message to be sent and received.

- `/ban @user`: Use this command to ban a user from your server. Replace `@user` with the mention of the user you want to ban, and you can optionally provide a reason for the ban. The reason helps in documenting the ban's purpose.

- `/unban @user`: Unban a previously banned user from your server. This command is useful for reversing a ban when necessary. You only need to specify the user's mention to unban them.

- `/clear`: Clear a specified number of messages in a channel. This command helps in keeping your server's chat clean and free from clutter. Only users with appropriate permissions can use this command.

- `/kick @user`: Kick a user from your server. Similar to the ban command, you can replace `@user` with the mention of the user you want to kick and provide an optional reason for the action.


## Technology used

- [Nodejs] : The Javascript runtime used for bot development.
- [discord.js] : The node library that enables interaction with the Discord API.
- [dotenv] : for managing environment variables.

## Installation
To get started with our Discord bot, follow these steps:
### **Install Nodejs** 
 Ensure you have Node installed on your system. You can download it from here [Nodejs's official website](https://www.nodejs.org/).

## **Initialise Node project**
```sh
npm init
## for default configurations
npm init -y
```

### **Install Dependencies**
  - Install the required Python packages using the following command:
```sh
npm install discord.js@latest dotenv
yarn add discord.js@latest dotenv
pnpm install discord.js@latest dotenv
bun install discord.js@latest dotenv
```

```sh
touch index.js .env
```

### **Set Up Environment Variables**
Open the .env file and define your environment variables. The most crucial variable is your Discord bot token:

```env
TOKEN=your_bot_token_here
```
Replace `your_bot_token_here` with your actual Discord bot token.

### **Load Environment Variables**
Load the environment variables in your code using a library like `dotenv`. Make sure to install it:
    
```sh
npm install dotenv
yarn add dotenv
pnpm add dotenv
bun add dotenv
```
Then, use the following code at the start of your main.py or equivalent:
```js
// ensure that type: "module" is mentioned in package.json file
import dotenv from "dotenv";

# Load environment variables from .env file
dotenv.config();

# Access environment variables
DISCORD_TOKEN = process.env.TOKEN;
```
###  **Bot Initialization**

In your bot's code, use the DISCORD_TOKEN variable to authenticate your bot with Discord. Here's an example snippet:
     
 ```js
import dotenv from "dotenv";
import discord from "discord.js";
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

// Create a Discord client
const client = new Client({intents: [Guilds,GuildMembers,GuildMessages,MessageContent]});

// Bot functionality and event handlers go here

// Run the bot
client.login(TOKEN);
```

Remember to keep your .env file secure and never share your bot token publicly.

With these installation steps completed, your Discord bot will be up and running, ready to serve your community. Feel free to customize and expand the bot's features to enhance your Discord server's experience.