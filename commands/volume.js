const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "volume",
  description: "Verifique ou altere o volume atual",
  usage: "<volume>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["vol", "v"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "**( ❌ ) - Nada está tocando agora...**"
      );
    if (!args[0])
      return client.sendTime(
        message.channel,
        `( 🔉 ) - Volume atual aqui no servidor é:  \`${player.volume}\`.`
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "**( ❌ ) - Você deve estar em um canal de voz para usar este comando!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "**( :x: ) - Você deve estar no mesmo canal de voz que eu para usar este comando!**"
      );
    if (!parseInt(args[0]))
      return client.sendTime(
        message.channel,
        `**( ℹ️ ) -Por favor, escolha um número entre** \`1 - 100\``
      );
    let vol = parseInt(args[0]);
    if (vol < 0 || vol > 100) {
      return client.sendTime(
        message.channel,
        "**( ❌ ) - Por favor, escolha um número entre `1-100`**"
      );
    } else {
      player.setVolume(vol);
      client.sendTime(
        message.channel,
        `**( 🔉 ) - Volume setado para** \`${player.volume}\``
      );
    }
  },
  SlashCommand: {
    options: [
      {
        name: "amount",
        value: "amount",
        type: 4,
        required: false,
        description: "Insira um volume de 1-100. O padrão é 100.",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "**( ❌ ) - Você deve estar em um canal de voz para usar este comando."
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "**( :x: ) - Você deve estar no mesmo canal de voz que eu para usar este comando!**"
        );
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "**( ❌ ) - Nada está tocando agora...**"
        );
      if (!args[0].value)
        return client.sendTime(
          interaction,
          `**( 🔉 ) - Volume atual aqui no servidor é:** \`${player.volume}\`.`
        );
      let vol = parseInt(args[0].value);
      if (!vol || vol < 1 || vol > 100)
        return client.sendTime(
          interaction,
          `**( ℹ️ ) - Por favor, escolha um número entre** \`1 - 100\``
        );
      player.setVolume(vol);
      client.sendTime(interaction, `**( 🔉 ) - Volume setado para \`${player.volume}\``);
    },
  },
};
