const { SlashCommandBuilder } = require('discord.js');
const { dinamicReplyMessage } = require('../../utility/utility');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        await dinamicReplyMessage(interaction, "Pong!")
	},
};