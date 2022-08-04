import { dirname, importx, isESM } from '@discordx/importer';
import Discord, { CommandInteraction } from 'discord.js';
import { Client, ClientOptions } from 'discordx';
import { LogPrefix } from './enums/prefix';
import { BetterClientsOptions } from './models/Options';
import { BetterClient } from './modules/Client';
import { log } from './modules/Log';


export default class FrameworkClient {

    // private _commands: Discord.Collection<string, CommandInteraction> = new Discord.Collection();

    constructor(
        private readonly _options: BetterClientsOptions
    ) { }

    /**
     * @description Initializes the client and starts the client, use this after you imported all files!
     * @returns The Client
     */
    public async start(): Promise<BetterClient> {
        log(LogPrefix.Client, 'Client is initializing...');

        return await new BetterClient(
            this._options.client,
            this._options.intents,
            this._options.ignoreBots
        )
    }

    /**
     * @description Imports all files from the path
     * @param path The path of the folder you want to import
     * @example path: '.\modules\**\{events, commands, api }\*.{ts,js}'
     */
    public async import(path: string) {
        try {
            importx(path).then(() => {
                log(LogPrefix.Framework, `successfully imported ${path}`);
            }).catch((reason: any) => {
                log(LogPrefix.Framework, `failed to import ${path}`);
                throw new TypeError(reason);
            })
        }
        catch
        {
            throw new TypeError(`failed to import ${path}`);
        }
    }

    public async registerSlashCommands(client: BetterClient) {
        if (typeof this._options.client.devMode === 'undefined' || this._options.client.devMode.toggle === false) {
            log(LogPrefix.Handler, 'devMode is not defined or disabled, Bot will start in Public Mode');

            await client.initGlobalApplicationCommands({
                log: true
            })
            return;
        }
        else {
            if (typeof this._options.client.devMode.guildId === 'undefined') {
                log(LogPrefix.Handler, 'GuildID is not defined, Bot will start in Public Mode');

                await client.initGlobalApplicationCommands({
                    log: true
                })
                return;
            }

            log(LogPrefix.Handler, 'devMode is enabled, Bot will start in Developer Mode');
            await client.initApplicationCommands({
                guild: { log: true, disable: { delete: true, add: false, update: false } }
            })
            return;
        }
    }
}