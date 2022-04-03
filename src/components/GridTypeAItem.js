// dependencies 
import React, { createRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { URL, MLIST, DROPDOWNS } from '../constants'

export default function GridTypeAItem({data, type, query}) {

  type = DROPDOWNS.searchBarDropdown[type].toLowerCase()

  // if type is show then change the data a bit
  let title = type === 'movie' ? data.title : data.name;
  let release_date = type === 'movie' ? data.release_date : data.first_air_date;

  const contentLink = `/search/${data.id}/${encodeURIComponent(title)}?query=${query}&type=${type}`;

  // use states
  const [posterHovered, setPosterHovered] = useState('');

  const posterWrapperRef = createRef();
  // formatting the date, not that important
  const formatReleaseDate = () => {
    let rDate = release_date.split('-');
    let month = MLIST[parseInt(rDate[1] - 1)].slice(0, 3)
    return month + ' ' + rDate[2] + ' , ' + rDate[0]
  }

  // we'll return the formatted title
  const formatTitle = () => {
    if (title?.length > 19) {
      return title?.slice(0, 20) + '...'
    }

    return title
  }

  // getting image url
  const getPosterUrl = () => {
    return URL.tmdbImagesURL + `/p/w300/${data.poster_path}`
  }

  useEffect(() => {
    
    // set hovered to true if hovering on
    posterWrapperRef.current.addEventListener('mouseover', () => {
      setPosterHovered('hovered')
    })

    // set hovered to false if not hovering on
    posterWrapperRef.current.addEventListener('mouseout', () => {
      setPosterHovered('not_hovered')
    })

  }, [])

  if (!data) {
    return null;
  }
  
  return (
    <MainWrapper ref={posterWrapperRef}>
      <Link to={contentLink} style={{width: '100%', height: 'fit-contents'}}>
        <PosterWrapper>
          <PosterOverlay hovered={posterHovered} className={posterHovered}>
            <PlayBtn className={posterHovered} />
          </PosterOverlay>
          <PosterImage>
            <Image 
                className={posterHovered === 'hovered' && 'zoom_in' }
                src={getPosterUrl()}
                data-src={getPosterUrl}
            />
          </PosterImage>
          {/* <RatingWrapper>
            <RatingText>
              {}
            </RatingText>
          </RatingWrapper> */}
        </PosterWrapper>
      </Link>
      <DescriptionWrapper>
        <Title>{formatTitle()}</Title>
        <Release>{formatReleaseDate()}</Release>
      </DescriptionWrapper>
    </MainWrapper>
  )
}


const PlayBtn = styled.div `
  width: 100%;
  height: 100%;
  background: url('/icons/play-icon.svg') 50% 50% no-repeat;
  background-size: 40% 40%;
  opacity: 0;
`;

const Release = styled.span `
  font-size: 14px;
  width: 100%;

  display: flex;
  align-items: center;
  color: #71818A;
`;

const Title = styled.span `
  font-weight: 500;
  font-size: 14px;
  width: 100%;

  display: flex;
  align-items: center;
  color: #222D34;
`;

const DescriptionWrapper = styled.div `
  width: 100%;
  row-gap: 5px;

  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Image = styled.div `
  width: 100%;
  background-size: 100% 100%;
  min-height: 270px;
  max-height: 270px;

  height: auto;
  object-fit: cover;
  background-image: url(${props => props.src});
  transition: .3s ease;
`;

const PosterImage = styled.div `
  width: 100%;
  border-radius: 4px;
  min-height: 270px;
  max-height: 270px;
  overflow: hidden;

  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .zoom_in {
    transform: scale(1.08);
  }

`;

const PosterOverlay = styled.div `
  width: 100%;
  height: 100%;
  background: rgba(47, 49, 65, 0);
  z-index: -1;
  top: 0px;
  bottom: 0px;
  opacity: 0;

  backdrop-filter: none;
  position: absolute;

  ${PlayBtn}.hovered {
    animation: btnIn .8s forwards;
  }

  ${PlayBtn}.not_hovered {
    animation: btnOut .8s forwards;
  }

  @keyframes btnIn {
    from {
      opacity: 0;
      background-size: 60% 60%;
    };

    to {
      opacity: 1;
      background-size: 30% 30%;
    }
  }

  @keyframes btnOut {
    from {
      opacity: 1;
      background-size: 30% 30%;
    };

    to {
      opacity: 0;
      background-size: 60% 60%;
    }
  }

`;

const PosterWrapper = styled.div `
  width: 100%;

  cursor: pointer;
  height: fit-content;

  ${PosterOverlay}.hovered {
    animation: overlayIn .3s forwards;
    z-index: 2;
  }

  ${PosterOverlay}.not_hovered {
    animation: overlayOut .3s forwards;
    z-index: -1;
  }

  @keyframes overlayIn {
    from {
      backdrop-filter: blur(0px);
      opacity: 0;
      background: rgba(47, 49, 65, 0);
    };

    to {
      backdrop-filter: blur(4px);
      opacity: 1;
      background: rgba(47, 49, 65, 0.5);
    }
  }

  @keyframes overlayOut {
    from {
      backdrop-filter: blur(4px);
      opacity: 1;
      background: rgba(47, 49, 65, 0.5);
    };

    to {
      backdrop-filter: blur(0px);
      opacity: 0;
      background: rgba(47, 49, 65, 0);
    }
  }

`;

const MainWrapper = styled.div `
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  row-gap: 10px;
`;
