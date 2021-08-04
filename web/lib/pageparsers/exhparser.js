(()=>{
    var taglist=document.querySelectorAll("#taglist tbody tr");

    var foundTagList=Array.from(taglist).find((x)=>{
        var category=x.firstChild.textContent.replace(":","");
        return category=="group"||category=="artist";
    });

    return {
        name:document.querySelector("#gn").textContent,
        group:foundTagList.querySelector("div").textContent
    };
})();