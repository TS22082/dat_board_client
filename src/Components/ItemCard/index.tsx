import React from 'react';
import { ItemCardProps } from '../../sys/types';
import useRadNavigation from '../../hooks/useRadNavigation';
import styled from 'styled-components';
import { CaretNext, Trash } from 'grommet-icons';
import ToolTip from '../Tooltip';
import CardContainer from '../CardContaner';

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
            onClick={() =>
              handleNavigate({
                label: `Delete: ${item.title}`,
                route: `/item/delete?itemId=${item.id}`,
              })
            }
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
