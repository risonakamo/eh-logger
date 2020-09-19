import React from "react";

import "./inputzone.less";

interface InputZoneProps
{
  fieldName:string //title above the field
  content:string //initial content of the input box
  notEditable?:boolean //set true to be static field
  inputBoxClass?:string //class to apply to input field
}

interface InputZoneState
{
  inputValue:string
}

export default class InputZone extends React.Component
{
  props:InputZoneProps
  state:InputZoneState

  firstInputEvent:boolean //placeholder will show based on props until the first input event,
                          //where it will then be showing based on state

  contentBox:React.RefObject<HTMLDivElement>

  constructor(props:InputZoneProps)
  {
    super(props);
    this.inputHandler=this.inputHandler.bind(this);

    this.state={
      inputValue:""
    };

    this.contentBox=React.createRef();

    this.firstInputEvent=false;
  }

  // get value of this inputzone
  public getValue():string
  {
    return this.contentBox!.current!.innerText;
  }

  // set input value on input change
  inputHandler():void
  {
    this.firstInputEvent=true;
    this.setState({
      inputValue:this.contentBox.current!.textContent
    });
  }

  // determine if the placeholder should change based on props or state.
  // place holder should show if the value we are supposed to be looking
  // at is zero
  shouldShowPlaceholder():boolean
  {
    if (!this.firstInputEvent)
    {
      return this.props.content.length==0;
    }

    return this.state.inputValue.length==0;
  }

  render()
  {
    var inputBoxClass:string=this.props.inputBoxClass||"";
    var showPlaceholderClass:string=this.shouldShowPlaceholder()?"":"hidden";

    return <div className="input-zone">
      <p>{this.props.fieldName}</p>
      <div className="input-areas">
        <div className={`input-placeholder ${showPlaceholderClass}`}>&lt;empty&gt;</div>
        <div className={`input-box ${inputBoxClass}`} contentEditable={!this.props.notEditable}
          ref={this.contentBox} suppressContentEditableWarning={true} onInput={this.inputHandler}>
            {this.props.content}
        </div>
      </div>
    </div>;
  }
}