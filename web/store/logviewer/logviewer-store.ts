import {combineReducers} from "redux";
import {createReducer,configureStore,createAction} from "@reduxjs/toolkit";

/** override the logs */
const setLogs=createAction<LogEntry[]>("setLogs");

/** set the sortmode col */
const setSortMode=createAction<SortModeCol>("setSortMode");

/** override the group mode */
const setGroupMode=createAction<boolean>("setGroupMode");

const logsReducer=createReducer<LogEntry[]>([],(b)=>{
    /** setLogs overrides the current logs */
    b.addCase(setLogs,(s,a)=>{
        return a.payload;
    });
});

const groupModeReducer=createReducer<boolean>(false,(b)=>{
    /** override group mode */
    b.addCase(setGroupMode,(s,a)=>{
        return a.payload;
    });
});

const sortModeReducer=createReducer<SortMode>({
    col:"date",
    desc:true
},(b)=>{
    /** set the sort mode col */
    b.addCase(setSortMode,(s,a)=>{
        // if the sort mode trying to be set is the same as the current, flip the desc field
        if (s.col==a.payload)
        {
            return {
                ...s,
                desc:!s.desc
            };
        }

        // otherwise set the new sort mode, default to desc
        else
        {
            return {
                col:a.payload,
                desc:true
            };
        }
    })

    /** setting group mode resets sort mode */
    .addCase(setGroupMode,(s,a)=>{
        return {
            col:"date",
            desc:true
        };
    });
});

const logViewerStore=configureStore({
    reducer:combineReducers<LogviewerStore>({
        logs:logsReducer,
        groupMode:groupModeReducer,
        sortMode:sortModeReducer
    })
});

export default logViewerStore;