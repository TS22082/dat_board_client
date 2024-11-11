import NewItemContainer from '../../Fragments/NewItemContainer.tsx';
import NewItemForm from '../../Fragments/NewItemForm.tsx';
import ActionSection from '../../Fragments/ActionSection.tsx';
import Button from '../../Fragments/Button';
import useDeleteItemData from './useDeleteItemData.ts';

const DeleteItem = () => {
  const { handleCancelClick } = useDeleteItemData();

  return (
    <NewItemContainer>
      <NewItemForm>
        <h3>You sure you want to delete this?</h3>
        <ActionSection>
          <Button type="button" onClick={handleCancelClick}>
            No, Cancel
          </Button>
          <Button type="button" onClick={() => console.log('submit')}>
            Yes, Delete
          </Button>
        </ActionSection>
      </NewItemForm>
    </NewItemContainer>
  );
};

export default DeleteItem;
