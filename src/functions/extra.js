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

export function sortArray ({array, sortBy, order, type}) {

    const sortByTitleAndName = () => {
        let ascending = array.sort((a, b) => a[type === 0 ? 'title' : 'name'].localeCompare(b[type === 0 ? 'title' : 'name']));
        let descending = ascending.slice().reverse();

        if (order === 1) return ascending; 
        else return descending; 
    }

    const sortByPopularity = () => {
        let ascending = array.sort((a, b) => a.popularity - b.popularity); 
        let descending = ascending.slice().reverse();

        if (order === 1) return ascending; 
        else return descending; 
    }
    
    const sortByRating = () => {
        let ascending = array.sort((a, b) => {
            let aRating = a.vote_count + a.vote_average;
            let bRating = b.vote_count + b.vote_average
            return aRating - bRating})  

        let descending = ascending.slice().reverse();
        
        if (order === 1) return ascending; 
        else return descending; 
    } 

    const sortByDate = () => {
        let ascending = array.sort((a, b) => a.parsedReleaseDate - b.parsedReleaseDate); 
        let descending = ascending.slice().reverse();

        if (order === 1) return ascending; 
        else return descending; 
    }

    switch(sortBy) {
        case 'title':
            return sortByTitleAndName();

        case 'popularity':
            return sortByPopularity();

        case 'rating':
            return sortByRating();

        case 'date': 
            return sortByDate();

        default: 
            return array
    }
} 