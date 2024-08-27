
# Cox Bot

An entire discord bot framework with all things you need for a big comunity.


# Starting it

### 1. Install the discord package.
```bash
  npm install discord.js
```

### 2. For refreshing all the commands.
```bash
  node .\deploy-commands.js
```

### 3. For starting the bot use this command.
```bash
  node .\index.js
```

# Some informations about ```config.json```.

```bash
{
  "token": "Bot token",
  "clientId": "You're discord bot client ID",
  "guildId": "You're server ID",
  "tickets": {
    "allowedRoles": [ 
      "Role ID",
      "Role ID"
    ],
    "categoryId": "The ID of the category where the new tickets to create",
    "channelId": "The ID of the channel where the button for creating the tickets to be.",
    "messageId": "The ID of the message was sended on the channelId for reediting when the command /tickets was executed"
  }
}
```

# Documentation

## In the path down below you'll be see some custom functions that will make you're life easier with this bot if you want to develop it more.

### ```utility/main.js```

# config
Info: Stores the entire ```config.json``` file in one variable for using them anywhere much faster.

```bash
config() {
    let config;

    try {
        config = require('../../config.json');
    } catch (error) {
        console.error('Failed to load config.json:', error);
        process.exit(1);
    }

    return config;
},

```

# dinamicReplyMessage
Info: Return an embed message.

interaction: The interaction.\
text: The custom text that you want to see it as a message.


```bash

dinamicReplyMessage(interaction, text) {
    const textMessage = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Cox Family Support')
        .setDescription(text)

    return interaction.reply({ embeds: [textMessage] });
},

```

![App Screenshot](https://cdn.discordapp.com/attachments/965523140920868924/1091957229898440724/dinamicReplyMessage.png)

### How to use examples (Depends the case):
```bash
dinamicReplyMessage(interaction, `Ticketele sunt acum ${status}!`);
```

Or

```bash
return dinamicReplyMessage(interaction, 'Nu ai permisiunea de a folosi aceasta comanda.')

```

### Recommended

Change the ```setTitle('')``` with the name of you're bot!

# dinamicEmbedMessage
Info: Return an embed message.

color: The color of the message.\
title: The title of the message.\
url: You're discord server link.\
description:The description of the message.\
image: An URL with a message or even a GIF.

```bash

dinamicEmbedMessage(color, title, url, description, image) {
    const dinamicEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setURL(url)
        .setDescription(description)
        .setImage(image);

    return dinamicEmbed;
},

```

![App Screenshot](https://cdn.discordapp.com/attachments/965523140920868924/1091958336917868604/dinamicEmbedMessage.png)

### How to use examples:

Store the dinamicEmbedMessage in a variable then return it into a reply message.
```bash
const embedEditedMessage = dinamicEmbedMessage(0x0099FF, 'Cox Family Support - Tickets', 'https://discord.gg/cox', 'Apasa pe butonul de mai jos pentru a creea un ticket!', 'https://cdn.discordapp.com/attachments/656420226556100609/918151996580720660/standard_copy.gif');
return interaction.reply({ embeds: [embedEditedMessage] });
```

# dinamicButtonComponent
Info: Returns a button component.

customId: A custom id.\
label: The button message.\
style: Primary, Danger etc.\
emoji: Any emoji you want.\
activity: Make the button Disabled or Enable.

```bash

dinamicButtonComponent(customId, label, style, emoji, activity) {

    const styleEnum = style === 'danger' ? ButtonStyle.Danger : ButtonStyle.Primary;
    const buttonComponent = new ActionRowBuilder();

    buttonComponent.addComponents(
        new ButtonBuilder()
            .setCustomId(customId)
            .setLabel(label)
            .setStyle(styleEnum)
            .setEmoji(emoji)
            .setDisabled(activity));

    return buttonComponent;
},

```
Enabled

![App Screenshot](https://cdn.discordapp.com/attachments/965523140920868924/1091963743677710346/dinamicButtonComponent_1.png)

Disabled

![App Screenshot](https://cdn.discordapp.com/attachments/965523140920868924/1091963743874850866/dinamicButtonComponent_2.png)

### How to use examples (Depends the case):

Returns the button component.
```bash
const buttonComponent = dinamicButtonComponent('create-ticket', 'Tickete oprite.', 'danger', '📝', true)
return interaction.reply({ components: [buttonComponent] });

```

### Or

Return the button component and with an embed message at the same time.
```bash
const buttonComponent = dinamicButtonComponent('create-ticket', 'Tickete oprite.', 'danger', '📝', true)
const embedEditedMessage = dinamicEmbedMessage(0x0099FF, 'Cox Family Support - Tickets', 'https://discord.gg/cox', 'Apasa pe butonul de mai jos pentru a creea un ticket!', 'https://cdn.discordapp.com/attachments/656420226556100609/918151996580720660/standard_copy.gif');

return interaction.reply({ embeds: [embedEditedMessage], components: [buttonComponent] });
```
