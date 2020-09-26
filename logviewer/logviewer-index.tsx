import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";

import {attachWindowFunctions,getLogEntries,logEntrySort,deleteEntry} from "../database/logger-database";
import ExportButton from "./components/exportbutton/exportbutton";
import ImportButton from "./components/import-button/import-button";
import LogsTable2 from "./components/logs-table2/logstable2";
import convertEhHistoryLogs from "./components/legacyconverter/legacyconverter";

import "./logviewer-index.less";

function LogviewerMain():JSX.Element
{
  const [logs,setLogs]=useState<LogEntry[]>([]);

  // component did mount.
  useEffect(()=>{
    (window as any).convertEhHistoryLogs=convertEhHistoryLogs;

    // initial retrival of logs.
    (async ()=>{
      sortAndSetLogs(await getLogEntries());
    })();
  },[]);

  // perform delete on an entry and re-render.
  async function doDeleteEntry(entry:LogEntry):Promise<void>
  {
    sortAndSetLogs(await deleteEntry(entry));
  }

  // given logs, sort and set them, and re render.
  function sortAndSetLogs(logs:LogEntry[]):void
  {
    setLogs(logs.sort(logEntrySort));
  }

  return <>
    <div className="container">
      <div className="log-table-contain container-col" data-simplebar>
        <LogsTable2 logs={logs} deleteEntry={doDeleteEntry}/>
      </div>
      <div className="control-column container-col">
        <div className="item-container">
          <ExportButton/>
          <ImportButton importedLogs={sortAndSetLogs}/>
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