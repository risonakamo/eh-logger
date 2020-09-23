// add entry to the database
export async function insertLogEntry(entry:LogEntry):Promise<void>
{
    return new Promise(async (resolve)=>{
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
export async function getLogEntries():Promise<LogEntry[]>
{
    return new Promise((resolve)=>{
        chrome.storage.local.get("logEntries",(storage:EhLoggerLocalStorage)=>{
            resolve(storage.logEntries||[]);
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