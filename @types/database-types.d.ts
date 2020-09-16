interface EhLoggerLocalStorage
{
    logEntries:LogEntry[]
}

interface LogEntry
{
    name:string
    group:string
    type:EntryType
    link:string

    date:string
}