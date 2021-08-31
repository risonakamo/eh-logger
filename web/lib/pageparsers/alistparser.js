(()=>{
    function getGroup()
    {
        var darkTextNodes=document.querySelectorAll("span.dark_text");

        var producersNode;
        for (var i=0;i<darkTextNodes.length;i++)
        {
            var x=darkTextNodes[i];

            if (x.textContent=="Producers:")
            {
                producersNode=x;
                break;
            }
        }

        if (!producersNode)
        {
            console.warn("could not find producers node");
            return "";
        }

        return producersNode.parentElement.children[1].textContent;
    }

    return {
        name:document.querySelector(".title-name").textContent,
        group:getGroup()
    };
})();