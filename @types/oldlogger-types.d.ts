// JSON schema for old entrys log
type OldLog=Record<string,OldLogEntry>;

interface OldLogEntry
{
    date:string
    dates?:string[]
    group:string
    id:number
    image:string
    link:string
    name:string
    reference?:boolean
    tags?:string[]
    type:EntryType
}