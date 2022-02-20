// Dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Components
import SearchBar from '../components/SearchBar';
import FiltersSection from '../components/FiltersSection';
import SimilarKeywordsSection from '../components/SimilarKeywordsSection';

export default function SearchRoute () {
  
  // Component States
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('movies');

  // Component Variables
  const navigate = useNavigate();
  const {search} = useLocation();

  const query = new URLSearchParams(search);

  let queryParam = query.get('query');
  let typeParam =  query.get('type');

  if (!queryParam || queryParam.length < 1) {
    navigate('/');
  } 

  if (typeParam !== 'movies' && typeParam !== 'shows') {
    typeParam = 'movies'
  }

  // Component Functions
  const udpateSearchType = () => setSearchType(typeParam);
  const updateSearchTerm = () => setSearchTerm(decodeURI(queryParam));

  // Component UseEffect Hook
  useEffect(() => {
    updateSearchTerm()
    udpateSearchType()
  }, [])

  return (
    <OuterWrapper>
      <MainWrapper>

        <Navbar>
          <FiltersSection />
          <SimilarKeywordsSection />
        </Navbar>

        <SearchWrapper>
          <SearchHeader>
            <SearchBar
                isInputOnFocus={true}
                isDropdownActive={false}
                query={decodeURI(queryParam)}
                type={searchType === 'movies' ? 0 : 1}
            />  
          </SearchHeader>
          <SearchContent>
            
          </SearchContent>
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

const SearchContent = styled.div `
  width: 100%;
  height: auto;
  background: #EFF1F3;
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