import React,{useState} from "react";
import SimpleBar from "simplebar-react";
import _ from "lodash";

import LogRow2 from "./logrow2";
import GroupRow from "components/group-row/group-row";

import "./logstable2.less";

interface LogsTableProps
{
  logs:LogEntry[]
  loggroups:LogGroup[]

  groupMode:boolean

  deleteEntry(entry:LogEntry):void
}

export default function LogsTable2(props:LogsTableProps):JSX.Element
{
  const [theExpandedGroups,setExpandedGroups]=useState<Set<string>>(new Set());

  /** handle clicked group row. toggle expansion */
  function h_grouprowClick(loggroup:LogGroup):void
  {
    var newexpanded:Set<string>=new Set(theExpandedGroups);

    if (theExpandedGroups.has(loggroup.group))
    {
      newexpanded.delete(loggroup.group);
    }

    else
    {
      newexpanded.add(loggroup.group);
    }

    setExpandedGroups(newexpanded);
  }

  /** ---- RENDER ---- */
  function renderRows():JSX.Element[]
  {
    return props.logs.map((x:LogEntry,i:number)=>{
      return <LogRow2 entry={x} key={i} holdCompleted={props.deleteEntry}/>
    });
  }

  function renderGroupRows():JSX.Element[]
  {
    return _.map(props.loggroups,(x:LogGroup,i:number):JSX.Element=>{
      return <GroupRow key={i} loggroup={x} onClick={h_grouprowClick}/>;
    });
  }

  var rows:JSX.Element[];
  var typeColText:string="T";
  var nameColText:string="NAME";

  if (!props.groupMode)
  {
    rows=renderRows();
  }

  else
  {
    rows=renderGroupRows();
    typeColText="C";
    nameColText="";
  }

  return <div className="logs-table2">
    <div className="log-row header-row">
      <div className="log-col date">DATE</div>
      <div className="log-col type">{typeColText}</div>
      <div className="log-col group">GROUP</div>
      <div className="log-col name">{nameColText}</div>
    </div>
    <SimpleBar className="the-log-rows">
      <div>
        {rows}
      </div>
    </SimpleBar>
  </div>;
}