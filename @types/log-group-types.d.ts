/** combined LogEntrys into LogGroup */
interface LogGroup
{
    group:string

    //latest date
    date:string

    logs:LogEntry[]
}

// LogEntrys grouped by link
type GroupedLogEntries=Record<string,LogEntry[]>