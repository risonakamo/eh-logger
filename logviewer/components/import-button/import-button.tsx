import React,{useRef} from "react";

import ColumnButton from "../column-button/column-button";
import {addMultipleWithMerge} from "../../../database/logger-database";

import "./import-button.less";

export default function ImportButton():JSX.Element
{
  const fileInput=useRef<HTMLInputElement>(null);

  // click handler. open file input.
  function openFileInput(e:React.MouseEvent):void
  {
    e.preventDefault();
    (fileInput.current as any).value=null;
    fileInput.current!.click();
  }

  // file submitted handler.
  async function fileSubmitted():Promise<void>
  {
    addMultipleWithMerge(await readJsonFromFileInput<LogEntry[]>(fileInput.current!.files![0]));
  }

  return <>
    <ColumnButton onClick={openFileInput} text="Import Logs" icon="/imgs/export-icon.png"/>
    <input type="file" className="import-file-input" ref={fileInput} onChange={fileSubmitted}/>
  </>;
}

// given a file object from a file input's files array, return a promise
// with the json parsed readastext value
function readJsonFromFileInput<T>(fileobject:File):Promise<T>
{
  return new Promise<T>((resolve)=>{
    var reader=new FileReader();
    reader.onload=()=>{
      resolve(JSON.parse(reader.result as string));
    };

    reader.readAsText(fileobject);
  });
}