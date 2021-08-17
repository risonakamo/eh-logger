/** combined LogEntrys into LogGroup */
interface LogGroup
{
    name:string
    group:string
    date:string

    type:EntryType
    link:string

    names:string[]
    groups:string[]
    dates:string[]
}

// LogEntrys grouped by link
type GroupedLogEntries=Record<string,LogEntry[]>