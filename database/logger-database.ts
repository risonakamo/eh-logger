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