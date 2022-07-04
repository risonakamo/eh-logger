import _ from "lodash";

// add entry to the database
export async function insertLogEntry(entry:LogEntry):Promise<void>
{
    return new Promise<void>(async (resolve)=>{
        var entries:LogEntry[]=await getLogEntries();

        entries.push(entry);

        chrome.storage.local.set({
            logEntries:entries
        },()=>{
            resolve();
        });
    });
}

// return all log entries
export async function getLogEntries(sorted:boolean=false):Promise<LogEntry[]>
{
    return new Promise<LogEntry[]>((resolve)=>{
        chrome.storage.local.get("logEntries",(storage:EhLoggerLocalStorage)=>{
            if (!sorted)
            {
                resolve(storage.logEntries||[]);
            }

            else
            {
                resolve((storage.logEntries||[]).sort(logEntrySort));
            }
        });
    });
}

// given a log entry, remove from the database ALL COPIES of that entry.
// returns the new list of entries
export async function deleteEntry(entry:LogEntry):Promise<LogEntry[]>
{
    return new Promise<LogEntry[]>(async (resolve)=>{
        var entries:LogEntry[]=await getLogEntries();

        var newEntries:LogEntry[]=entries.filter((x:LogEntry)=>{
            return !(x.date==entry.date && x.link==entry.link);
        });

        chrome.storage.local.set({
            logEntries:newEntries
        },()=>{
            resolve(newEntries);
        });
    });
}

// add all given entries to the database, without duplicating. returns the new log entries
export async function addMultipleWithMerge(entries:LogEntry[]):Promise<LogEntry[]>
{
    return new Promise<LogEntry[]>(async (resolve)=>{
        var currentEntries:LogEntry[]=await getLogEntries();
        var mergedEntries:LogEntry[]=_.unionWith(entries,currentEntries,logEntryCompare);

        chrome.storage.local.set({
            logEntries:mergedEntries
        },()=>{
            resolve(mergedEntries);
        });
    });
}

// attach debug functions to the window
export function attachWindowFunctions():void
{
    (window as any).checkStorage=checkStorage;
    (window as any).clearStorage=clearStorage;
}

// use to sort logentries in time descending (newest to oldest)
export function logEntrySort(a:LogEntry,b:LogEntry):number
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

/** attempt to retrieve last saved input. might be null if there was no last input */
export async function getLastInputs():Promise<CachedEntryInput|null>
{
    return new Promise<CachedEntryInput|null>((resolve):void=>{
        chrome.storage.local.get("savedInput",(storage:EhLoggerLocalStorage):void=>{
            resolve(storage.savedInput || null);
        });
    });
}

/** override the last saved inputs with new saved inputs*/
export async function setLastInputs(lastInputs:CachedEntryInput):Promise<void>
{
    return new Promise<void>((resolve):void=>{
        chrome.storage.local.set({
            savedInput:lastInputs
        },()=>{
            resolve();
        });
    });
}

/** get alias for some target group realname */
export async function getGroupAlias(realname:string):Promise<string|null>
{
    const allaliases:GroupAliases=await getGroupAliases();

    if (realname in allaliases)
    {
        return allaliases[realname];
    }

    return null;
}

/** add a group alias */
export async function addGroupAlias(realname:string,alias:string):Promise<void>
{
    const groupalias:GroupAliases=await getGroupAliases();

    groupalias[realname]=alias;

    const localStorageUpdate:EhLoggerLocalStorage={
        groupAliases:groupalias
    };

    chrome.storage.local.set(localStorageUpdate);
}

// determine if 2 logs are the same
function logEntryCompare(a:LogEntry,b:LogEntry):boolean
{
    return a.date==b.date && a.link==b.link;
}

// print out the storage
function checkStorage():void
{
    chrome.storage.local.get(null,(storage:EhLoggerLocalStorage)=>{
        console.log(storage);
    });
}

// clear the storage
function clearStorage():void
{
    chrome.storage.local.clear();
}

/** get all group aliases */
async function getGroupAliases():Promise<GroupAliases>
{
    return new Promise<GroupAliases>((resolve):void=>{
        chrome.storage.local.get("groupAliases",(storage:EhLoggerLocalStorage):void=>{
            resolve(storage.groupAliases || {});
        });
    });
}