import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";

import {attachWindowFunctions,getLogEntries,logEntrySort} from "../database/logger-database";
import ExportButton from "./components/exportbutton/exportbutton";
import LogsTable from "./components/logs-table/logstable";

import "./logviewer-index.less";

function LogviewerMain():JSX.Element
{
  const [logs,setLogs]=useState<LogEntry[]>([]);

  useEffect(()=>{
    (async ()=>{
      setLogs((await getLogEntries()).sort(logEntrySort));
    })();
  },[]);

  return <>
    <div className="container">
      <div className="log-table-contain">
        <LogsTable logs={logs}/>
      </div>
      <div className="control-column">
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