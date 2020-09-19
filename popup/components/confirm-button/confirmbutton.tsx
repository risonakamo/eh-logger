import React from "react";

import "./confirmbutton.less";

interface ConfirmButtonProps
{
  onClick():void //click event handler
}

export default class ConfirmButton extends React.Component
{
  props:ConfirmButtonProps

  holdTimer:number

  constructor(props:ConfirmButtonProps)
  {
    super(props);
    this.beginHoldTimer=this.beginHoldTimer.bind(this);
    this.endHoldTimer=this.endHoldTimer.bind(this);
  }

  beginHoldTimer():void
  {
    this.holdTimer=setTimeout(()=>{
      window.close();
    },2000);
  }

  endHoldTimer():void
  {
    clearTimeout(this.holdTimer);
  }

  render()
  {
    return <div className="confirm-zone" onClick={this.props.onClick} onMouseDown={this.beginHoldTimer}
      onMouseUp={this.endHoldTimer} onMouseLeave={this.endHoldTimer}>
      <img src="/imgs/log-icon.png"/>
    </div>;
  }
}