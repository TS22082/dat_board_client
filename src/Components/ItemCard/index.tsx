import React from 'react';
import { ItemCardProps } from '../../sys/types';
import useRadNavigation from '../../hooks/useRadNavigation';
import styled from 'styled-components';
import { CaretNext, Trash } from 'grommet-icons';
import ToolTip from '../Tooltip';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { handleNavigate } = useRadNavigation();

  return (
    <CardContainer>
      <h4>{item.title}</h4>
      <ButtonContainer>
        <ToolTip position="down" text="Delete">
          <Trash
            size="medium"
            color="black"
            onClick={() => console.log('will do something eventually')}
          />
        </ToolTip>
        <ToolTip position="down" text="View Details">
          <CaretNext
            size="medium"
            color="black"
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
