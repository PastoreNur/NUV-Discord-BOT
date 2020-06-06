function altrol(msg,rol) {
    if (msg.channel.name == 'roles') {
        if (msg.member.roles.cache.get(rol) == undefined) {
          msg.member.roles.add([msg.guild.roles.resolve(rol)]);
        }else{
          msg.member.roles.remove([msg.guild.roles.resolve(rol)]);
        }
        }else{
          msg.channel.send(`${msg.author} Comandos para roles en el canal de roles.`);
        }
        msg.delete();      
}

module.exports= {
    altrol
}