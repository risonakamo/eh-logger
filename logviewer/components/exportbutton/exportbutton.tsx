import React from "react";
import luxon from "luxon";

import {getLogEntries,logEntrySort} from "../../../database/logger-database";

import "./exportbutton.less";

export default function ExportButton():JSX.Element
{
  return <a href="" onClick={doExport} className="export-button">
    <div className="button-text">Export Logs</div>
    <img src="/imgs/export-icon.png"/>
  </a>;
}

// initiate logs download.
async function doExport(e:React.MouseEvent):Promise<void>
{
  e.preventDefault();

  var timestamp:string=luxon.DateTime.local().toFormat("yyMMdd_HHmm");

  chrome.downloads.download({
    url:"data:application/json;base64,"+btoa(unescape(encodeURIComponent(await logEntriesFormatted()))),
    filename:`${timestamp}-eh-logs.json`
  });
}

// return formatted json of the log entries, sorted by time order.
async function logEntriesFormatted():Promise<string>
{
  var entries:LogEntry[]=await getLogEntries();

  entries.sort(logEntrySort);

  return JSON.stringify(entries,null,4);
}