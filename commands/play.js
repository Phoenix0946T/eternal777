const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();
// queue(message.guild.id, queue_constructor object { voice channel, text channel, connection, song[]);

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    cooldown: 0,
    description: 'music bot',
    async execute(message, args){
        const voicechannel = message.member.voice.channel

        if(!message.member.voice.channel) return message.channel.send('Bhosrike Join kar Ek Voice Channel');

        const server_queue = queue.get(message.guild.id);

        message.member.voice.channel.join();

        let song = {};
        const connection = await voicechannel.join()
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }
        
        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voicechannel.leave();
            });

            await message.reply(`Chala Rha Hu ${video.title}`)
        } else {
            message.channel.send('Nhi Mila');
        }
            
    }

}
