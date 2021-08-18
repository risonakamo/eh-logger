import React from "react";
import SimpleBar from "simplebar-react";
import _ from "lodash";

import LogRow2 from "./logrow2";
import GroupRow from "components/group-row/group-row";

import {determineLogGroups} from "lib/log-grouper";

import "./logstable2.less";

interface LogsTableProps
{
  logs:LogEntry[]

  groupMode:boolean

  deleteEntry(entry:LogEntry):void
}

export default function LogsTable2(props:LogsTableProps):JSX.Element
{
  function renderRows():JSX.Element[]
  {
    return props.logs.map((x:LogEntry,i:number)=>{
      return <LogRow2 entry={x} key={i} holdCompleted={props.deleteEntry}/>
    });
  }

  function renderGroupRows():JSX.Element[]
  {
    return _.map(determineLogGroups(props.logs),(x:LogGroup,i:number):JSX.Element=>{
      return <GroupRow key={i} loggroup={x}/>;
    });
  }

  // var rows:JSX.Element[];
  // if (!props.groupMode)
  // {
  //   rows=renderRows();
  // }

  // else
  // {
  //   rows=renderGroupRows();
  // }

  var rows:JSX.Element[]=renderRows();
  var rows2:JSX.Element[]=renderGroupRows();

  return <div className="logs-table2">
    <div className="log-row header-row">
      <div className="log-col date">DATE</div>
      <div className="log-col type">T</div>
      <div className="log-col group">GROUP</div>
      <div className="log-col name">NAME</div>
    </div>
    <SimpleBar className="the-log-rows">
      <div>
        {rows2}
        {rows}
      </div>
    </SimpleBar>
  </div>;
}