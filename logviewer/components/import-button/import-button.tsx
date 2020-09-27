import React,{useRef} from "react";

import ColumnButton from "../column-button/column-button";
import {addMultipleWithMerge} from "../../../database/logger-database";

import "./import-button.less";

interface ImportButtonProps
{
  //callback to call when new entries are imported. returns the new entries.
  importedLogs(logs:LogEntry[]):void
}

export default function ImportButton(props:ImportButtonProps):JSX.Element
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
    props.importedLogs(await addMultipleWithMerge(
      await readJsonFromFileInput<LogEntry[]>(fileInput.current!.files![0])));
  }

  return <>
    <ColumnButton onClick={openFileInput} text="Import Logs" icon="/imgs/importicon2.png"/>
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