// Dependencies
import React from 'react'
import styled from 'styled-components'

// Components
import Icon from '../components/Icon';
import FilterSelect from './FilterSelect'
import { DROPDOWNS } from '../constants';

export default function FiltersSection({filters, setFilters}) {

  // handle filter update
  const handleFilterUpdate = ({filterKey, selectedOption}) => {
    let filtersCopy = filters; 
    filtersCopy[filterKey] = selectedOption;

    setFilters({
      type: filtersCopy.type, 
      order: filtersCopy.order, 
      sort: filtersCopy.sort, 
      genre: filtersCopy.genre,
    })
  }

  let filtersData = [
    {
      key: 'type',
      title: 'Type:',
      option: filters.type,
      options: DROPDOWNS.filterTypeDropdown,
    }, 
    {
      key: 'order',
      title: 'Order By:',
      option: filters.order,
      options: DROPDOWNS.filterOrderDropdown,
    },
    {
      key: 'sort',
      title: 'Sort By:',
      option: filters.sort,
      options: DROPDOWNS.filterSortDropdown,
    },
  ]

  const renderFilters = () => {
    return filtersData?.map((f, i) => (
      <FilterSelect 
        key={i}
        filterKey={f.key}
        filterIndex={i}
        title={f.title}
        option={f.option}
        options={f.options}
        setOption={handleFilterUpdate}
      />  
    ))
  }

  return (
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
          {renderFilters()}  
        </FiltersGrid>
      </FiltersContent>

    </FiltersWrapper>
  )
}


const FiltersGrid = styled.div `
  width: 100%;
  padding: 0px 10px; 
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 14px;

  display: grid;
`;

const HeaderText = styled.span `  
  font-size: 18px;
  
  display: flex;
  align-items: center;
  color: #56595B;
`;

const FiltersContent = styled.div `
  width: 100%;
  height: fit-content;
`;

const FiltersHeader = styled.div `
  height: 50px;
  width: 100%;
  column-gap: 12px;
  padding-left: 10px;

  display: flex;
  align-items: center;
`;

const FiltersWrapper = styled.div `
  width: 100%;
  row-gap: 28px;
  padding-bottom: 20px;
  
  height: fit-content;
  display: flex;
  flex-direction: column;
`;