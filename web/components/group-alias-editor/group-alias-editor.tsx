import React from "react";
import cx,{Mapping} from "classnames";

import "./group-alias-editor.less";

interface GroupAliasEditorProps
{
  selectedGroup:string|null
}

export default function GroupAliasEditor(props:GroupAliasEditorProps):JSX.Element
{
  var selectedGroupText:string="None";
  if (props.selectedGroup)
  {
    selectedGroupText=props.selectedGroup;
  }

  const groupInfoCx:Mapping={
    hidden:props.selectedGroup==null
  };

  return <div className="group-alias-editor">
    <h1>Group Alias Editor</h1>

    <h2>Selected Group</h2>
    <p className="selected-group">{selectedGroupText}</p>

    <div className={cx("group-info",groupInfoCx)}>
      <h2>Add Alias</h2>
      <input type="text"/>

      <h2>Aliases</h2>
      <div className="alias-list">
        <div className="alias-item">
          <p>asasdad</p>
          <div className="remove-button">x</div>
        </div>
        <div className="alias-item">
          <p>asasdad</p>
          <div className="remove-button">x</div>
        </div>
      </div>
    </div>
  </div>;
}