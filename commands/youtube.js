const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "Inicia uma sessão do YouTube Together",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let embederro = MessageEmbed()
.setDescription(`**<:no:974449268620414996>・Você deve estar em um canal de voz!**`)
.setColor("2F3136")
if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,embederro
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
let embedpermer = MessageEmbed()
.setDescription(`**<:no:974449268620414996>・Eu preciso da permissão \`Criar Convites\` para executar esse comando!**`)
.setColor("2F3136")
      return client.sendTime(
        message.channel,embedpermer
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "YouTube Juntos",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#2F3136").setDescription(`
Usando **YouTube Juntos** você pode assistir ao YouTube com seus amigos em um canal de voz. Clique em *Participar do YouTube Juntos* para participar!

__**[Junte-se ao YouTube Juntos](https://discord.com/invite/${Invite.code})**__

**( ℹ️ ) - Observação:** Isso só funciona na área de trabalho
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
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
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "**( ❌ ) - O bot não tem permissão para criar convite**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
           .setAuthor(
        "YouTube Juntos",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#2F3136").setDescription(`
Usando **YouTube Juntos** você pode assistir ao YouTube com seus amigos em um canal de voz. Clique em *Participar do YouTube Juntos* para participar!

__**[Junte-se ao YouTube Juntos](https://discord.com/invite/${Invite.code})**__

**( ℹ️ ) - Observação:** Isso só funciona na área de trabalho
`);
      interaction.send(embed.toJSON());
    },
  },
};
