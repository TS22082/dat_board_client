import { Box } from "@mui/material";
import { useAppStateContext } from "../../context/useAppStateContext";
import { lazy, Suspense } from "react";
import { CREATE_ITEM_MODAL, DELETE_ITEM_MODAL } from "../../sys/constants";

const CreateThingModal = lazy(() => import("./CreateItemModal"));
const DeleteItemModal = lazy(() => import("./DeleteItemModal"));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalContent = () => {
  const { modalData } = useAppStateContext();

  if (!modalData?.type) return null;

  const content = {
    [CREATE_ITEM_MODAL]: CreateThingModal,
    [DELETE_ITEM_MODAL]: DeleteItemModal,
  };

  const ModalContent = content[modalData.type as keyof typeof content] || null;

  return (
    <Box sx={style}>
      <Suspense fallback={<div>Loading...</div>}>
        {ModalContent && <ModalContent />}
      </Suspense>
    </Box>
  );
};

export default ModalContent;
