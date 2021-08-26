import {combineReducers} from "redux";
import {createReducer,configureStore,createAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {sortLogs,sortLogGroups} from "lib/log-sort";

/** override the logs */
const setLogs=createAction<LogEntry[]>("setLogs");

/** override the sortmode */
const setSortMode=createAction<SortMode>("setSortMode");

const logsReducer=createReducer<LogEntry[]>([],(b)=>{
    // setLogs overrides the current logs
    b.addCase(setLogs,(state:LogEntry[],action)=>{
        return action.payload;
    });
});

const groupModeReducer=createReducer<boolean>(false,{

});

const sortModeReducer=createReducer<SortMode>({
    col:"date",
    desc:true
},{

});

const reducers=combineReducers<LogviewerStore>({
    logs:logsReducer,
    groupMode:groupModeReducer,
    sortMode:sortModeReducer
});

const logViewerStore=configureStore({
    reducer:reducers
});

/** retrieve from store the logs */
function logsSelect(store:LogviewerStore):LogEntry[]
{
    return store.logs;
}

/** retrieve from store the sortmode */
function sortModeSelect(store:LogviewerStore):SortMode
{
    return store.sortMode;
}

/** retrieve from store the logs sorted by the current sort mode */
const sortedLogsSelect=createSelector(
    logsSelect,
    sortModeSelect,
    (logs:LogEntry[],sortmode:SortMode):LogEntry[]=>{
        return sortLogs(logs,sortmode.col,sortmode.desc);
    }
);

export default LogviewerStore;