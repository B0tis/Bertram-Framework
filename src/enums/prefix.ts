export enum LogPrefix {
    Framework = 'framework',
    Client = 'client',
    Handler = 'handler',
    Error = 'error'
}

export enum PrefixColors {
    framework = '\u001b[36m',
    client = '\u001b[32m',
    handler = '\u001b[33m',
    error = '\u001b[31m'
}

export interface Prefix {
    name: LogPrefix,
    color: PrefixColors
}