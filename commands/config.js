const Discord = require('discord.js');
const { getConfig, setValue } = require("../util/configuration");

async function run(msg) {
	const args = msg.content.toLowerCase().split(' ')

	const defaultEmbed = new Discord.MessageEmbed()
		.setTitle('Anti-NSFW Configuration')
		.setColor('#b8232d')
		.addField('Probabality',  `\`${getConfig(msg.guild.id).probability * 100}%\` \n [Info](https://waves.codes/, 'The minimum probability to deam an image as nsfw.')`, true)
		.addField('Prefix', `\`${getConfig(msg.guild.id).prefix}\` \n [Info](https://waves.codes/, 'The prefix to run a command.')`, true)
		.setFooter('To set a value run -config set "name" "value"');

	if (args.length <= 1)
		return msg.channel.send(defaultEmbed);

	const command = args[1]

	switch (command) {
		case "set":
			let set = args[2]
			if (!set)
				return msg.channel.send(defaultEmbed);

			switch (set) {
			case 'prefix':
				try {
					if (args[3])
					{
						setValue(msg.guild.id, 'prefix', msg.content.split(' ')[3]);
						msg.channel.send("Prefix was set to " + args[3]);
					}
					else
					{
						msg.channel.send('Please put a prefix.');
						emb = new Discord.MessageEmbed()
							.setTitle('Anti-NSFW Configuration')
							.setColor('#b8232d')
							.addField('Probabality',  `\`${getConfig(msg.guild.id).probability * 100}%\` \n [Info](https://waves.codes/, 'The minimum probability to deam an image as nsfw.')`, true)
							.addField('Prefix', `\`${getConfig(msg.guild.id).prefix}\` \n [Info](https://waves.codes/, 'The prefix to run a command.')`, true)
							.setFooter(`To set a value run ${getConfig(msg.guild.id).prefix}config set "name" "value"`);

						msg.channel.send(emb)
					}
				} catch(e) {
					console.log(e)
					msg.channel.send('internal error')
					msg.channel.send(defaultEmbed)
				}
				break;
			case 'probability':
				try {
					if (!(args[3] <= 100 && args[3] >= 0))
						return msg.channel.send("Probability must be between 0 and 100!");
						
					setValue(msg.guild.id, 'probability', args[3]/100)
					msg.channel.send(`This server\'s probability is now ${args[3]}%`);
				} catch(e) {
					console.log(e)
					msg.channel.send('internal error')
					msg.channel.send(defaultEmbed)
				}
				break;
			default:
				msg.channel.send(set + ' is not a recognized option. (probability, prefix)')
				msg.channel.send(defaultEmbed)
				break;
			}
			
			break;
		default:
			msg.channel.send(command + ' is not a recognized option. (set)')
			msg.channel.send(defaultEmbed)
			break;
	}
}

const info = {
    "name": "config",
    "run": "config",
    "usage": "config [option] [name] [value]",
	"description": "Manages configurations of the bot for the server.",
	"permissions": ["MANAGE_GUILD"]
}

module.exports = {
    run,
    info
}