import Grid from '../Grid';
import { GridItem } from '../GridItem';
import styled from 'styled-components';
import ToolTip from '../Tooltip';
import { AddCircle } from 'grommet-icons';
import { ItemType } from '../../sys/types';
import ItemCard from '../ItemCard';
import useItemsSectionData from './useItemsSectionData.ts';

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemsSection = () => {
  const { items, navigateToNewItemForm, theme } = useItemsSectionData();

  return (
    <Grid>
      <GridItem sm={12} md={12} lg={12} xl={12}>
        <ItemHeader>
          <h1>
            Item Count: <span>{items.length}</span>
          </h1>
          <ToolTip theme={theme} position="left" text="Add Item">
            <AddCircle
              onClick={navigateToNewItemForm}
              style={{ cursor: 'pointer' }}
              color={theme === 'light' ? 'black' : 'white'}
              size="large"
            />
          </ToolTip>
        </ItemHeader>
      </GridItem>
      {items.map((item: ItemType) => (
        <GridItem key={item.id} sm={12} md={12} lg={6} xl={4}>
          <ItemCard item={item} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ItemsSection;
