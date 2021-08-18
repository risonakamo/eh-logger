import React from "react";

import {logrowDateformat} from "lib/log-row-helpers";

import "./group-row.less";

interface GroupRowProps
{
  loggroup:LogGroup
}

export default function GroupRow(props:GroupRowProps):JSX.Element
{
  return <div className="group-row">
    <div className="log-col date">{logrowDateformat(props.loggroup.date)}</div>
    <div className="log-col type">{props.loggroup.logs.length}</div>
    <div className="log-col group">{props.loggroup.group}</div>
  </div>;
}