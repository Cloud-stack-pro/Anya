const { REST, Routes } = require('discord.js');
const fs = require('fs');
const slashCommands = fs.readdirSync('../commands').filter( i => i.endsWith(".js") ).map( (name, index, arr) => arr[index] = require(`../commands/${name}`) );
async function registerSlashCommands( TOKEN, CLIENT ) {
  const commands = slashCommands.map( value => value.data.toJSON() );
  await new REST({ version:'10' }).setToken( TOKEN ).put( Routes.applicationCommands( CLIENT ), { body:commands } );
};
registerSlashCommands( process.env['TOKEN'], process.env['CLIENT'] );