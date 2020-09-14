import React from "react";

import "./inputzone.less";

interface InputZoneProps
{
  fieldName:string //title above the field
  content:string //initial content of the input box
}

export default function InputZone(props:InputZoneProps):JSX.Element
{
  return <div className="input-zone">
    <p>{props.fieldName}</p>
    <div className="input-box" contentEditable>{props.content}</div>
  </div>;
}