const { REST, Routes } = require('discord.js');
const { config } = require('./utility/utility');
const fs = require('node:fs');
const path = require('node:path');
const commandFiles = [];
const commandsDir = path.join(__dirname, 'commands');

fs.readdirSync(commandsDir).forEach(file => {
    const filePath = path.join(commandsDir, file);
    if (fs.statSync(filePath).isDirectory()) {
        fs.readdirSync(filePath).forEach(subFile => {
            if (subFile.endsWith('.js')) {
                commandFiles.push(path.join(filePath, subFile));
            }
        });
    } else if (file.endsWith('.js')) {
        commandFiles.push(filePath);
    }
});

// Load and process each command file
const commands = [];
for (const file of commandFiles) {
    const command = require(file);
    if (command && command.data) {
        commands.push(command.data.toJSON());
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config().token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(config().clientId, config().guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();