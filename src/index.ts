import { dirname, importx, isESM } from '@discordx/importer';
import Discord, { CommandInteraction } from 'discord.js';
import { Client, ClientOptions } from 'discordx';
import { PrefixNames } from './enums/prefix';
import { BetterOptions } from './models/BetterOptions';
import { log } from './modules/Log';


export default class Framework {

    private _commands: Discord.Collection<string, CommandInteraction> = new Discord.Collection();
    private _folder: string = isESM ? dirname('./') : __dirname;

    constructor(
        private readonly _options: BetterOptions
    ) { }

    public async init(): Promise<Client> {
        log(PrefixNames.Client, 'Client is initializing...');

        return new Client(this._options.ClientOptions)
    }

    /**
     * @description Imports all files from the path
     * @param path The path of the folder you want to import
     * @example path: '\modules\**\{events, commands, api }\*.{ts,js}'
     */
    public async import(path: string) {
        try {
            importx(`${this._folder}/${path}`).then(() => {
                log(PrefixNames.Framework, `successfully added ${path}`);
            }).catch((reason: any) => {
                log(PrefixNames.Framework, `failed to add ${path}`);
                throw new TypeError(reason);
            })
        }
        catch
        {
            throw new TypeError(`failed to add ${path}`);
        }
    }

    public async registerSlashCommands(client: Client) {
        if (typeof this._options.devMode === 'undefined' || this._options.devMode.toggle === false) {
            log(PrefixNames.Handler, 'devMode is not defined or disabled, Bot will start in Public Mode');

            client.initGlobalApplicationCommands({
                log: true
            })
            return;
        }
        else {
            if (typeof this._options.devMode.guildId === 'undefined') {
                log(PrefixNames.Handler, 'GuildID is not defined, Bot will start in Public Mode');

                client.initGlobalApplicationCommands({
                    log: true
                })
                return;
            }
        }
    }
}