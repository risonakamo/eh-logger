import React from "react";
import ReactDOM from "react-dom";

import InputZone from "./components/inputzone/inputzone";

import "./popup-index.less";

class PopupMain extends React.Component
{
  render()
  {
    return <>
      <div className="input-zones">
        <InputZone fieldName="name" content="[Jitaku Vac ation (Ulrich)] SUKEBE Order VOL.1 (Fate/Grand Order) [Digital]"/>
        <InputZone fieldName="group" content="ulrich"/>
        <InputZone fieldName="type" content="NH"/>
      </div>

      <div className="confirm-zone">
        <img src="/imgs/log-icon.png"/>
      </div>
    </>;
  }
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;