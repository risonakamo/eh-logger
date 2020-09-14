type EntryType="NHENTAI"|"OTHER"|"SANKAKU"|"IMGUR"|"DLSITE"|"HITOMI"|
    "PIXIV"|"EXHENTAI"|"BETASANKAKU";

interface TargetParser
{
    parser:string
    type:EntryType
}

// return data from a page parser script
interface PageParseResult
{
    name:string
    group:string
}

// enhanced result from main page parser runner
interface PageParseResultWithType extends PageParseResult
{
    type:EntryType
    url:string
}