// add entry to the database
export async function insertLogEntry(entry:LogEntry):Promise<void>
{
    return new Promise((resolve)=>{
        chrome.storage.local.get("logEntries",(storage:EhLoggerLocalStorage)=>{
            var entries:LogEntry[]=storage.logEntries||[];

            entries.push(entry);

            chrome.storage.local.set({
                logEntries:entries
            },()=>{
                resolve();
            });
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