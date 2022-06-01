// Dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Components
import FiltersSection from '../components/filter/FiltersSection';
import { getSearchResult } from '../functions/extra';
import {initializeFilters, sortArray} from '../functions/sort'
import GridTypeA from '../components/grid/GridTypeA';
import NavSearchBar from '../components/navbar/NavSearchBar';
import { DROPDOWNS } from '../constants';
import Icon from '../components/utilities/Icon';
import DisplayCard from '../components/card/DetailsDisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchLoading, updateSearchError } from '../slicers/stateSlicer';

export default function SearchRoute () {

  // Component Variables
  const navigate = useNavigate();
  const {search} = useLocation();
    
  const query = new URLSearchParams(search);
  let queryParam = query.get('query');
  
  // Send user to '/' if nothing has been searched for
  if (!queryParam || queryParam.length < 1) {
    navigate('/');
  } 
  
  let getQueryTypeIndex = (type) => type === 'show' ? 1 : 0;
  let getQueryTypeName = (index) => index === 1 ? 'show' : 'movie';
  let queryType = getQueryTypeIndex(query.get('type'));

  // Component States
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [searchType, setSearchType] = useState(queryType);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false)
  const [filteredResults, setFilteredResults] = useState([])
  const [filters, setFilters] = useState(initializeFilters({searchType}))
  const [selectedItem, setSelectedItem] = useState({});
  const [similarKeywords, setSimilarKeywords] = useState({
    loading: true,
    error: false,
    results: [],
  });

  // Component Loading, Error
  const appState = useSelector(state => state.state);
  const dispatch = useDispatch();

  // handle content render
  const handleContentRender = () => {
    if (appState.searchLoading) {return null}
    return <GridTypeA gridData={searchResults} type={searchType} query={searchTerm} setSelectedItem={setSelectedItem} />
  }

  // this function will filter the results
  const filterResults = (results) => {
    let searchResultsCopy = results ? [...results] : [...searchResults]; 
    if (searchResultsCopy.length < 1) return null;

    // this if statements checks if search type has changed or not
    // if has changed, get the new list of results
    if (filters.type !== searchType) {
      dispatch(updateSearchLoading((true))) 
      setSearchType(filters.type)
    };

    // setting sort by
    // order decides which way to start from
    // scenario:- if order is 'decending' then we start from the top results and viceversa
    let order_by = filters.order === 0 ? -1 : 1;
    let sort_by = DROPDOWNS.filterSortDropdown[filters.sort].toLowerCase();

    // add parsed release date to all results
    searchResultsCopy.map((result, index) => {
      let resultReleaseDate = result?.release_date; 
      searchResultsCopy[index].parsedReleaseDate = !resultReleaseDate ? 0 : parseInt(resultReleaseDate.split('-').join(''));
    })

    // sort search resutls copy array
    let sortedArray = sortArray({array: searchResultsCopy, sortBy: sort_by, order: order_by, type: searchType});

    // check if sorted array is not the same as the current array; 
    if (sortedArray !== filteredResults) setSearchResults(sortedArray);

  }

  // updates search term when function is called by input
  const handleInputChange = (input) => {
    setSearchTerm(input)
  }

  const handleSearchKeywords = async () => {
    const response = await getSearchResult({
      searchTerm,
      keywords: true, 
      page: 1,
    })

    if (response.success) {
      setSimilarKeywords({
        loading: false,
        error: false,
        results: response.data.results,
      })

      return null;
    }

    setSimilarKeywords({
      loading: false,
      error: true,
      results: response.data.results,
    })
  }

  // Searching for query and then updating search list
  const handleSearchResults = async () => {
    const response = await getSearchResult({
      searchTerm,
      searchType,
    })

    if (response.success) {
      handleSearchKeywords()
      setSearchResults(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoadedPages(response.data.page);
      setLoadingPage(false)
    } 

    else {
      dispatch(updateSearchError(response.error_message))
      console.log("Something went wrong!");
    }

    // no longer loading
    dispatch(updateSearchLoading(response.error_message))

  }

  // this function wil handle loading new pages
  const handleLoadMore = async () => {

    if (totalPages <= loadedPages) {setLoadingPage(false); return null}

    const response = await getSearchResult({
      searchTerm, 
      searchType, 
      page: loadedPages + 1
    })

    if (response.success) {
      let currentResults = [...searchResults];
      response.data.results.forEach(i => currentResults.push(i));

      setSearchResults(currentResults);
      setLoadedPages(response.data.page);
      filterResults(currentResults);
      setTimeout(() => {
        setLoadingPage(false);
        dispatch(updateSearchLoading((false)));
      }, 1500);
    } 

    else {
      dispatch(updateSearchError(response.error_message))
      console.log("Something went wrong!");
    }
  }

  // change the type 
  const handleTypeChange = () => {
    let newSearchType = DROPDOWNS.filterTypeDropdown[searchType].toLowerCase();
    navigate(`/search?query=${searchTerm}&type=${newSearchType}`)
  }

  // run when page has been scrolled 
  const handlePageScroll = (event) => {

    if (loadingPage) return null;

    let documentEl = event.target.documentElement;
    let scrollHeight = documentEl.scrollHeight; 
    let scrollTop = documentEl.scrollTop;
    let clientHeight = documentEl.clientHeight;

    if (scrollHeight - scrollTop === clientHeight) {
      setLoadingPage(true)
    }

  }

  // this function will run before everything else
  // this function would update search term, and search results
  // an empty array has been passed to make sure the function is not repeated
  useEffect(() => {
    dispatch(updateSearchLoading(true))
    setFilters(initializeFilters({searchType}))
    handleSearchResults()
  }, [search])

  // on type change, redirect to new url
  useEffect(() => {
    dispatch(updateSearchLoading(true))
    handleTypeChange()
  }, [searchType])

  // when filter changes then run this this function
  useEffect(() => {
    if (filters !== initializeFilters({searchType})) filterResults();
  }, [filters])

  useEffect(() => {
    if (!loadingPage) return;
    handleLoadMore();
  }, [loadingPage]);

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem])
  
  // check scroll position, if bottom then load more
  document.addEventListener('scroll', handlePageScroll);

  return (
    <OuterWrapper className={Object.keys(selectedItem).length > 0 ? 'pt-scroll' : ''}>

      <DisplayCard
        selectedItem={selectedItem}
        itemType={getQueryTypeName(searchType)}
        setSelectedItem={setSelectedItem}
      />

      <MainWrapper>

        <Navbar>
          <FiltersSection
            filters={filters}
            setFilters={setFilters}
          />
          {/* <SimilarKeywordsSection 
            similarKeywords={similarKeywords}
          /> */}
        </Navbar>

        <SearchWrapper>
          <SearchHeader>
            <NavSearchBar 
              query={decodeURI(searchTerm)}
              setQuery={handleInputChange}
              type={searchType}
            />    
          </SearchHeader>
          
          <Content className={Object.keys(selectedItem).length > 0 ? 'pt-scroll' : ''}>
            {appState.searchLoading ? ((
              <LoaderWrapper>
              <Loader>
                <Icon 
                  iconSize={{iconWidth: 50, iconHeight: 50}}
                  iconFile='loading-icon.svg'
                  iconAlt='Loading results'
                />
              </Loader>
              </LoaderWrapper>
            )) : (handleContentRender())}

            {loadingPage && totalPages > loadedPages  ? ((
              <LoaderWrapper>
              <Loader>
                <Icon 
                  iconSize={{iconWidth: 30, iconHeight: 30}}
                  iconFile='loading-icon.svg'
                  iconAlt='Loading results'
                />
              </Loader>
              </LoaderWrapper>
            )) : null}
          </Content>

        </SearchWrapper>

      </MainWrapper>
    </OuterWrapper>
  );

}

const Loader = styled.div `

`;

const LoaderWrapper = styled.div `
  width: 70%; 
  height: 150px;

  display: flex;
  align-items: center; 
  justify-content: center;
`;

const Navbar = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 10px;
`;

const Content = styled.div `
  width: 100%;
  padding-bottom: 35;
  min-height: calc(100vh - 113px);

  height: auto;
  display: flex;
  flex-direction: column; 

  .pt-scroll {
    overflow: hidden;
  }
`;

const SearchHeader = styled.div `
  width: 100%;
  height: 100%;
  padding-right: 230px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.div `
  width: 100%;
  height: 650px;
  row-gap: 28px;
  grid-template-rows: 50px 1fr;

  display: grid;
`;

const MainWrapper = styled.div `
  width: 100%;
  max-width: 1300px;
  column-gap: 35px;
  grid-template-columns: 230px 1fr;
  padding-top: 35px;

  display: grid;
  height: fit-content;
`;

const OuterWrapper = styled.div `
  width: 100%;
  height: 100%;
  z-index: 1;

  display: flex;
  justify-content: center;

  .pt-scroll {
    overflow: hidden;
  }
`;