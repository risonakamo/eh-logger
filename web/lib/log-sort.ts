import _ from "lodash";

/** sort logs on some mode */
export function sortLogs(logs:LogEntry[],sortMode:SortModeCol,desc:boolean):LogEntry[]
{
    var sorted:LogEntry[];

    switch (sortMode)
    {
        case "date":
        sorted=_.sortBy(logs,(x:LogEntry):Date=>{
            return new Date(x.date);
        });
        break;

        case "name":
        case "group":
        case "type":
        sorted=_.sortBy(logs,(x:LogEntry):string=>{
            return x[sortMode];
        });
        break;

        default:
        throw "sortLogs: unable to sort by key";
    }

    if (desc)
    {
        _.reverse(sorted);
    }

    return sorted;
}

/** sort log groups on some mode */
export function sortLogGroups(logs:LogGroup[],sortMode:SortModeCol,desc:boolean):LogGroup[]
{
    var sorted:LogGroup[]=[];

    switch (sortMode)
    {
        case "date":
        sorted=_.sortBy(logs,(x:LogGroup):Date=>{
            return new Date(x.date);
        });
        break;

        case "group":
        sorted=_.sortBy(logs,(x:LogGroup):string=>{
            return x.group;
        });
        break;

        case "count":
        sorted=_.sortBy(logs,(x:LogGroup):number=>{
            return x.logs.length;
        });
        break;

        default:
        throw `sortLogGroups: unable to sort by key ${sortMode}`;
    }

    if (desc)
    {
        _.reverse(sorted);
    }

    return sorted;
}