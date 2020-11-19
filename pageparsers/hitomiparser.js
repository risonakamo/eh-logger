(()=>{
    var group=document.querySelector(".gallery h2").textContent.trim();

    if (group=="N/A")
    {
        group=document.querySelector(".comma-list").textContent.trim()
    }

    return {
        name:document.querySelector(".gallery h1").textContent,
        group
    };
})();