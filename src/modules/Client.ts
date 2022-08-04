import { BitFieldResolvable, GatewayIntentsString } from "discord.js";
import { Client } from "discordx";
import { LogPrefix } from "../enums/prefix";
import { PrimaryClient } from "../models/Options";
import { log } from './Log';

export class BetterClient extends Client {

    /**
     * 
     * @param client The client to initialize
     * @param intents The Intents the clients needs to have
     * @param ignoreBots If the client should ignore bots
     */
    constructor(
        public client: PrimaryClient,
        public intents: BitFieldResolvable<GatewayIntentsString, number>,
        public ignoreBots?: Boolean,
    ) {
        super({
            intents,
            botId: client.id,
            botGuilds: (typeof client.devMode == 'undefined') ? undefined : [client.devMode.guildId],
            shards: 'auto'
        })
        this._setup()
    }

    private _setup(): void {
        this._createListeners()

        this.login(this.client.token, false).then(() => {
            log(LogPrefix.Client, `Client ${this.user?.tag} is ready!`)
        })
    }

    private _createListeners(): void {
        for (let event of Array.from(this.events.values())) {
            this.on(event.event, this.instance.trigger(this.guards, event.event, this))
        }
    }
}