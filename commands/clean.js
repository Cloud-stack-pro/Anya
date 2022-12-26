const { SlashCommandBuilder } = require('discord.js');
const sql = require('slimedb');
const guilds = new sql('guilds');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('clean')
    .setDescription('Remove all message in channel.'),
  async run(interaction) {
    const reply = await interaction.deferReply({
      fetchReply: true
    });
    const existsGuild = sql.query(guilds).find(i => i.guild == interaction.guild.id);
    const messages = await interaction.channel.messages.fetch();
    let cm;
    if ( existsGuild ) {
      cm = messages.filter( i => i. id != existsGuild.message && i.id != interaction.id );
      await interaction.channel.bulkDelete(cm);
    } else {
      cm = messages.filter( i => i.id != interaction.id );
      await interaction.channel.bulkDelete(cm);
    }
    await interaction.editReply('Cleaned successful!').then( e => setTimeout(()=>{e.delete()}, 3000) )
  }
};
