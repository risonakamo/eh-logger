import React from "react";

import LogRow2 from "./logrow2";

import "./logstable2.less";

interface LogsTableProps
{
  logs:LogEntry[]
}

export default function LogsTable2(props:LogsTableProps):JSX.Element
{
  return <div className="logs-table2">
    {props.logs.map((x:LogEntry,i:number)=>{
      return <LogRow2 entry={x} key={i}/>
    })}
  </div>;
}