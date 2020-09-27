import React from "react";

import LogRow2 from "./logrow2";

import "./logstable2.less";

interface LogsTableProps
{
  logs:LogEntry[]
  deleteEntry(entry:LogEntry):void
}

export default function LogsTable2(props:LogsTableProps):JSX.Element
{
  return <div className="logs-table2">
    <div className="log-row header-row">
      <div className="log-col date">DATE</div>
      <div className="log-col type">TYPE</div>
      <div className="log-col group">GROUP</div>
      <div className="log-col name">NAME</div>
    </div>
    <div className="the-log-rows" data-simplebar>
      <div>
        {props.logs.map((x:LogEntry,i:number)=>{
          return <LogRow2 entry={x} key={i} holdCompleted={props.deleteEntry}/>
        })}
      </div>
    </div>
  </div>;
}