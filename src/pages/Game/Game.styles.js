import styled from 'styled-components';
import { Select } from 'semantic-ui-react';

const spacer = '16px';

export const StyledGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: ${spacer};
  margin: 8px;

  @media (max-width: 610px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 6px;
    margin: 8px 0;
  }
`;

export const StyledWrapper = styled.div`
  padding-top: 100px;
  @media (max-width: 610px) {
    padding-top: 20px;
  }
`;

export const StyledButtons = styled.div`
  text-align: center;
  margin-bottom: ${spacer};
`;

export const StyledLangSelect = styled(Select)`
  &.ui.selection.dropdown {
    line-height: 4px;
    min-height: 10px;
    min-width: 100px;

    & > .dropdown.icon {
      padding: 6px;
    }
  }
`;
