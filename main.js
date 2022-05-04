const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '*';

const fs = new require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
} 


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'join'){
        if(!message.member.voice.channel) return message.channel.send("Bhadwe Phele Voice Channel Join Kar")
        else(message.member.voice.channel.join())
        if(message.member.voice.channel.join()) return message.channel.send("Karliya Join Ab Kya Karu")
    }
    if(command === 'play'){
        client.commands.get('play').execute(message, args)
    }
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args)
    }
    if(command === 'play2'){
        client.commands.get('play2').execute(message, args)
    }
})

client.login('OTcxMDM4Nzk2NTE2ODMxMjUy.YnEsWg.ySeY0jp9hLh59ckQuTBlr1SOvaM');