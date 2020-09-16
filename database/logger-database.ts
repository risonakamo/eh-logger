// add entry to the database
export function insertLogEntry(entry:LogEntry):void
{
    chrome.storage.local.get("logEntries",(storage:EhLoggerLocalStorage)=>{
        var entries:LogEntry[]=storage.logEntries||[];

        entries.push(entry);

        chrome.storage.local.set({
            logEntries:entries
        });
    });
}

// attach debug functions to the window
export function attachWindowFunctions():void
{
    (window as any).checkStorage=checkStorage;
}

// print out the storage
function checkStorage():void
{
    chrome.storage.local.get(null,(storage:EhLoggerLocalStorage)=>{
        console.log(storage);
    });
}