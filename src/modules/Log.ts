import { Prefix, PrefixColors, LogPrefix } from "../enums/prefix"

export const log = (prefixName: LogPrefix, content: string): void => {
    const prefix: Prefix = { name: prefixName, color: PrefixColors[prefixName] }

    console.log(`${prefix.color}[${prefix.name}]\u001b[0m: ${content}`)
}