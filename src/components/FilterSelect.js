// Dependencies
import styled from 'styled-components';
import React from 'react'
import Icon from './Icon';

export default function FilterSelect({title, options, option}) {
  
  return (

    <MainWrapper>  
      <TitleWrapper>
        <Title>
          {title}
        </Title>
      </TitleWrapper>
      <Button>
        <ButtonText>
          {option}
        </ButtonText>
        <ButtonIcon>
          <Icon 
            iconFile='arrow-down-icon.svg'
            iconAlt='Selector Button Icon'
            iconSize={{
              iconWidth: 12,
              iconHeight: 12,
            }}
          />
        </ButtonIcon>
      </Button>
      <TypeSelector backgroundColor={COLORS.backgroundColorTypeB} dropshadow={FILTERS.primaryBoxshadow} isDropdownActive={isDropdownActive}>
        <TypeOption>
          <TypeOptionText>Shows</TypeOptionText>
        </TypeOption>	
      </TypeSelector>
    </MainWrapper>

  )
}

const TypeOptionText = styled.span `
	font-family: ${props => props.fontFamily};
	font-size: 16px;

	text-align: center;
	color: #5A5E62;
`;

const TypeOption = styled.button `
	width: 100%;
	height: 35px;
	padding: 0px 10px;
	
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 3px;
	background: transparent;
	outline: none;
	border:none;

	&:hover {
		background: #dfe3e7;
	}

`;

const TypeSelector = styled.div `
	background: ${props => props.backgroundColor};
	filter: ${props => props.dropshadow};
	border: none;
	position: absolute;
	height: fit-content;
	list-style: none;
	display: ${props => props.isDropdownActive ? 'initial' : 'none'};

	top: calc(100% + 10px);
	width: 150px;
	padding: 12px 10px;
	right: -25%;
	border-radius: 3px;
	z-index: 999;
`;

const ButtonIcon = styled.div `
	display: inherit;
	align-items: inherit;
	justify-content: inherit;
`;

const ButtonText = styled.span `
	font-family: ${props => props.fontFamily};
	font-size: 15px;

	text-align: center;
	color: #5A5E62;
`;

const Button = styled.button `
  display: flex;
	justify-content: center;
	align-items: center;
	background: #EFF1F3;
	outline: none;
	border: none;
	cursor: pointer;
	width: fit-content;
  
  padding: 15px;
	column-gap: 9px;
	height: 34px; 
`;

const Title = styled.div `
  font-weight: 300;
  font-size: 16px;

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
