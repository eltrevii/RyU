const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./src/data/config.json')

const commands = [
  new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play music')
  .addStringOption(option =>
    option.setName('args')
    .setDescription('Berikan args untuk memulai lagu')
    .setRequired(true)
  ),

  new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stop music'),

  new SlashCommandBuilder()
  .setName('skip')
  .setDescription('Skip music'),

  new SlashCommandBuilder()
  .setName('queue')
  .setDescription('Queue music'),

  new SlashCommandBuilder()
  .setName('pause')
  .setDescription('Pause music'),

  new SlashCommandBuilder()
  .setName('resume')
  .setDescription('Resume music'),

  new SlashCommandBuilder()
  .setName('repeat')
  .setDescription('Repeat music'),
  
  new SlashCommandBuilder()
  .setName('nowplaying')
  .setDescription('What\'s music playing now?'),

  new SlashCommandBuilder()
  .setName('volume')
  .setDescription('Volume adjustment')
  .addNumberOption(option =>
    option.setName('number')
    .setDescription('Berikan angka untuk mengubah volume')
    .setRequired(true)
  ),

  new SlashCommandBuilder()
  .setName('lock')
  .setDescription('Lock voice channel'),

  new SlashCommandBuilder()
  .setName('unlock')
  .setDescription('Unlock voice channel'),

  new SlashCommandBuilder()
  .setName('bitrate')
  .setDescription('Bitrate voice channel')
  .addNumberOption(option =>
    option.setName('number')
    .setDescription('Berikan angka untuk merubah bitrate')
    .setRequired(true)
  ),

  new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Client ping'),
  
  new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('User info'),

  new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Server info'),
  
  new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Get Avatar')
  .addUserOption(option =>
    option.setName('user')
    .setDescription('Mention user')
  ),

  new SlashCommandBuilder()
  .setName('time')
  .setDescription('Server time'),

  new SlashCommandBuilder()
  .setName('osu')
  .setDescription('Osu profile')
  .addStringOption(option =>
    option.setName('username')
    .setDescription('Username osu')
    .setRequired(true)
  )
  .addStringOption(option2 =>
    option2.setName('mode')
    .setDescription('1 (osu) 2 (taiko) 3 (osumania)')
    .setRequired(true)
  ),

  new SlashCommandBuilder()
  .setName('activities')
  .setDescription('Start activities')
  .addStringOption(option => 
    option.setName('value')
    .setDescription('Activities value')
    .setRequired(true)
    .addChoice('Youtube Together', '755600276941176913')
    .addChoice('Fishington', '814288819477020702')
    .addChoice('Chess In The Park', '832012774040141894')
    .addChoice('Betrayal', '773336526917861400')
    .addChoice('Poker In The Night', '755827207812677713')
    .addChoice('Word Snacks', '879863976006127627')
    .addChoice('Letter Tile', '879863686565621790')
  ),

  new SlashCommandBuilder()
  .setName('stats')
  .setDescription('Client stats'),

  new SlashCommandBuilder()
  .setName('uptime')
  .setDescription('Client uptime'),

  new SlashCommandBuilder()
  .setName('weather')
  .setDescription('Info cuaca')
  .addStringOption(option =>
    option.setName('kota')
    .setDescription('berikan nama kota')
    .setRequired(true)
  ),

  new SlashCommandBuilder()
  .setName('link')
  .setDescription('Server link'),

  new SlashCommandBuilder()
  .setName('youtubetogether')
  .setDescription('YT Together'),

  new SlashCommandBuilder()
  .setName('fishington')
  .setDescription('Fishington.Io'),

  new SlashCommandBuilder()
  .setName('chess')
  .setDescription('Chess in the park'),

  new SlashCommandBuilder()
  .setName('betrayal')
  .setDescription('Betrayal.Io'),

  new SlashCommandBuilder()
  .setName('pokernight')
  .setDescription('Pokernight'),

  new SlashCommandBuilder()
  .setName('corona')
  .setDescription('Corona tracker')
  .addStringOption(option =>
    option.setName('negara')
    .setDescription('Berikan nama negara')
    .setRequired(true)
  ),

  new SlashCommandBuilder()
  .setName('totalcorona')
  .setDescription('Total corona'),

]

.map(command => command.toJSON());

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Refreshing...');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Deployed!');
	} catch (error) {
		console.error(error);
	}
})();