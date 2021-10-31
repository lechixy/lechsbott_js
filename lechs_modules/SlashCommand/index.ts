import { ChatInputApplicationCommandData, Client, CommandInteraction, GuildMember, PermissionResolvable } from "discord.js";
export interface ExecuteOptions {
    client: Client;
    interaction: CommandInteraction & {
        member: GuildMember;
    };
    args: Array<string>;
    Discord: any;
}
export declare type ExecuteFunction = (options: ExecuteOptions) => any;
export declare type CommandOptions = {
    userPermissions?: PermissionResolvable[];
    execute: ExecuteFunction;
    name: string;
} & ChatInputApplicationCommandData;
export declare class SlashCommand {
    constructor(commandOptions: CommandOptions);
}
