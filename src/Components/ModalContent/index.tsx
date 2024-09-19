import { Box } from "@mui/material";
import { useAppStateContext } from "../../hooks/useAppStateContext";
import { lazy, Suspense } from "react";
import { CREATE_ITEM_MODAL } from "../../sys/constants";

const CreateThingModal = lazy(() => import("./CreateItemModal"));

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
