import React,{useState,useRef} from "react";
import cx from "classnames";

import {logrowDateformat} from "lib/log-row-helpers";

const _deleteTiming:number=1550; //time user show hold to perform delete action (ms)

interface LogsRowProps
{
  entry:LogEntry // the entry

  // display as a group subentry
  groupSubEntry?:boolean

  holdCompleted(entry:LogEntry):void // function to call with the row's entry when hold
                                     // action is completed on the row
}

export default function LogRow2(props:LogsRowProps):JSX.Element
{
  const [holding,setHolding]=useState<boolean>(false); // holding in progress
  const holdTimer=useRef<number>();
  const preventNav=useRef<boolean>(false);

  // begin the hold timer
  function beginHoldTimer():void
  {
    clearTimeout(holdTimer.current);
    holdTimer.current=window.setTimeout(()=>{
      setHolding((gotHolding:boolean)=>{
        if (!gotHolding)
        {
          return false;
        }

        props.holdCompleted(props.entry);
        preventNav.current=true;
        return false;
      });
    },_deleteTiming);
    setHolding(true);
  }

  // end the hold timer
  function endHoldTimer():void
  {
    if (holding)
    {
      clearTimeout(holdTimer.current);
      preventNav.current=false;
      setHolding(false);
    }
  }

  // prevent navigation after a hold event completed
  function linkClick(e:React.MouseEvent):void
  {
    e.preventDefault();

    if (preventNav.current)
    {
      return;
    }

    if (e.ctrlKey)
    {
      window.location.href=props.entry.link;
      return;
    }

    chrome.tabs.create({
      active:false,
      url:props.entry.link
    });
  }

  const dateText:string=logrowDateformat(props.entry.date);
  const holdingClass:string=holding?"filling":"";

  var groupCol:JSX.Element|undefined;
  if (!props.groupSubEntry)
  {
    groupCol=<div className="log-col group" title={props.entry.group}>{props.entry.group}</div>;
  }

  const topclass={
    "sub-entry":props.groupSubEntry
  };

  return <a className={cx("log-row",props.entry.type,topclass)} href={props.entry.link}
    onMouseDown={beginHoldTimer} onMouseUp={endHoldTimer} onMouseLeave={endHoldTimer} onClick={linkClick}
    onDragLeave={endHoldTimer} onMouseOut={endHoldTimer}
  >
    <div className={`fill-bar ${holdingClass}`}></div>
    <div className="log-col date">{dateText}</div>
    <div className="log-col type">{getAbbrvType(props.entry.type)}</div>
    {groupCol}
    <div className="log-col name" title={props.entry.name}>{props.entry.name}</div>
  </a>;
}

const abbrvType:Record<EntryType,string>={
  NHENTAI:"NH",
  OTHER:"??",
  SANKAKU:"SC",
  IMGUR:"IM",
  DLSITE:"DL",
  HITOMI:"HI",
  PIXIV:"PX",
  EXHENTAI:"EX",
  BETASANKAKU:"BS",
  ANIMELIST:"AL"
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