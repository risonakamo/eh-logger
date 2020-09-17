declare namespace chrome.storage
{
    // modifiying storage get to allow custom storage definition
    class LocalStorageArea
    {
        get<T>(
            target:string|null,
            callback:(items:T)=>void
        ):void
    }
}