import {DateTime} from "luxon";

/** date format for log viewer page date column */
export function logrowDateformat(date:string):string
{
    return DateTime.fromJSDate(new Date(date)).toFormat("yyyy/MM/dd HH:mm");
}