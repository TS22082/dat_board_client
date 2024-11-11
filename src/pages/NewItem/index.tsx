import useNewItemData from './useNewItemData.ts';
import Switch from '../../Components/Switch';
import Button from '../../Fragments/Button';
import NewItemContainer from '../../Fragments/NewItemContainer.tsx';
import NewItemForm from '../../Fragments/NewItemForm.tsx';
import ActionSection from '../../Fragments/ActionSection.tsx';
import NewItemInput from '../../Fragments/NewItemInput.tsx';

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
