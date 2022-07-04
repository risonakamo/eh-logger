import React,{useEffect,useState,useRef} from "react";
import cx,{Mapping} from "classnames";

import {getGroupAlias,addGroupAlias,removeGroupAlias} from "lib/logger-database";

import "./group-alias-editor.less";

interface GroupAliasEditorProps
{
  selectedGroup:string|null
}

export default function GroupAliasEditor(props:GroupAliasEditorProps):JSX.Element
{
  const [currentAlias,setCurrentAlias]=useState<string|null>(null);

  const aliasInputBox=useRef<HTMLInputElement>(null);

  // try to get alias for the selected group when it changes
  useEffect(()=>{
    (async ()=>{
      refreshCurrentAlias();
    })();
  },[props.selectedGroup]);


  // --- control ---
  /** refresh the alias for the current group */
  async function refreshCurrentAlias():Promise<void>
  {
    if (props.selectedGroup)
    {
      setCurrentAlias(await getGroupAlias(props.selectedGroup));
    }
  }


  // --- handlers ---
  /** alias text entry key event. on enter key, submit the new alias */
  async function h_aliasTextboxKey(e:React.KeyboardEvent):Promise<void>
  {
    if (e.key=="Enter")
    {
      if (aliasInputBox.current?.value && props.selectedGroup)
      {
        await addGroupAlias(props.selectedGroup,aliasInputBox.current.value);
        refreshCurrentAlias();
      }
    }
  }

  /** remove alias button. call remove alias for the current group */
  async function h_removeAlias(e:React.MouseEvent):Promise<void>
  {
    e.preventDefault();

    if (props.selectedGroup)
    {
      await removeGroupAlias(props.selectedGroup);
      refreshCurrentAlias();
    }
  }


  // --- render ---
  var selectedGroupText:string="None";
  if (props.selectedGroup)
  {
    selectedGroupText=props.selectedGroup;
  }

  const groupInfoCx:Mapping={
    hidden:props.selectedGroup==null
  };

  var groupAliasText:string="None";
  if (currentAlias)
  {
    groupAliasText=currentAlias;
  }

  return <div className="group-alias-editor">
    <h1>Group Alias Editor</h1>

    <h2>Real Group Name</h2>
    <p className="selected-group">{selectedGroupText}</p>

    <div className={cx("group-info",groupInfoCx)}>
      <h2>Alias</h2>
      <p className="selected-group">{groupAliasText}</p>

      <h2>Edit Alias</h2>
      <input type="text" onKeyDown={h_aliasTextboxKey} ref={aliasInputBox}/>

      <a href="" className="remove-alias" onClick={h_removeAlias}>Remove Alias</a>
    </div>
  </div>;
}