import React from "react";

import "./inputzone.less";

interface InputZoneProps
{
  fieldName:string //title above the field
  content:string //initial content of the input box
  notEditable?:boolean //set true to be static field
}

export default class InputZone extends React.Component
{
  props:InputZoneProps

  contentBox:React.RefObject<HTMLDivElement>

  constructor(props:InputZoneProps)
  {
    super(props);

    this.contentBox=React.createRef();
  }

  // get value of this inputzone
  public getValue():string
  {
    return this.contentBox!.current!.innerText;
  }

  render()
  {
    return <div className="input-zone">
      <p>{this.props.fieldName}</p>
      <div className="input-box" contentEditable={!this.props.notEditable} ref={this.contentBox}
        suppressContentEditableWarning={true}>{this.props.content}</div>
    </div>;
  }
}