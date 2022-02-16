// Dependencies
import styled from 'styled-components';
import React, {useState} from 'react'
import { COLORS, FILTERS } from '../constants'
import Icon from './Icon';

export default function FilterSelect({title, options, option}) {
  
	// Component States
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  // Function to toggle the state of the dropdown
  const handleDropdownToggle = () => setIsDropdownActive(!isDropdownActive);

  // Function to hide the dropdown when clicked outside the container
  const handleBlur = (event) => {
    if (event.target.localName === 'Button') {
      return null; 
    }

    setIsDropdownActive(false);
  };


  return (

    <MainWrapper>  
      <TitleWrapper>
        <Title>
          {title}
        </Title>
      </TitleWrapper>
      <ButtonWrapper onBlur={handleBlur}>
        <Button onClick={handleDropdownToggle} isDropdownActive={isDropdownActive}>
          <ButtonText>
            {option}
          </ButtonText>
          <ButtonIcon>
            <Icon 
              iconFile='arrow-down-icon.svg'
              iconAlt='Selector Button Icon'
              iconSize={{
                iconWidth: 10,
                iconHeight: 10,
              }}
            />
          </ButtonIcon>
        </Button>
        <Selecter backgroundColor={COLORS.backgroundColorTypeB} dropshadow={FILTERS.primaryBoxshadow} isDropdownActive={isDropdownActive}>
          <SelectorOption onClick={() => {console.log('click happened')}}>
            <SelectorOptionText>Shows</SelectorOptionText>
          </SelectorOption>	
          <SelectorOption>
            <SelectorOptionText>Shows</SelectorOptionText>
          </SelectorOption>	
        </Selecter>
      </ButtonWrapper>
    </MainWrapper>

  )
}

const SelectorOptionText = styled.span `
	font-size: 14px;

	text-align: center;
	color: #5A5E62;
`;

const SelectorOption = styled.button `
	width: 100%;
	height: 32px;
	padding: 0px 8px;
	
	display: flex;
	align-items: center;
	cursor: pointer;
	background: transparent;
	outline: none;
	border:none;

	&:hover {
		background: #dfe3e7;
	}

`;

const Selecter = styled.div `
	background: ${props => props.backgroundColor};
	border: none;
	position: absolute;
	height: fit-content;
	list-style: none;
	display: ${props => props.isDropdownActive ? 'initial' : 'none'};
  box-shadow: 0px 0px 2px 0px #bacbd3;

  width: calc(100% - 2px);
  top: calc(100% + 4px);
	padding: 8px;
	z-index: 999;
`;

const ButtonIcon = styled.div `
	display: inherit;
	align-items: inherit;
	justify-content: inherit;
`;

const ButtonText = styled.span `
	font-family: ${props => props.fontFamily};
	font-size: 14px;

	text-align: center;
	color: #5A5E62;
`;

const Button = styled.button `
	background: ${props => props.isDropdownActive ? '#EFF1F3' : 'transparent'};
  display: flex;
	justify-content: center;
	align-items: center;
	outline: none;
	border: none;
	cursor: pointer;
	width: fit-content;
  
  border-radius: 2px;
  padding: 15px;
	column-gap: 9px;
	height: 32px; 
`;

const ButtonWrapper = styled.div `
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const Title = styled.div `
  font-weight: 300;
  font-size: 14px;

  display: flex;
  align-items: center;
  color: #5A5E62;
`;

const TitleWrapper = styled.div `
  width: fit-content;
  height: fit-content;
`;

const MainWrapper = styled.div `
  display: flex;
  height: auto; 
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
