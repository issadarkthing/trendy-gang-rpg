import { Command } from "@jiman24/commandment";
import { Message, PermissionString } from "discord.js";
import { Player } from "../structure/Player";
import { validateNumber } from "../utils";

export default class extends Command {
  name = "remove-xp";
  permissions: PermissionString[] = ["ADMINISTRATOR"];

  async exec(msg: Message, args: string[]) {

    if (!args[0]) {
      throw new Error("you need to run command like this `!remove-xp <xp> @user`");
    }
  
    const xp = parseInt(args[0]);

    validateNumber(xp);

    const member = msg.mentions.members?.first();

    if (!member) {
      throw new Error("you need to mention a member");
    }

    const player = Player.fromUser(member.user);
    const totalXP = player.xp - xp;

    player.level = 0;
    player.xp = 0;

    player.addXP(totalXP);

    player.save();
    msg.channel.send(`Successfully removed ${xp} xp from ${member}`);

  }
}
