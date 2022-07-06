import React,{useEffect,useState,useMemo} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Provider,useSelector} from "react-redux";
import cx,{Mapping} from "classnames";

import ExportButton from "components/exportbutton/exportbutton";
import ImportButton from "components/import-button/import-button";
import LogsTable2 from "components/logs-table2/logstable2";
import ColumnButton from "components/column-button/column-button";
import GroupAliasEditor from "components/group-alias-editor/group-alias-editor";

import {attachWindowFunctions,getLogEntries,logEntrySort,deleteEntry,
  getGroupAliases} from "lib/logger-database";
import convertEhHistoryLogs from "lib/legacyconverter";
import {determineLogGroups} from "lib/log-grouper";
import {sortLogs,sortLogGroups} from "lib/log-sort";

import logviewerStore from "store/logviewer/logviewer-store";

import "./logviewer-index.less";
import "simplebar/dist/simplebar.css";

function LogviewerMain():JSX.Element
{
  /** ---- STATE ---- */
  const [logs,setLogs]=useState<LogEntry[]>([]);

  const [theLoggroups,setLogGroups]=useState<LogGroup[]>([]);

  const [isGroupMode,setGroupMode]=useState<boolean>(false);

  const [theSortMode,setSortMode]=useState<SortMode>({
    col:"date",
    desc:true
  });

  const [expandedGroups,setExpandedGroups]=useState<Set<string>>(new Set());

  const [groupAliasMode,setGroupAliasMode]=useState<boolean>(false);
  const [selectedEditGroup,setSelectedEditGroup]=useState<string|null>(null);
  const [groupAliases,setGroupAliases]=useState<GroupAliases>({});


  /** --- derived state --- */
  // all group names in set forme
  const allGroupNames:Set<string>=useMemo(()=>{
    return new Set(_.map(theLoggroups,(x:LogGroup):string=>{
      return x.group;
    }));
  },[theLoggroups]);

  // if all groups are expanded or not
  const allExpanded:boolean=useMemo(()=>{
    return expandedGroups.size==allGroupNames.size;
  },[expandedGroups,allGroupNames]);


  /** ---- EFFECTS ---- */
  // component did mount.
  useEffect(()=>{
    (window as any).convertEhHistoryLogs=convertEhHistoryLogs;

    // initial retrival of logs.
    (async ()=>{
      sortAndSetLogs(await getLogEntries());
    })();

    (async ()=>{
      setGroupAliases(await getGroupAliases());
    })();
  },[]);


  /**---- STATE CONTROL ----*/
  // perform delete on an entry and re-render.
  async function doDeleteEntry(entry:LogEntry):Promise<void>
  {
    sortAndSetLogs(await deleteEntry(entry));
  }

  /** given logs, sort and set them, and re render. if in group mode, sort groups instead. */
  function sortAndSetLogs(logs:LogEntry[]):void
  {
    setLogsWithSort(logs,theSortMode,isGroupMode);
  }

  /** set the logs with the given sort mode */
  function setLogsWithSort(logs:LogEntry[],sortmode:SortMode,groupMode:boolean):void
  {
    if (!groupMode)
    {
      setLogs(sortLogs(logs,sortmode.col,sortmode.desc));
    }

    else
    {
      setLogGroups(sortLogGroups(
        determineLogGroups(logs,groupAliases),
        sortmode.col,
        sortmode.desc
      ));
    }
  }

  /** set the sort mode to a new mode. if the new mode is the same as the current mode, reverse the
   * sort direction. setting new mode resets direction. also call sort and set logs to update logs order.
   * give it reset to switch to the specified mode but always start in desc order. */
  function changeSortMode(newMode:SortModeCol,groupMode:boolean,reset:boolean=false):void
  {
    var newsortmode:SortMode;

    if (theSortMode.col==newMode && !reset)
    {
      newsortmode={
        ...theSortMode,
        desc:!theSortMode.desc
      };
    }

    else
    {
      newsortmode={
        col:newMode,
        desc:true
      };
    }

    setSortMode(newsortmode);
    setLogsWithSort(logs,newsortmode,groupMode);
  }

  /** set group mode and reset sort to date */
  function changeGroupMode(newmode:boolean):void
  {
    setGroupMode(newmode);
    changeSortMode("date",newmode,true);
  }

  /** add all group names to expanded groups state */
  function expandAllGroups():void
  {
    setExpandedGroups(new Set(allGroupNames));
  }

  /** collapse all expanded groups */
  function collapseAllGroups():void
  {
    setExpandedGroups(new Set());
  }


  /**---- HANDLERS ----*/
  /** handle click shuffle button. shuffle log entries or log groups based on mode */
  function h_shuffle(e:React.MouseEvent):void
  {
    e.preventDefault();

    if (!isGroupMode)
    {
      setLogs(_.shuffle(logs));
    }

    else
    {
      setLogGroups(_.shuffle(theLoggroups));
    }

    setSortMode({
      col:"date",
      desc:false
    });
  }

  /** handle toggle modes button. toggle the group mode */
  function h_toggleGroupMode(e:React.MouseEvent):void
  {
    e.preventDefault();
    changeGroupMode(!isGroupMode);
  }

  /** clicked sortable table header. sort by the clicked col */
  function h_tableColClick(col:SortModeCol):void
  {
    changeSortMode(col,isGroupMode);
  }

  /** logs table expanded groups changed. override the expanded groups */
  function h_expandedGroupsChanged(newgroups:Set<string>):void
  {
    setExpandedGroups(newgroups);
  }

  /** clicked expand all groups button. perform expand all groups, unless all groups are already expanded,
   *  then close them all instead */
  function h_expandAllGroupsClicked():void
  {
    if (allExpanded)
    {
      collapseAllGroups();
      return;
    }

    expandAllGroups();
  }

  /** toggle group alias mode */
  function h_groupAliasModeToggle():void
  {
    setGroupAliasMode(!groupAliasMode);
  }

  /** clicked on link, open in new tab or in current tab. when in group alias edit mode, set the
   *  group being edited
   */
  function h_linkClicked(entry:LogEntry,ctrl:boolean):void
  {
    if (groupAliasMode)
    {
      setSelectedEditGroup(entry.group);
      return;
    }

    if (ctrl)
    {
      window.location.href=entry.link;
      return;
    }

    chrome.tabs.create({
      active:false,
      url:entry.link
    });
  }


  /** --- render --- */
  // toggle to group or entry mode button conditional appearance
  var groupModeToggleText:string="Group Mode";
  if (isGroupMode)
  {
    groupModeToggleText="Entry Mode";
  }

  var entryOrGroupModeButtonIcon:string="/assets/imgs/groupmodeicon.png";
  if (isGroupMode)
  {
    entryOrGroupModeButtonIcon="/assets/imgs/entrymodeicon.png";
  }

  var groupAliasToggleText:string="Edit Group Alias";
  if (groupAliasMode)
  {
    groupAliasToggleText="Done edit Group Alias";
  }

  // expand all groups button only appears in group mode
  function renderExpandAllGroupsButton():JSX.Element|undefined
  {
    if (!isGroupMode)
    {
      return;
    }

    var expandAllButtonText:string="Expand All Groups";
    var expandAllIcon:string="/assets/imgs/group-expand.png";
    if (allExpanded)
    {
      expandAllButtonText="Collapse All";
      expandAllIcon="/assets/imgs/group-collapse.png";
    }

    return <ColumnButton text={expandAllButtonText} icon={expandAllIcon}
      onClick={h_expandAllGroupsClicked}/>;
  }

  const groupAliasEditorCx:Mapping={
    hidden:!groupAliasMode
  };

  return <>
    <div className="container">
      <div className="log-table-contain container-col">
        <LogsTable2 logs={logs} loggroups={theLoggroups} deleteEntry={doDeleteEntry}
          groupMode={isGroupMode} sortMode={theSortMode} onColNameClick={h_tableColClick}
          expandedGroups={expandedGroups} expandedGroupsChanged={h_expandedGroupsChanged}
          onLinkClicked={h_linkClicked}/>
      </div>
      <div className="control-column container-col">
        <div className="item-container">
          <ExportButton/>
          <ImportButton importedLogs={sortAndSetLogs}/>
          <ColumnButton onClick={h_shuffle} text="Shuffle" icon="/assets/imgs/shuffleicon.png"/>
          <ColumnButton onClick={h_toggleGroupMode} text={groupModeToggleText}
            icon={entryOrGroupModeButtonIcon}/>
          {renderExpandAllGroupsButton()}
          <ColumnButton text={groupAliasToggleText} icon="/assets/imgs/shuffleicon.png"
            onClick={h_groupAliasModeToggle}/>
          <GroupAliasEditor selectedGroup={selectedEditGroup} className={cx(groupAliasEditorCx)}/>
        </div>
      </div>
    </div>
  </>;
}

function main()
{
  ReactDOM.render(
    <Provider store={logviewerStore}>
      <LogviewerMain/>
    </Provider>,
    document.querySelector(".main")
  );

  attachWindowFunctions();
}

window.onload=main;