import { Snowflake } from "discord.js"
import { ClientOptions, ILogger } from 'discordx';

export interface BetterOptions {
    readonly ClientOptions: ClientOptions
    readonly token: string
    readonly devMode?: DeveloperMode
    readonly handlerOptions?: HandlerOptions
}

export interface DeveloperMode {
    toggle: boolean,
    guildId: Snowflake
}

export interface HandlerOptions {
    ignoreBots?: boolean
    disable?: boolean
    // permissions?: Permission
    logger?: ILogger
}