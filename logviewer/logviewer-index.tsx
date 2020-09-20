import React from "react";
import ReactDOM from "react-dom";

import {attachWindowFunctions} from "../database/logger-database";
import ExportButton from "./components/exportbutton/exportbutton";

import "./logviewer-index.less";

class LogviewerMain extends React.Component
{
  render()
  {
    return <>
      <div className="container">
        <div className="log-table">

        </div>
        <div className="control-column">
          <div className="item-container">
            <ExportButton/>
          </div>
        </div>
      </div>
    </>;
  }
}

function main()
{
  ReactDOM.render(<LogviewerMain/>,document.querySelector(".main"));
  attachWindowFunctions();
}

window.onload=main;