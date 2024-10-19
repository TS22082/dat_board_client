import useNewItemData from './useNewItemData.ts';
import styled from 'styled-components';
import Switch from '../../Components/Switch';

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

const NewItemButton = styled.button`
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background-color: black;
  border: none;
  color: white;
  width: 100px;
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
          <NewItemButton onClick={handleCancelClick}>Cancel</NewItemButton>
          <NewItemButton type="submit" onClick={createNewItem}>
            Submit
          </NewItemButton>
        </ActionSection>
      </NewItemForm>
    </NewItemContainer>
  );
};

export default NewItem;
