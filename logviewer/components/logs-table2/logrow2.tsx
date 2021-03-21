import React,{useState,useRef} from "react";
import luxon from "luxon";

const _deleteTiming:number=1550; //time user show hold to perform delete action (ms)

interface LogsRowProps
{
  entry:LogEntry // the entry
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
    holdTimer.current=setTimeout(()=>{
      props.holdCompleted(props.entry);
      preventNav.current=true;
      setHolding(false);
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
    if (preventNav.current)
    {
      e.preventDefault();
    }
  }

  const dateText:string=luxon.DateTime.fromJSDate(new Date(props.entry.date)).toFormat("MM/dd HH:mm");
  const holdingClass:string=holding?"filling":"";

  return <a className={`log-row ${props.entry.type}`} href={props.entry.link} onMouseDown={beginHoldTimer}
    onMouseUp={endHoldTimer} onMouseLeave={endHoldTimer} onClick={linkClick} onDragLeave={endHoldTimer}
    onMouseOut={endHoldTimer}
  >
    <div className={`fill-bar ${holdingClass}`}></div>
    <div className="log-col date">{dateText}</div>
    <div className="log-col type">{getAbbrvType(props.entry.type)}</div>
    <div className="log-col group" title={props.entry.group}>{props.entry.group}</div>
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