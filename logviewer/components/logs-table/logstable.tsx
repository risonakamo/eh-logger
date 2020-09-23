import React from "react";

import LogsRow from "./logsrow";

import "./logstable.less";

interface LogsTableProps
{
  logs:LogEntry[]
}

export default function LogsTable(props:LogsTableProps):JSX.Element
{
  return <table className="logs-table">
    <thead>
      <tr>
        <td className="date">DATE</td>
        <td className="type">TYPE</td>
        <td className="group">GROUP</td>
        <td className="name">NAME</td>
      </tr>
    </thead>
    <tbody>
      {props.logs.map((x:LogEntry,i:number)=>{
        return <LogsRow entry={x} key={i}/>;
      })}
    </tbody>
  </table>;
}