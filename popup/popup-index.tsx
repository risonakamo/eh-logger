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

  nameField:React.RefObject<InputZone>
  groupField:React.RefObject<InputZone>
  typeField:React.RefObject<InputZone>

  constructor(props:any)
  {
    super(props);
    this.submitEntry=this.submitEntry.bind(this);

    this.state={
      parseResult:{
        name:"",
        group:"",
        type:"OTHER",
        url:""
      }
    };

    this.nameField=React.createRef();
    this.groupField=React.createRef();
    this.typeField=React.createRef();
  }

  async componentDidMount()
  {
    this.setState({parseResult:await runPageParser()});
  }

  // submit the current information to the database and close popup
  submitEntry():void
  {
    console.log({
      name:this.nameField.current!.getValue(),
      group:this.groupField.current!.getValue(),
      type:this.typeField.current!.getValue()
    });

    // window.close();
  }

  render()
  {
    return <>
      <div className="input-zones">
        <InputZone fieldName="name" content={this.state.parseResult.name} ref={this.nameField}/>
        <InputZone fieldName="group" content={this.state.parseResult.group} ref={this.groupField}/>
        <InputZone fieldName="type" content={this.state.parseResult.type} notEditable={true} ref={this.typeField}/>
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