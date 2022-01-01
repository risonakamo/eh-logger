import React from "react";

import "./column-button.less";

interface ColumnButtonProps
{
  text:string
  icon:string
  onClick?(e:React.MouseEvent):void
}

export default function ColumnButton(props:ColumnButtonProps):JSX.Element
{
  /** handle click, cancel href event */
  function h_click(e:React.MouseEvent):void
  {
    e.preventDefault();
    props.onClick?.(e);
  }

  return <a href="" onClick={h_click} className="column-button">
    <div className="button-text">{props.text}</div>
    <img src={props.icon}/>
  </a>;
}