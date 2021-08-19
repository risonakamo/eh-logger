import React from "react";
import cx from "classnames";

import {logrowDateformat} from "lib/log-row-helpers";

import "./group-row.less";

interface GroupRowProps
{
  loggroup:LogGroup

  expanded?:boolean

  onClick(loggroup:LogGroup):void
}

export default function GroupRow(props:GroupRowProps):JSX.Element
{
  /** handle group row clicked */
  function h_click():void
  {
    props.onClick(props.loggroup);
  }

  const topclass={
    expanded:props.expanded
  };

  return <div className={cx("group-row",topclass)} onClick={h_click}>
    <div className="log-col date">{logrowDateformat(props.loggroup.date)}</div>
    <div className="log-col type">{props.loggroup.logs.length}</div>
    <div className="log-col group">{props.loggroup.group}</div>
  </div>;
}