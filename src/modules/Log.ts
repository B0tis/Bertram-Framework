import { Prefix, PrefixColors, PrefixNames } from "../enums/prefix"

export const log = (prefixName: PrefixNames, content: string): void => {
    const prefix: Prefix = { name: prefixName, color: PrefixColors[prefixName] }

    console.log(`${prefix.color}[${prefix.name}]\u001b[0m: ${content}`)
}