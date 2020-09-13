import React from "react";
import ReactDOM from "react-dom";

import "./popup-index.less";

class PopupMain extends React.Component
{
  render()
  {
    return <>
      <div className="input-zone">
        <p>name</p>
        <div className="input-box" contentEditable>[Jitaku Vac ation (Ulrich)] SUKEBE Order VOL.1 (Fate/Grand Order) [Digital]</div>
      </div>

      <div className="input-zone">
        <p>group</p>
        <div className="input-box" contentEditable>ulrich</div>
      </div>

      <div className="input-zone">
        <p>type</p>
        <div className="input-box" contentEditable>NH</div>
      </div>
    </>;
  }
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;