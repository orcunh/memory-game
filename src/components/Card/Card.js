import React from 'react';

import { StyledCardContainer, StyledCard, StyledBack, StyledFront } from './Card.styles';

export const Card = ({ code, isFlipped, onClick }) => {
  return (
    <StyledCardContainer onClick={onClick}>
      <StyledCard className={isFlipped ? 'flipped' : ''}>
        <StyledFront />
        <StyledBack code={code} />
      </StyledCard>
    </StyledCardContainer>
  );
};
