const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'football',
    aliases: ['fb'],
    description: 'Play football in Discord!',
    category: ['Fun'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {

        const positions = {
            left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
            middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
            right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
        };
        let randomized = Math.floor(Math.random() * Object.keys(positions).length);
        let gameEnded = false;
        let randomPos = positions[Object.keys(positions)[randomized]];

        const componentsArray = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'left',
                        label: 'Left',
                        emoji: "⬅️",
                    },
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'middle',
                        label: 'Middle',
                        emoji: "⬆️",
                    },
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'right',
                        label: 'Right',
                        emoji: "➡️",
                    },
                ],
            },
        ];

        const msg = await message.channel.send({
            content: randomPos,
            components: componentsArray,
        });
        function update() {
            randomized = Math.floor(Math.random() * Object.keys(positions).length);
            randomPos = positions[Object.keys(positions)[randomized]];

            msg.edit({
                content: randomPos,
                components: componentsArray,
            });
        }
        const loop = setInterval(() => {
            if (gameEnded == false) return update();
        }, 1000);

        const filter = button => {
            return button.user.id === message.author.id;
        };
        const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

        const lastcomponentsArray = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'left',
                        label: 'Left',
                        emoji: "⬅️",
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'middle',
                        label: 'Middle',
                        emoji: "⬆️",
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'right',
                        label: 'Right',
                        emoji: "➡️",
                        disabled: true,
                    },
                ],
            },
        ];

        if (button.customId !== Object.keys(positions)[randomized]) {
            gameEnded = true;
            msg.edit({
                content: randomPos,
                components: lastcomponentsArray,
            });
            clearInterval(loop)
            return button.reply({ content: '⚽ **GOOALLLL, YOU WON THE MATCH!!!**' });
        }
        else {
            gameEnded = true;
            msg.edit({
                content: randomPos,
                components: lastcomponentsArray,
            });
            clearInterval(loop)
            return button.reply({ content: '**Wow you lose, goalkeeper caught the ball...**' });
        }
    }
}