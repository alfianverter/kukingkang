const Discord = require("discord.js");
const music = new Discord.Client({disableEveryone: true});
music.commands = new Discord.Collection();
const {color, token} = require('./config.json');
const queue = new Map();

music.on('message', async message => {

    let prefix = ';';
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();
    let sender = message.author;
    
    if (!msg.startsWith(prefix)) return;
    if (sender.bot) return;
    
    try {
        let commandFile = require(`./commands/${cmd}.js`); 
        commandFile.run(music, message, args, color, queue); 
    } catch(e) { 
        console.log(e.message); 
    } finally { 
        console.log(`${message.author.username} ran the command: ${cmd} on ${message.guild.name} !`);
    }
});

music.login(process.env.BOT_TOKEN);

music.on('ready', async () => {
    console.log(`${music.user.username} is online!`);
});
