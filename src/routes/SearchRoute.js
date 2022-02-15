// Dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Components
import SearchBar from '../components/SearchBar';
import Icon from '../components/Icon';
import FilterSelect from '../components/FilterSelect';

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

        <FiltersWrapper>

          <FiltersHeader>

            <Icon 
              iconFile='filters-icon.svg'
              iconAlt='Filters Icon'
              iconSize={{
                iconHeight: 24,
                iconWidth: 24,
              }}
            />
            <HeaderText>
              Filters
            </HeaderText>

          </FiltersHeader>

          <FiltersContent>
            <FiltersGrid>
              <FilterSelect 
                title='Type:'
                option='Movies'
              />              
            </FiltersGrid>
          </FiltersContent>

        </FiltersWrapper>

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

const FiltersGrid = styled.div `
  width: 100%;
  padding: 0px 10px; 
  grid-template-columns: 1fr;
  grid-template-rows: 40px;
  grid-row-gap: 10px;

  display: grid;
`;

const HeaderText = styled.span `  
  font-size: 18px;
  
  display: flex;
  align-items: center;
  color: #56595B;
`;

const SearchContent = styled.div `
  width: 100%;
  height: auto;
  background: #EFF1F3;
`;

const SearchHeader = styled.div `
  width: 100%;
  height: 100%;
  padding-right: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FiltersContent = styled.div `
  width: auto;
  height: 100%;
`;

const FiltersHeader = styled.div `
  height: 100%;
  width: 100%;
  column-gap: 12px;
  padding-left: 10px;

  display: flex;
  align-items: center;
`;

const SearchWrapper = styled.div `
  width: 100%;
  height: 650px;
  row-gap: 28px;
  grid-template-rows: 50px 1fr;

  display: grid;
`;

const FiltersWrapper = styled.div `
  width: 100%;
  height: 415px;
  row-gap: 28px;
  grid-template-rows: 50px 1fr;

  display: grid;
`;

const MainWrapper = styled.div `
  width: 100%;
  max-width: 1300px;
  column-gap: 35px;
  grid-template-columns: 200px 1fr;
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