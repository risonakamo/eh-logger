import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";

import {attachWindowFunctions,getLogEntries,logEntrySort,deleteEntry} from "../database/logger-database";
import ExportButton from "./components/exportbutton/exportbutton";
import LogsTable2 from "./components/logs-table2/logstable2";

import "./logviewer-index.less";

function LogviewerMain():JSX.Element
{
  const [logs,setLogs]=useState<LogEntry[]>([]);

  useEffect(()=>{
    (async ()=>{
      setLogs(await getLogEntries(true));
    })();
  },[]);

  async function doDeleteEntry(entry:LogEntry):Promise<void>
  {
    setLogs((await deleteEntry(entry)).sort(logEntrySort));
  }

  return <>
    <div className="container">
      <div className="log-table-contain container-col" data-simplebar>
        <LogsTable2 logs={logs} deleteEntry={doDeleteEntry}/>
      </div>
      <div className="control-column container-col">
        <div className="item-container">
          <ExportButton/>
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