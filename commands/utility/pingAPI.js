const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings API and returns the time"),
  async execute(interaction) {
    const botKey = process.env.API_KEY;
    if (!botKey) {
      console.log("No bot key found");
      return;
    }
    const response = await fetch(
      `https://knuckleroller.com/api/ping?apiKey=${botKey}`
    );
    if (!response.ok) {
      await interaction.reply("Wasn't able to connect to the API.");
      return;
    }
    const data = await response.json();
    const time = data.message;
    if (!time) {
      await interaction.reply("Wasn't able to get the time.");
      return;
    }
    await interaction.reply(`The time is ${time}`);
    return;
  },
};
