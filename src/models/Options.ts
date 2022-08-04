import { BitFieldResolvable, GatewayIntentsString, PresenceData, Snowflake } from "discord.js"
import { ILogger } from 'discordx';

export interface BetterClientsOptions {
    readonly client: PrimaryClient;
    readonly intents: BitFieldResolvable<GatewayIntentsString, number>
    readonly ignoreBots?: Boolean
    readonly logger?: ILogger
}

export interface PrimaryClient {
    token: string,
    id: string,
    devMode?: DeveloperMode
}

export interface DeveloperMode {
    toggle: boolean,
    guildId: Snowflake,
    presence?: PresenceData;
}
