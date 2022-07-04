import React,{useState,useRef,useEffect} from "react";
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

  expandedGroups:Set<string>

  groupMode:boolean

  sortMode:SortMode

  // log entry was deleted
  deleteEntry(entry:LogEntry):void

  // clicked on a sort column
  onColNameClick(col:SortModeCol):void

  // expanded groups changed (added or deleted)
  expandedGroupsChanged(newgroups:Set<string>):void

  onLinkClicked(entry:LogEntry,ctrl:boolean):void
}

interface ColData
{
  text:string
  className:string
  colType?:SortModeCol
}

export default function LogsTable2(props:LogsTableProps):JSX.Element
{
  /** --- states --- */
  const [typeFilter,setTypeFilter]=useState<EntryType|null>(null);


  /** --- refs --- */
  // table scrollable content zone
  const tableContainer=useRef<SimpleBar>(null);


  /** --- effects --- */
  // scroll to top on group mode change
  useEffect(()=>{
    tableContainer.current!.getScrollElement().scrollTop=0;
  },[props.groupMode]);


  /** --- handlers --- */
  /** handle clicked group row. toggle expansion */
  function h_grouprowClick(loggroup:LogGroup):void
  {
    var newexpanded:Set<string>=new Set(props.expandedGroups);

    if (props.expandedGroups.has(loggroup.group))
    {
      newexpanded.delete(loggroup.group);
    }

    else
    {
      newexpanded.add(loggroup.group);
    }

    props.expandedGroupsChanged(newexpanded);
  }

  /** type selected on an entry row. set the type filter, only if it wasn't set before */
  function h_typeSelected(type:EntryType):void
  {
    if (!typeFilter)
    {
      console.log("set filter",type);
      setTypeFilter(type);
    }
  }


  /** ---- RENDER ---- */
  /** render standard entry rows when table is in normal row mode */
  function renderRows(logs:LogEntry[],groupMode:boolean,prekey:string):JSX.Element[]
  {
    return _(logs)

    // if type filter active, filter to only that type
    .filter((x:LogEntry):boolean=>{
      return !typeFilter || x.type==typeFilter;
    })

    .map((x:LogEntry,i:number):JSX.Element=>{
      return <LogRow2 entry={x} key={`${prekey}_${i}`} holdCompleted={props.deleteEntry}
        groupSubEntry={groupMode} typeClicked={h_typeSelected} linkClicked={props.onLinkClicked}/>
    })
    .value();
  }

  /** render rows of the table when table is in group mode */
  function renderGroupRows():JSX.Element[]
  {
    return _.flatMap(props.loggroups,(x:LogGroup,i:number):JSX.Element[]=>{
      var isexpanded:boolean=props.expandedGroups.has(x.group);

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

      const colClass={
        unsortable:!x.colType
      };

      var ascDescIcon:string="";
      if (props.sortMode.col==x.colType)
      {
        if (props.sortMode.desc)
        {
          ascDescIcon="▼";
        }

        else
        {
          ascDescIcon="▲";
        }
      }

      return <div className={cx("log-col",x.className,colClass)} key={x.text} onClick={h_tableColClick}>
        {x.text} {ascDescIcon}
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
    <SimpleBar className="the-log-rows" ref={tableContainer}>
      <div>
        {rows}
      </div>
    </SimpleBar>
  </div>;
}