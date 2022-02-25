import { MessageEmbed } from "discord.js";
import { code, currency } from "../utils";
import { Item } from "./Item";
import { Player } from "./Player";


export abstract class Accessories extends Item {
  abstract description: string;

  static get all() {
    return [
      new Skateboard(),
      new Sunglasses(),
      new GoldChain(),
      new GoldWatch(),
      new SmartWatch(),
      new ClotChain(),
    ];
  }

  show() {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(this.name)
      .setDescription(this.description)
      .addField("Price", code(`${this.price} ${currency}`), true)

    return embed;
  }
}

class Skateboard extends Accessories {
  id = "skateboard";
  name = "Skateboard";
  price = 5000;
  description = "increases player attack by 10%";

  apply(player: Player) {
    player.attack += Math.round(player.attack * 0.1);
  }
}

class Sunglasses extends Accessories {
  id = "sunglasses";
  name = "Sunglasses";
  price = 5500;
  description = "increases player hp by 12%";

  apply(player: Player) {
    player.hp += Math.round(player.hp * 0.12);
  }
}

class GoldWatch extends Accessories {
  id = "gold_watch";
  name = "Gold Watch";
  price = 5600;
  description: string = "increases player armor by 10%";

  apply(player: Player) {
    player.armor += player.armor * 0.1;
  }
}

class SmartWatch extends Accessories {
  id = "smart_watch";
  name = "Smart Watch";
  price = 5800;
  description: string = "increases player crit damage by 10%";

  apply(player: Player) {
    player.critDamage += player.critDamage * 0.1;
  }
}

class ClotChain extends Accessories {
  id = "clot_chain";
  name = "CLOT Chain";
  price = 5900;
  description: string = "increases player crit chance by 10%";

  apply(player: Player) {
    player.critChance += player.critChance * 0.1;
  }
}

class GoldChain extends Accessories {
  id = "gold_chain";
  name = "Gold Chain";
  price = 6100;
  description = "increases player attack by 15%";

  apply(player: Player) {
    player.attack += player.attack * 0.15;
  }
}
