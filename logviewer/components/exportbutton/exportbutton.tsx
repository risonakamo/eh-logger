import React from "react";

import {getLogEntries} from "../../../database/logger-database";

import "./exportbutton.less";

export default function ExportButton()
{
  return <a href="" onClick={doExport} className="export-button">Export Logs</a>;
}

// initiate logs download.
async function doExport(e:React.MouseEvent):Promise<void>
{
  e.preventDefault();

  chrome.downloads.download({
    url:"data:application/json;base64,"+btoa(unescape(encodeURIComponent(await logEntriesFormatted()))),
    filename:"logs.json"
  });
}

// return formatted json of the log entries, sorted by time order.
async function logEntriesFormatted():Promise<string>
{
  var entries:LogEntry[]=await getLogEntries();

  entries.sort(logEntrySort);

  return JSON.stringify(entries,null,4);
}

// use to sort logentries in time descending (newest to oldest)
function logEntrySort(a:LogEntry,b:LogEntry):number
{
  var adate:Date=new Date(a.date);
  var bdate:Date=new Date(b.date);

  if (adate>bdate)
  {
    return -1;
  }

  else if (adate<bdate)
  {
    return 1;
  }

  return 0;
}