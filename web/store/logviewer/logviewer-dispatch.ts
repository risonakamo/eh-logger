import logViewerStore from "store/logviewer/logviewer-store";

/** override the logs */
export function setLogs(logs:LogEntry[]):void
{
    logViewerStore.dispatch({
        type:"setLogs",
        payload:logs
    });
}

/** set the sortmode col */
export function setSortMode(col:SortModeCol):void
{
    logViewerStore.dispatch({
        type:"setSortMode",
        payload:col
    });
}

/** override the group mode */
export function setGroupMode(newmode:boolean):void
{
    logViewerStore.dispatch({
        type:"setGroupMode",
        payload:newmode
    });
}