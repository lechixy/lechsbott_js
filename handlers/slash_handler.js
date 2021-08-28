const fs = require('fs');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client, Discord) => {

    const slashCommands = await globPromise(
        `${process.cwd()}/slashCommands/*/*.js`
      );
      const arrayofslashCommands = [];
    
      slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
    
        client.slashCommands.set(file.name, file);

        if(['MESSAGE', 'USER'].includes(file.type)) delete file.description;

        arrayofslashCommands.push(file);
      });
      client.on("ready", async () => {

            const testServers = [
              "840543133007609907",
              "796446524175286272",
              "784450086088343592",
              "744472715221794876",
            ]

            // testServers.forEach(guild => {
            //   guild
            // })

            // const server = client.guilds.cache.get('796446524175286272')
            // return server.commands.fetch()
            //   .then(com => console.log(com))
            // return server.commands.delete('873647633598652477')

            testServers.forEach(testguild => {
                const server = client.guilds.cache.get(testguild)


                server.commands.set(arrayofslashCommands)
                .catch(error => {
                  console.log(error)
                })
            })
      });

}
