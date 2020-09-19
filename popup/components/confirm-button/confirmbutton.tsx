import React from "react";

import "./confirmbutton.less";

interface ConfirmButtonProps
{
  onClick():void //click event handler
}

export default class ConfirmButton extends React.Component
{
  props:ConfirmButtonProps

  render()
  {
    return <div className="confirm-zone" onClick={this.props.onClick}>
      <img src="/imgs/log-icon.png"/>
    </div>;
  }
}