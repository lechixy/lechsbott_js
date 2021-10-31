import { Client, Message, GuildMember, PermissionResolvable } from "discord.js";

export interface ExecuteOptions {
    client: Client;
    message: Message & {
        member: GuildMember;
    };
    args: Array<string>;
    cmd: String;
    Discord: any;
}
export declare type ExecuteFunction = (options: ExecuteOptions) => any;
export declare type CommandOptions = {
    description?: string;
    name: string;
    arguments?: string;
    category?: Array<string>;
    userPermissions?: PermissionResolvable[];
    clientPermissions?: PermissionResolvable[];
    ownerOnly?: boolean;
    cooldown?: number;
    execute: ExecuteFunction;
    aliases?: Array<string>;
}
export declare class Command {
    constructor(commandOptions: CommandOptions);
}