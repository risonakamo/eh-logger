import _ from "lodash";

/** sort logs on some mode */
export function sortLogs(logs:LogEntry[],sortMode:SortModeCol,desc:boolean):LogEntry[]
{
    var sorted:LogEntry[];

    switch (sortMode)
    {
        case "date":
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
        case "group":
        sorted=_.sortBy(logs,(x:LogGroup):string=>{
            return x[sortMode];
        })
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