import { Command } from "@jiman24/commandment";
import { Message, PermissionString } from "discord.js";
import { Player } from "../structure/Player";
import { bold, validateNumber } from "../utils";

export default class extends Command {
  name = "give-xp";
  permissions: PermissionString[] = ["ADMINISTRATOR"];

  async exec(msg: Message, args: string[]) {

    if (!args[0]) {
      throw new Error("you need to run command like this `!give-xp <xp> @user`");
    }
  
    const xp = parseInt(args[0]);

    validateNumber(xp);

    const member = msg.mentions.members?.first();

    if (!member) {
      throw new Error("you need to mention a member");
    }

    const player = Player.fromUser(member.user);
    const currLevel = player.level;

    player.addXP(xp);

    if (player.level !== currLevel) {
      msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
    }

    player.save();
    msg.channel.send(`Successfully gave ${xp} xp to ${member}`);

  }
}
