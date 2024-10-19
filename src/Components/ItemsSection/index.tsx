import { useEffect, useState } from 'react';
import Grid from '../Grid';
import { GridItem } from '../GridItem';
import styled from 'styled-components';
import ToolTip from '../Tooltip';
import { AddCircle } from 'grommet-icons';
import { ItemType } from '../../sys/types';
import ItemCard from '../ItemCard';
import { useParams } from 'react-router-dom';
import useRadNavigation from '../../hooks/useRadNavigation.ts';

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemsSection = () => {
  const [items, setItems] = useState([]);
  const params = useParams();
  const { navigateRaw } = useRadNavigation();

  useEffect(() => {
    const query = params?.id ? `?parentId=${params.id}` : '';

    (async () => {
      try {
        const accessToken = localStorage.getItem('accessToken') || '';

        if (!accessToken) {
          return;
        }

        const response = await fetch(`/api/items${query}`, {
          method: 'GET',
          headers: {
            Authorization: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setItems(data || []);
      } catch (err) {
        console.error('error ==>', err);
      }
    })();
  }, [params.id]);

  const navigateToNewItemForm = () => {
    let navigatePath = '/item/new';
    if (params?.id) navigatePath += `?parentId=${params.id}`;
    navigateRaw(navigatePath);
  };

  return (
    <Grid>
      <GridItem sm={12} md={12} lg={12} xl={12}>
        <ItemHeader>
          <h1>
            Item Count: <span>{items.length}</span>
          </h1>
          <ToolTip position="left" text="Add Item">
            <AddCircle
              onClick={navigateToNewItemForm}
              style={{ cursor: 'pointer' }}
              color="black"
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
