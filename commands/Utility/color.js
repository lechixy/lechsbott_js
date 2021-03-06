const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name: 'color',
	description:'Get a random color and their values!',
    category: ['Utility'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {

        const clr = randColor()
        
        let url = `https://singlecolorimage.com/get/${clr.hex.slice(1, clr.hex.length)}/400x400`

        const embed = new Discord.MessageEmbed()
        .setColor(clr.hex)
        .setThumbnail(url)
        .addField(`RGB`, `\`${clr.rgb}\``, true)
        .addField(`Int`, `\`${clr.intValue}\``, true)
        .addField(`Hex`, `\`${clr.hex}\``, true)
        .addField(`HSL`, `\`${clr.hsl}\``, true)
        message.channel.send({ content: `**${message.author.username}**, here is your random color!`, embeds: [embed] });

    }
}

function randColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let hex = toHex(r) + toHex(g) + toHex(b);

    let intValue = parseInt(hex.toLowerCase(), 16);

    let { hsl, h, s, l } = rgbToHsl(r, g, b);

    return { r, g, b, hex: '#' + hex, intValue, rgb: r + ',' + g + ',' + b, h, s, l, hsl };
}

function toHex(num){
	let hex = num.toString(16).toUpperCase();
	if(hex.length<2){
		hex = "0"+hex;
	}
	return hex;
}

function rgbToHsl(r, g, b){
	r /= 255, g /= 255, b /= 255;
	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if(max == min){
		h = s = 0; // achromatic
	}else{
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	let hsl = Math.round(h*100)+"%, "+Math.round(s*100)+"%, "+Math.round(l*100)+"%";
	return {h, s, l, hsl};
}