import React from "react";
import ReactDOM from "react-dom";

import InputZone from "./components/inputzone/inputzone";
import runPageParser from "../pageparsers/parserrunner";
import {insertLogEntry,attachWindowFunctions} from "../database/logger-database";

import "./popup-index.less";

interface PopupMainState
{
  parseResult:PageParseResultWithType
}

class PopupMain extends React.Component
{
  state:PopupMainState

  constructor(props:any)
  {
    super(props);

    this.state={
      parseResult:{
        name:"",
        group:"",
        type:"OTHER",
        url:""
      }
    };
  }

  async componentDidMount()
  {
    this.setState({parseResult:await runPageParser()});
  }

  // submit the current information to the database and close popup
  submitEntry():void
  {
    window.close();
  }

  render()
  {
    return <>
      <div className="input-zones">
        <InputZone fieldName="name" content={this.state.parseResult.name}/>
        <InputZone fieldName="group" content={this.state.parseResult.group}/>
        <InputZone fieldName="type" content={this.state.parseResult.type} notEditable={true}/>
      </div>

      <div className="confirm-zone" onClick={this.submitEntry}>
        <img src="/imgs/log-icon.png"/>
      </div>
    </>;
  }
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
  attachWindowFunctions();
}

window.onload=main;