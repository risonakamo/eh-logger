import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import ExportButton from "components/exportbutton/exportbutton";
import ImportButton from "components/import-button/import-button";
import LogsTable2 from "components/logs-table2/logstable2";
import ColumnButton from "components/column-button/column-button";

import {attachWindowFunctions,getLogEntries,logEntrySort,deleteEntry} from "lib/logger-database";
import convertEhHistoryLogs from "lib/legacyconverter";

import "./logviewer-index.less";
import "simplebar/dist/simplebar.css";

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

  /** shuffle log order */
  function shuffleSetLogs():void
  {
    setLogs(_.shuffle(logs));
  }

  function h_shuffle(e:React.MouseEvent):void
  {
    e.preventDefault();
    shuffleSetLogs();
  }

  return <>
    <div className="container">
      <div className="log-table-contain container-col">
        <LogsTable2 logs={logs} deleteEntry={doDeleteEntry} groupMode={false}/>
      </div>
      <div className="control-column container-col">
        <div className="item-container">
          <ExportButton/>
          <ImportButton importedLogs={sortAndSetLogs}/>
          <ColumnButton onClick={h_shuffle} text="Shuffle" icon=""/>
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