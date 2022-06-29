how to add new page parser to handle new websites

# pageparser-types.d.ts
add to EntryType type a type for your page

# logrow2.tsx
add an abbreviation for your page type

# types-colours.less
add a colour for your type

# manifest.json
add a url rule permission that matches your target page

# parserrunner.ts
in the `getTargetParser()` function, add a case to handle the EntryType you had added earlier. have it return the name of your parser code, which you will add next

also, in the `getUrlType()` function, add a case to match a url and return your new EntryType. the url should look similar to what you added to manifest.json

# parser code
create your parser code as a js file in the folder web/lib/pageparsers. the name of your page parser code should match the name you returned in the `getTargetParser()` function in a previous step