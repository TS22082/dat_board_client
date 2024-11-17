import React from 'react';
import { ItemCardProps } from '../../sys/types';
import useRadNavigation from '../../hooks/useRadNavigation';
import { CaretNext, Trash } from 'grommet-icons';
import ToolTip from '../Tooltip';
import CardContainer from '../CardContaner';
import ButtonContainer from '../../Fragments/ButtonContainer';
import { useAppStateContext } from '../../context/useAppStateContext.ts';

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { handleNavigate } = useRadNavigation();
  const { theme } = useAppStateContext();

  return (
    <CardContainer theme={theme}>
      <h4>{item.title}</h4>
      <ButtonContainer>
        <ToolTip theme={theme} position="down" text="Delete">
          <Trash
            size="medium"
            color={theme === 'light' ? 'black' : 'white'}
            onClick={() =>
              handleNavigate({
                label: `Delete: ${item.title}`,
                route: `/item/delete?itemId=${item.id}`,
              })
            }
          />
        </ToolTip>
        <ToolTip theme={theme} position="down" text="View Details">
          <CaretNext
            size="medium"
            color={theme === 'light' ? 'black' : 'white'}
            onClick={() => {
              handleNavigate({
                label: item.title,
                route: `/item/${item.id}`,
              });
            }}
          />
        </ToolTip>
      </ButtonContainer>
    </CardContainer>
  );
};

export default ItemCard;
