// Dependencies
import { API_XTOKEN, DROPDOWNS } from "../constants"
import fetch from "./fetch"

export function initializeFilters ({searchType}) {
    return {
        type: searchType,
        order: 0,
        sort: 0,
        genre: 0,
    }
}

export async function getSearchResult ({searchTerm, searchType}) {
    // search type in plain text
    let st = searchType === 0 ? 'movie' : 'tv';
 
    return fetch({
        accessKey: API_XTOKEN,
        endpoint: `/search/${st}`,
        queries: [{ name: 'query', value: searchTerm }],
    })
}