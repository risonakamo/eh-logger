import React from "react";
import luxon from "luxon";

interface LogsRowProps
{
  entry:LogEntry
}

export default function LogRow2(props:LogsRowProps):JSX.Element
{
  var dateText:string=luxon.DateTime.fromJSDate(new Date(props.entry.date)).toFormat("MM/dd HH:mm");

  return <a className={`log-row ${props.entry.type}`} href={props.entry.link}>
    <div className="log-col date">{dateText}</div>
    <div className="log-col type">{getAbbrvType(props.entry.type)}</div>
    <div className="log-col group" title={props.entry.group}>{props.entry.group}</div>
    <div className="log-col name" title={props.entry.name}>{props.entry.name}</div>
  </a>;
}

const abbrvType:Record<EntryType,string>={
  NHENTAI:"NH",
  OTHER:"??",
  SANKAKU:"SK",
  IMGUR:"IM",
  DLSITE:"DL",
  HITOMI:"HI",
  PIXIV:"PI",
  EXHENTAI:"EX",
  BETASANKAKU:"BS"
};

// given a type, return the abbreviated version
function getAbbrvType(type:EntryType):string
{
  if (type in abbrvType)
  {
    return abbrvType[type];
  }

  return abbrvType.OTHER;
}