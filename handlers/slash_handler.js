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
        console.clear();
        console.log(`SCMD | ${file.name} loaded!`)
        arrayofslashCommands.push(file);
      });
      client.on("ready", async () => {

            const testServers = [
              "840543133007609907",
              "796446524175286272",
              "784450086088343592",
              "744472715221794876",
            ]

            testServers.forEach(testguild => {
                const server = client.guilds.cache.get(testguild)

                server.commands.set(arrayofslashCommands)
                .catch(error => {
                  console.warn(`Lechsbott can\'t use slash commands because there are servers don\'t have: Use Slash Commands\n${server.name}`)
                })
            })





        // client.guilds.cache.forEach(async (g) => {
        //   await client.guilds.cache.get(g.id).commands.set(arrayofslashCommands);
        // });
      });

}