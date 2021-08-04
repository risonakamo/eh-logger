import _ from "lodash";

import {logEntrySort} from "lib/logger-database";

// convert json of old EH HISTORY logs into new format.
// returns json of new format.
export default function convertEhHistoryLogs(ehLogs:string):string
{
    var logs:OldLog=JSON.parse(ehLogs);

    var convertedLogs:LogEntry[]=_.map(logs,(x:OldLogEntry)=>{
        return {
            name:x.name,
            group:x.group,
            type:x.type,
            link:x.link,
            date:x.date
        };
    });

    return JSON.stringify(convertedLogs.sort(logEntrySort),null,4)
}