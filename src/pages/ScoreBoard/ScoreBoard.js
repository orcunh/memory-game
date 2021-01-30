import { useState } from 'react';
import { Table, Header, Button, Message } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { storage, CONSTANTS } from '../../utils';

import { StyledWrapper, StyledButtons } from './ScoreBoard.styles';

export const ScoreBoardPage = () => {
  const { t } = useTranslation();
  const [scores] = useState(JSON.parse(storage.get(CONSTANTS.SCORE_BOARD)) || []);

  return (
    <StyledWrapper>
      <Header as="div" color="blue" textAlign="center">
        {t('scoreBoard.title')}
      </Header>
      <StyledButtons>
        <Button as={Link} to="/" size="mini">
          {t('scoreBoard.playAgain')}
        </Button>
      </StyledButtons>
      <Message content={t('scoreBoard.info')} />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{t('scoreBoard.user')}</Table.HeaderCell>
            <Table.HeaderCell>{t('scoreBoard.score')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {scores.length > 0 ? (
            scores.map(({ user, score }, k) => (
              <Table.Row key={k}>
                <Table.Cell>{user}</Table.Cell>
                <Table.Cell>{score}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="2" textAlign="center">
                {t('scoreBoard.noScore')}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </StyledWrapper>
  );
};
