import React from "react";

import "./inputzone.less";

interface InputZoneProps
{
  fieldName:string //title above the field
  content:string //initial content of the input box
  notEditable?:boolean //set true to be static field
}

export default function InputZone(props:InputZoneProps):JSX.Element
{
  return <div className="input-zone">
    <p>{props.fieldName}</p>
    <div className="input-box" contentEditable={!props.notEditable}>{props.content}</div>
  </div>;
}