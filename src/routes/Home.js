// Dependencies
import React from 'react';
import styled from 'styled-components';
import {COLORS} from '../constants';

export default function Home() {
  return (
      <HomeWrapper background={COLORS.primaryBackgroundColor} >
        This is the text inside to check whether it works or not
      </HomeWrapper>
  )
}

const HomeWrapper = styled.div `
    background: ${props => props.background || "#FFF"};
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
`;