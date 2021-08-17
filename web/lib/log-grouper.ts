import _ from "lodash";

/** combine multiple different LogEntrys into LogGroups */
export function determineLogGroups(entries:LogEntry[]):LogGroup[]
{
    var groupedentries:GroupedLogEntries=_.groupBy(entries,(x:LogEntry):string=>{
        return x.group;
    });

    return _.map(groupedentries,(x:LogEntry[]):LogGroup=>{
        return combineLogEntries(x);
    });
}

/** merge related LogEntrys into a LogGroup */
function combineLogEntries(entries:LogEntry[]):LogGroup
{
    var names:Record<string,number>={};
    var groups:Record<string,number>={};
    var dates:Set<string>=new Set();

    for (var ix=0;ix<entries.length;ix++)
    {
        var x:LogEntry=entries[ix];

        if (!names[x.name])
        {
            names[x.name]=0;
        }

        if (!groups[x.group])
        {
            groups[x.group]=0;
        }

        dates.add(x.date);
    }

    return {
        name:entries[0].name,
        group:entries[0].group,
        date:entries[0].date,

        type:entries[0].type,
        link:entries[0].link,

        names:_.keys(names),
        groups:_.keys(groups),
        dates:Array.from(dates)
    };
}