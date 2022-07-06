import _ from "lodash";

/** combine different LogEntrys into LogGroups */
export function determineLogGroups(entries:LogEntry[],aliases:GroupAliases):LogGroup[]
{
    const groupedentries:GroupedLogEntries=_.groupBy(entries,(x:LogEntry):string=>{
        if (x.group in aliases)
        {
            return aliases[x.group];
        }

        return x.group;
    });

    return _.map(groupedentries,(x:LogEntry[],ix:string):LogGroup=>{
        return {
            group:ix,
            date:latestDate(x),
            logs:x
        };
    });
}

/** get latest date from array of logs */
function latestDate(logs:LogEntry[]):string
{
    return _.maxBy(logs,(x:LogEntry):Date=>{
        return new Date(x.date);
    })!.date;
}