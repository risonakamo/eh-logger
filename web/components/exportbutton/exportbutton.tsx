import React from "react";
import {DateTime} from "luxon";

import ColumnButton from "components/column-button/column-button";
import {getLogEntries,logEntrySort} from "lib/logger-database";

export default function ExportButton():JSX.Element
{
  return <ColumnButton onClick={doExport} text="Export Logs" icon="/assets/imgs/export-icon.png"/>;
}

// initiate logs download.
async function doExport(e:React.MouseEvent):Promise<void>
{
  e.preventDefault();

  var timestamp:string=DateTime.local().toFormat("yyMMdd_HHmm");

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