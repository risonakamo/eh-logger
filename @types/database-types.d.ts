interface EhLoggerLocalStorage
{
    logEntries:LogEntry[]
    savedInput?:CachedEntryInput
}

interface LogEntry
{
    name:string
    group:string
    type:EntryType
    link:string

    date:string
}

interface CachedEntryInput
{
    name:string
    group:string
    link:string
}