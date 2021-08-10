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

            // const server = client.guilds.cache.get('840543133007609907')
            // return server.commands.fetch()
            //   .then(com => console.log(com))
            //return server.commands.delete('870457607247265797')

            testServers.forEach(testguild => {
                const server = client.guilds.cache.get(testguild)


                server.commands.set(arrayofslashCommands)
                .catch(error => {
                  console.log(error)
                })
            })
      });

}