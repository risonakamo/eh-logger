import React from "react";

import "./exportbutton.less";

export default function ExportButton()
{
  return <a href="" onClick={doExport} className="export-button">Export Logs</a>;
}

// initiate logs download.
function doExport(e:React.MouseEvent):void
{
  e.preventDefault();

  console.log("bob");
}