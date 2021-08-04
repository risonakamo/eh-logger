import React from "react";

import "./confirmbutton.less";

interface ConfirmButtonProps
{
  onClick():void //click event handler
  onHoldComplete():void //called when button hold action completes
}

interface ConfirmButtonState
{
  holding:boolean
}

export default class ConfirmButton extends React.Component
{
  declare props:ConfirmButtonProps
  state:ConfirmButtonState

  holdTimer:number

  constructor(props:ConfirmButtonProps)
  {
    super(props);
    this.beginHoldTimer=this.beginHoldTimer.bind(this);
    this.endHoldTimer=this.endHoldTimer.bind(this);

    this.state={
      holding:false
    };

    this.holdTimer=0;
  }

  beginHoldTimer():void
  {
    this.holdTimer=window.setTimeout(()=>{
      this.props.onHoldComplete();
    },2000);

    this.setState({holding:true});
  }

  endHoldTimer():void
  {
    clearTimeout(this.holdTimer);
    this.setState({holding:false});
  }

  render()
  {
    var holdingClass:string=this.state.holding?"filling":"";

    return <div className="confirm-zone" onClick={this.props.onClick} onMouseDown={this.beginHoldTimer}
      onMouseUp={this.endHoldTimer} onMouseLeave={this.endHoldTimer}>
      <div className={`fill-rect ${holdingClass}`}></div>
      <img src="/assets/imgs/log-icon.png"/>
    </div>;
  }
}