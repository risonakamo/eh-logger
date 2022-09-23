(()=>{
    const name=document.querySelector(".d-flex h1").innerText;

    // capture info table
    const infoTable=document.querySelector(".span8 tbody").children;

    // loop through all table items until found a row that has a title "developer". use the value
    // of that row as the group name.
    var groupName="unknown";
    for (var i=0;i<infoTable.length;i++)
    {
        const tableItem=infoTable[i];
        const rowName=tableItem.children[0].innerText;
        const rowValue=tableItem.children[1].innerText;

        if (rowName=="Developer")
        {
            groupName=rowValue;
            break;
        }
    }

    return {
        name,
        group:groupName
    };
})();