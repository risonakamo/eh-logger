// attempt to run the correct page parser on the current tab. returns a PageParseResult
// in a promise
export default function runPageParser():Promise<PageParseResultWithType>
{
    return new Promise<PageParseResultWithType>((resolve)=>{
        chrome.tabs.query({active:true,currentWindow:true},(tabs:chrome.tabs.Tab[])=>{
            var taburl:string;
            if (!tabs.length || !tabs[0].url)
            {
                taburl="";
            }

            else
            {
                taburl=tabs[0].url;
            }

            var {type:tabtype,parser:targetPageParser}=getTargetParser(taburl);

            if (tabtype=="OTHER")
            {
                resolve({
                    name:"",
                    group:"",
                    type:"OTHER",
                    url:taburl
                });
                return;
            }

            chrome.tabs.executeScript({file:targetPageParser},(res:(PageParseResult|null)[]|undefined)=>{
                var actualres:PageParseResult;

                if (res && res[0])
                {
                    actualres=res[0];
                }

                else
                {
                    actualres={
                        name:"",
                        group:""
                    };
                }

                resolve({
                    name:actualres.name,
                    group:actualres.group,
                    type:tabtype,
                    url:taburl
                });
            });
        });
    });
}

// given a string, return a page parser script url and the type
function getTargetParser(url:string):TargetParser
{
    var type:EntryType=getUrlType(url);
    var parser:string;

    switch (type)
    {
        case "SANKAKU":
        parser="sanparser";
        break;

        case "PIXIV":
        parser="pixparser";
        break;

        case "BETASANKAKU":
        parser="betasanparser";
        type="SANKAKU";
        break;

        case "NHENTAI":
        parser="nhparser";
        break;

        case "IMGUR":
        parser="imgurparser";
        break;

        case "HITOMI":
        parser="hitomiparser";
        break;

        case "DLSITE":
        parser="dlparser";
        break;

        case "EXHENTAI":
        parser="exhparser";
        break;

        case "ANIMELIST":
        parser="alistparser";
        break;

        case "IWARA":
        parser="iwaraparser";
        break;

        case "STEAM":
        parser="steamparser";
        break;

        default:
        parser="";
    }

    return {
        type,
        parser:`web/lib/pageparsers/${parser}.js`
    };
}

// give a url to return a type
function getUrlType(url:string):EntryType
{
    if (url.search(/chan\.sankakucomplex\.com\/\?tags/)>=0)
    {
        return "SANKAKU";
    }

    else if (url.search(/pixiv\.net\/users/)>=0)
    {
        return "PIXIV";
    }

    else if (url.search(/beta\.sankakucomplex\.com\/\?tags/)>=0)
    {
        return "BETASANKAKU";
    }

    else if (url.search(/nhentai\.net\/g/)>=0)
    {
        return "NHENTAI";
    }

    else if (url.search(/imgur\.com\/a/)>=0)
    {
        return "IMGUR";
    }

    else if (url.search(/hitomi\.la\/(doujinshi|cg|gamecg)/)>=0)
    {
        return "HITOMI";
    }

    else if (url.search(/dlsite\.com\/maniax\/work/)>=0)
    {
        return "DLSITE";
    }

    else if (url.search(/exhentai\.org\/g/)>=0)
    {
        return "EXHENTAI";
    }

    else if (url.search(/myanimelist\.net\/anime/)>=0)
    {
        return "ANIMELIST";
    }

    else if (
        url.search(/ecchi\.iwara\.tv\/videos/)>=0
        || url.search(/iwara\.tv\/video/)>=0
    )
    {
        return "IWARA";
    }

    else if (url.search(/steamdb\.info\/app/)>=0)
    {
        return "STEAM";
    }

    return "OTHER";
}