import {createSelector} from "reselect";

import {sortLogs,sortLogGroups} from "lib/log-sort";
import {determineLogGroups} from "lib/log-grouper";

/** retrieve from store the logs sorted by the current sort mode */
export const sortedLogsSelect=createSelector(
    logsSelect,
    sortModeSelect,
    (logs:LogEntry[],sortmode:SortMode):LogEntry[]=>{
        return sortLogs(logs,sortmode.col,sortmode.desc);
    }
);

/** retrive from store the log groups from the logs */
export const logGroupsSelect=createSelector(
    logsSelect,
    sortModeSelect,
    (logs:LogEntry[],sortmode:SortMode):LogGroup[]=>{
        return sortLogGroups(
            determineLogGroups(logs),
            sortmode.col,
            sortmode.desc
        );
    }
);

/** retrieve from store the logs */
export function logsSelect(store:LogviewerStore):LogEntry[]
{
    return store.logs;
}

/** retrieve from store the sortmode */
export function sortModeSelect(store:LogviewerStore):SortMode
{
    return store.sortMode;
}

/** get group mode */
export function isGroupModeSelect(store:LogviewerStore):boolean
{
    return store.groupMode;
}