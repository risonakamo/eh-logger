import React,{useState} from "react";
import SimpleBar from "simplebar-react";
import _ from "lodash";
import cx from "classnames";

import LogRow2 from "./logrow2";
import GroupRow from "components/group-row/group-row";

import "./logstable2.less";

interface LogsTableProps
{
  logs:LogEntry[]
  loggroups:LogGroup[]

  groupMode:boolean

  sortMode:SortMode

  deleteEntry(entry:LogEntry):void
  onColNameClick(col:SortModeCol):void
}

interface ColData
{
  text:string
  className:string
  colType?:SortModeCol
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
  /** render standard entry rows when table is in normal row mode */
  function renderRows(logs:LogEntry[],groupMode:boolean,prekey:string):JSX.Element[]
  {
    return _.map(logs,(x:LogEntry,i:number)=>{
      return <LogRow2 entry={x} key={`${prekey}_${i}`} holdCompleted={props.deleteEntry}
        groupSubEntry={groupMode}/>
    });
  }

  /** render rows of the table when table is in group mode */
  function renderGroupRows():JSX.Element[]
  {
    return _.flatMap(props.loggroups,(x:LogGroup,i:number):JSX.Element[]=>{
      var isexpanded:boolean=theExpandedGroups.has(x.group);

      var grouprow:JSX.Element=<GroupRow key={i} loggroup={x} onClick={h_grouprowClick}
        expanded={isexpanded}/>;

      // if group not expanded, just return the group
      if (!isexpanded)
      {
        return [grouprow];
      }

      // other wise return the group, and its inner log entries
      return [
        grouprow,
        ...renderRows(x.logs,true,x.group)
      ]
    });
  }

  /** create group header with clickable col names */
  function renderGroupHeader(groupMode:boolean):JSX.Element[]
  {
    var typeColText:string="T";
    var nameColText:string="NAME";

    var typeColType:SortModeCol="type";
    var nameColType:SortModeCol|undefined="name";

    if (groupMode)
    {
      typeColText="C";
      nameColText="";
      typeColType="count";
      nameColType=undefined;
    }

    const cols:ColData[]=[
      {
        text:"DATE",
        className:"date",
        colType:"date"
      },
      {
        text:typeColText,
        className:"type",
        colType:typeColType
      },
      {
        text:"GROUP",
        className:"group",
        colType:"group"
      },
      {
        text:nameColText,
        className:"name",
        colType:nameColType
      }
    ];

    return _.map(cols,(x:ColData):JSX.Element=>{
      /** handle a col header clicked. calls the overall table's oncolclick on the col header's col type.
       *  no sort type is unsortable, does nothing */
      function h_tableColClick():void
      {
        if (x.colType)
        {
          props.onColNameClick(x.colType);
        }
      }

      return <div className={cx("log-col",x.className)} key={x.text} onClick={h_tableColClick}>
        {x.text}
      </div>;
    });
  }

  var rows:JSX.Element[];

  if (!props.groupMode)
  {
    rows=renderRows(props.logs,false,"");
  }

  else
  {
    rows=renderGroupRows();
  }

  return <div className="logs-table2">
    <div className="log-row header-row">
      {renderGroupHeader(props.groupMode)}
    </div>
    <SimpleBar className="the-log-rows">
      <div>
        {rows}
      </div>
    </SimpleBar>
  </div>;
}