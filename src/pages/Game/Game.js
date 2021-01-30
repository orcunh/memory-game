import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { Button, Header, Modal } from 'semantic-ui-react';

import { Card } from '../../components';
import {
  user,
  removeUser,
  cardList,
  shuffleCards,
  flipCard,
  increaseCount,
  isCompleted,
  resetGame,
} from '../../app/gameSlice';

import { StyledGame, StyledGrid, StyledWrapper, StyledButtons } from './Game.styles';

export const GamePage = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const [flippedCards, setFlippedCards] = useState([]);

  const allFlagsMatched = useSelector(isCompleted);
  const userName = useSelector(user);
  const cards = useSelector(cardList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shuffleCards());
  }, [dispatch]);

  const onSuccessMatching = useCallback(() => {
    flippedCards.forEach((card) => {
      dispatch(flipCard({ ...card, isFlipped: true, isLocked: true }));
    });
    setFlippedCards([]);
  }, [dispatch, flippedCards]);

  const onFailMatching = useCallback(() => {
    flippedCards.forEach((card) => {
      dispatch(flipCard({ ...card, isFlipped: false, isLocked: false }));
    });
    setFlippedCards([]);
  }, [dispatch, flippedCards]);

  useEffect(() => {
    if (flippedCards.length > 1) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];

      if (firstCard.code === secondCard.code) onSuccessMatching();
      else setTimeout(() => onFailMatching(), 1000);
    }
  }, [flippedCards, onFailMatching, onSuccessMatching]);

  const onCardClick = (card) => () => {
    if (!card.isLocked && !(flippedCards.length > 1)) {
      setFlippedCards((state) => [...state, { ...card }]);
      dispatch(increaseCount());
      dispatch(flipCard({ ...card, isFlipped: !card.isFlipped }));
    }
  };

  const handleChangeUser = useCallback(() => {
    dispatch(removeUser());
    history.push('/login');
  }, [dispatch, history]);

  const handleShuffleCards = useCallback(() => {
    dispatch(shuffleCards());
    setFlippedCards([]);
  }, [dispatch]);

  const handleOpenScoreBoard = useCallback(() => {
    dispatch(resetGame());
    history.push('/score-board');
  }, [dispatch, history]);

  if (!cards) return null;

  return (
    <StyledGame>
      <StyledWrapper>
        <Header as="h2" color="blue" textAlign="center">
          {t('game.welcome', { user: userName })}
        </Header>
        <StyledButtons>
          <Button onClick={handleChangeUser} size="mini">
            {t('game.changeUser')}
          </Button>
          <Button onClick={handleShuffleCards} size="mini">
            {t('game.shuffleCards')}
          </Button>
          <Button as={Link} to="/score-board" size="mini">
            {t('game.scoreBoard')}
          </Button>
        </StyledButtons>
        <StyledGrid>
          {cards.map((card) => (
            <Card key={card.id} onClick={onCardClick(card)} {...card} />
          ))}
        </StyledGrid>
      </StyledWrapper>
      {allFlagsMatched && (
        <Modal size="mini" open>
          <Modal.Header>{t('game.congratulations')}</Modal.Header>
          <Modal.Content>{t('game.successMessage')}</Modal.Content>
          <Modal.Actions>
            <Button positive onClick={handleOpenScoreBoard}>
              {t('game.goScoreBoard')}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </StyledGame>
  );
};
