import styled from 'styled-components';
import Flag from 'react-world-flags';

const borderRadius = '5px';

export const StyledCardContainer = styled.div`
  width: 200px;
  height: 120px;
  perspective: 600px;
  border-radius: ${borderRadius};

  @media (max-width: 850px) {
    width: 160px;
    height: 100px;
  }
`;

export const StyledCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;

  &.flipped {
    transform: translateX(-100%) rotateY(-180deg);
  }
`;

const side = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: borderRadius,
  objectFit: 'cover',
};

export const StyledFront = styled.div`
  ${side}

  background: linear-gradient(
    135deg,
    #1fa5ff 25%,
    #1053ff 25%,
    #1053ff 50%,
    #1fa5ff 50%,
    #1fa5ff 75%,
    #1053ff 75%,
    #1053ff 100%
  );
  background-size: 56px 56px;
  border: 1px solid #1053ff;
`;

export const StyledBack = styled(Flag)`
  ${side}
  border: 1px solid #ccc;
  transform: rotateY(180deg);
`;
