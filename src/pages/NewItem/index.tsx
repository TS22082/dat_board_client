import useNewItemData from './useNewItemData.ts';
import styled from 'styled-components';
import Switch from '../../Components/Switch';
import Button from '../../Components/Button';

const NewItemContainer = styled.div`
  margin-top: '20px';
  display: flex;
  justify-content: center;
`;

const NewItemForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
`;

const NewItemInput = styled.input`
  border-radius: 10px;
  padding: 5px;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const NewItem = () => {
  const {
    createNewItem,
    handleCancelClick,
    setIsPublic,
    setTitle,
    title,
    isPublic,
  } = useNewItemData();

  return (
    <NewItemContainer>
      <NewItemForm onSubmit={createNewItem}>
        <h3>New Item</h3>
        <NewItemInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Item"
        />
        <Switch
          isOn={isPublic}
          handleToggle={() => setIsPublic(!isPublic)}
          label={['Private', 'Public']}
        />
        <ActionSection>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button type="submit" onClick={createNewItem}>
            Submit
          </Button>
        </ActionSection>
      </NewItemForm>
    </NewItemContainer>
  );
};

export default NewItem;
