import React from "react";

import "./column-button.less";

interface ColumnButtonProps
{
  text:string
  icon:string
  onClick(e:React.MouseEvent):void
}

export default function ColumnButton(props:ColumnButtonProps):JSX.Element
{
  return <a href="" onClick={props.onClick} className="column-button">
    <div className="button-text">{props.text}</div>
    <img src={props.icon}/>
  </a>;
}