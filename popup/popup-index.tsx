import React from "react";
import ReactDOM from "react-dom";

import InputZone from "./components/inputzone/inputzone";
import ConfirmButton from "./components/confirm-button/confirmbutton";
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
  async submitEntry():Promise<void>
  {
    await insertLogEntry({
      name:this.nameField.current!.getValue().trim(),
      group:this.groupField.current!.getValue().trim(),
      type:this.state.parseResult.type,
      link:this.state.parseResult.url,
      date:new Date().toLocaleString("ja-JP")
    });

    window.close();
  }

  render()
  {
    return <>
      <div className="input-zones">
        <InputZone fieldName="name" content={this.state.parseResult.name}
          ref={this.nameField} inputBoxClass={this.state.parseResult.type}/>
        <InputZone fieldName="group" content={this.state.parseResult.group}
          ref={this.groupField} inputBoxClass={this.state.parseResult.type}/>
        <InputZone fieldName="type" content={this.state.parseResult.type} notEditable={true}
          ref={this.typeField} inputBoxClass={this.state.parseResult.type}/>
      </div>

      <ConfirmButton onClick={this.submitEntry}/>
    </>;
  }
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
  attachWindowFunctions();
}

window.onload=main;