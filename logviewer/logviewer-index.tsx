import React from "react";
import ReactDOM from "react-dom";

import {attachWindowFunctions} from "../database/logger-database";

import "./logviewer-index.less";

class LogviewerMain extends React.Component
{

}

function main()
{
  ReactDOM.render(<LogviewerMain/>,document.querySelector(".main"));
  attachWindowFunctions();
}

window.onload=main;