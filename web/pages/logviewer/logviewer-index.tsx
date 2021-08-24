import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import ExportButton from "components/exportbutton/exportbutton";
import ImportButton from "components/import-button/import-button";
import LogsTable2 from "components/logs-table2/logstable2";
import ColumnButton from "components/column-button/column-button";

import {attachWindowFunctions,getLogEntries,logEntrySort,deleteEntry} from "lib/logger-database";
import convertEhHistoryLogs from "lib/legacyconverter";
import {determineLogGroups} from "lib/log-grouper";

import "./logviewer-index.less";
import "simplebar/dist/simplebar.css";

function LogviewerMain():JSX.Element
{
  const [logs,setLogs]=useState<LogEntry[]>([]);

  const [theLoggroups,setLogGroups]=useState<LogGroup[]>([]);

  const [isGroupMode,setGroupMode]=useState<boolean>(false);

  const [theSortMode,setSortMode]=useState<SortMode>({
    col:"date",
    desc:true
  });

  // component did mount.
  useEffect(()=>{
    (window as any).convertEhHistoryLogs=convertEhHistoryLogs;

    // initial retrival of logs.
    (async ()=>{
      sortAndSetLogs(await getLogEntries());
    })();
  },[]);

  /**---- STATE CONTROL ----*/
  // perform delete on an entry and re-render.
  async function doDeleteEntry(entry:LogEntry):Promise<void>
  {
    sortAndSetLogs(await deleteEntry(entry));
  }

  // given logs, sort and set them, and re render.
  function sortAndSetLogs(logs:LogEntry[]):void
  {
    setLogs(logs.sort(logEntrySort));
    setLogGroups(determineLogGroups(logs));
  }

  /** set the sort mode to a new mode. if the new mode is the same as the current mode, reverse the
   * sort direction. setting new mode resets direction */
  function changeSortMode(newMode:SortModeCol):void
  {
    if (theSortMode.col==newMode)
    {
      setSortMode({
        ...theSortMode,
        desc:!theSortMode.desc
      });
    }

    else
    {
      setSortMode({
        col:newMode,
        desc:true
      });
    }
  }

  /**---- HANDLERS ----*/
  /** handle click shuffle button */
  function h_shuffle(e:React.MouseEvent):void
  {
    e.preventDefault();

    if (!isGroupMode)
    {
      setLogs(_.shuffle(logs));
    }

    else
    {
      setLogGroups(_.shuffle(theLoggroups));
    }
  }

  /** handle toggle modes button */
  function h_toggleGroupMode(e:React.MouseEvent):void
  {
    e.preventDefault();
    setGroupMode(!isGroupMode);
  }

  /** clicked sortable table header. sort by the clicked col */
  function h_tableColClick(col:SortModeCol):void
  {
    changeSortMode(col);
  }

  var groupModeToggleText:string="Group Mode";
  if (isGroupMode)
  {
    groupModeToggleText="Entry Mode";
  }

  return <>
    <div className="container">
      <div className="log-table-contain container-col">
        <LogsTable2 logs={logs} loggroups={theLoggroups} deleteEntry={doDeleteEntry}
          groupMode={isGroupMode} sortMode={theSortMode} onColNameClick={h_tableColClick}/>
      </div>
      <div className="control-column container-col">
        <div className="item-container">
          <ExportButton/>
          <ImportButton importedLogs={sortAndSetLogs}/>
          <ColumnButton onClick={h_shuffle} text="Shuffle" icon=""/>
          <ColumnButton onClick={h_toggleGroupMode} text={groupModeToggleText} icon=""/>
        </div>
      </div>
    </div>
  </>;
}

function main()
{
  ReactDOM.render(<LogviewerMain/>,document.querySelector(".main"));
  attachWindowFunctions();
}

window.onload=main;