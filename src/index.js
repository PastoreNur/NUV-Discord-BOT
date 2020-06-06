const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config/conf.json');
const roles = require('./roles.js')

const DOTA = config.DOTA;
const LOL = config.LOL;
const MHW = config.MHW;
const NUVBOT = config.NUVBOT;



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberRemove', member =>{
  const channel = member.guild.channels.cache.find(ch => ch.name === 'actividad-de-miembros');
  channel.send(`${member} ha dejado el servidor.`);
});

client.on('guildBanAdd', async (guild, user) =>{
  const channel = guild.channels.cache.find(ch => ch.name === 'registro-de-ban');
  var razon = await (await guild.fetchBan(user)).reason;
  
  channel.send(`${user} ha sido baneado del servidor. Razón: ${razon}`);
});

client.on('guildBanRemove', (guild, user)=>{
  const channel = guild.channels.cache.find(ch => ch.name === 'registro-de-ban');
  channel.send(`Ha sido revocado el ban a ${user}.`);
});

client.on('guildMemberAdd', member =>{
  const channel = member.guild.channels.cache.find(ch => ch.name === 'actividad-de-miembros');
  channel.send(`${member} ha entrado al servidor.`);
});

client.on('guildMemberUpdate', (oldmember,newmember) =>{
  const channel = newmember.guild.channels.cache.find(ch => ch.name === 'actividad-de-miembros');
  if (oldmember.nickname != newmember.nickname) {
    if (newmember.nickname == null) {
      channel.send(`${oldmember.user.username} ya no tiene apodo.`);
    }else{
      channel.send(`${oldmember.user.username} ahora es conocido como ${newmember.nickname}.`);
    }

  }
  var rol = newmember.roles.cache.difference(oldmember.roles.cache);
  if (newmember.roles.cache.get(rol.firstKey()) == undefined) {
    if (rol.first() != undefined) {
      channel.send(`${newmember} ya no tiene el rol ${rol.first()}`);
    }
  } else {
      channel.send(`${newmember} tiene ahora el rol ${rol.first()}`);  
  }  
  
});

client.on('message', msg => {
  switch (msg.content) {
    case `${config.prefix}ping`:
      msg.reply('Pong!');
      break;
    case `${config.prefix}limpiar`:
      msg.channel.bulkDelete(100);
      break;
    case `${config.prefix}roles`:    
      if (msg.channel.name == 'roles') {
        const channel = msg.channel;

        const embed = new Discord.MessageEmbed()
      .setTitle('Roles')
      .setAuthor('NUR')
      .setColor('RED')
      .setDescription('Para tener acceso a algunos canales de texto y audio debe auto asignarse roles escribiendo en este canal alguno de los siguientes comandos.')
      .addField('Dota',`${config.prefix}dota`,false)
      .addField('League of Legends',`${config.prefix}lol`,false)
      .addField('Monster Hunter: World',`${config.prefix}mhw`,false);
        channel.send(embed);
        
      }else{
        msg.channel.send(`${msg.author} Comandos para roles en el canal de roles`);
      }
      msg.delete();
      break;

      case `${config.prefix}dota`:
        roles.altrol(msg,DOTA);
      break;
      case `${config.prefix}lol`:
        roles.altrol(msg,LOL);
      break;
      case `${config.prefix}mhw`:
        roles.altrol(msg,MHW);
      break;
      case `${config.prefix}debug`:
        console.log(msg.guild.roles);
        msg.delete();         
        break;
  
    default:
      if (msg.channel.name == 'roles' && msg.member.roles.cache.get(NUVBOT) == undefined) {
        msg.delete();
      }
      break;
  }
});


client.login(config.token);
