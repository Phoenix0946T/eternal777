const { MessageAttachment } = require("discord.js")

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    cooldown: 0,
    description: 'music bot',
    execute(message, args){
        message.channel.send('pinging');
    }
};