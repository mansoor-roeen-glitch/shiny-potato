// Dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Components
import FiltersSection from '../components/FiltersSection';
import SimilarKeywordsSection from '../components/SimilarKeywordsSection';
import { getSearchResult, initializeFilters } from '../functions/extra';
import GridTypeA from '../components/GridTypeA';
import NavSearchBar from '../components/NavSearchBar';

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
  let queryType = getQueryTypeIndex(query.get('type'));

  // Component States
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [searchType, setSearchType] = useState(queryType);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadedPages, setLoadedPages] = useState(0);
  const [filteredResults, setFilteredResults] = useState([])
  const [filters, setFilters] = useState(initializeFilters({searchType}))

  // Component Loading, Error
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // handle content render
  const handleContentRender = () => {
    if (loading) {return null}
    return <GridTypeA gridData={searchResults} type={searchType} query={searchTerm} />
  }

  // this function will filter the results
  const filterResults = () => {

  }

  // updates search term when function is called by input
  const handleInputChange = (input) => {
    setSearchTerm(input)
  }

  // Searching for query and then updating search list
  const handleSearchResults = async () => {
    const response = await getSearchResult({
      searchTerm,
      searchType,
    })

    if (response.success) {
      setSearchResults(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoadedPages(response.data.page);
    } 

    else {
      setError(response.error_message);
      console.log("Something went wrong!");
    }

    setLoading(false)

  }

  // this function will run before everything else
  // this function would update search term, search type, and search results
  // an empty array has been passed to make sure the function is not repeated
  useEffect(() => {
    handleSearchResults()
  }, [search, searchType])

  return (
    <OuterWrapper>
      <MainWrapper>

        <Navbar>
          <FiltersSection
            filters={filters}
            setFilters={setFilters}
          />
          <SimilarKeywordsSection />
        </Navbar>

        <SearchWrapper>
          <SearchHeader>
            <NavSearchBar 
              query={decodeURI(searchTerm)}
              setQuery={handleInputChange}
              type={searchType}
            />    
          </SearchHeader>
          
          <Content>
            {handleContentRender()}
          </Content>

        </SearchWrapper>

      </MainWrapper>
    </OuterWrapper>
  );

}

const Navbar = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 10px;
`;

const Content = styled.div `
  width: 100%;
  height: auto;
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

  display: flex;
  justify-content: center;
`;