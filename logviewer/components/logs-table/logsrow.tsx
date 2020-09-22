import React from "react";

interface LogsRowProps
{
  entry:LogEntry
}

export default function LogsRow(props:LogsRowProps):JSX.Element
{
  return <tr className={props.entry.type}>
    <td className="date">09/21 00:36</td>
    <td className="type">{getAbbrvType(props.entry.type)}</td>
    <td className="group">{props.entry.group}</td>
    <td className="name">{props.entry.name}</td>
  </tr>;
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