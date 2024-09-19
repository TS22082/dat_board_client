import { Box, Typography } from "@mui/material";
import { useAppStateContext } from "../../hooks/useAppStateContext";
import { useEffect } from "react";
import { CREATE_ITEM_MODAL } from "../../sys/constants";
import CreateItemModal from "./CreateItemModal";

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

  useEffect(() => {
    console.log("modalData", modalData);
  }, [modalData]);

  if (!modalData?.type) return null;

  const content = {
    [CREATE_ITEM_MODAL]: <CreateItemModal />,
  };

  return (
    <Box sx={style}>{content[modalData.type as keyof typeof content]}</Box>
  );
};

export default ModalContent;
