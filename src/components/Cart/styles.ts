import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";

export const ButtonContainer = styled("div", {
  width: "48px",
  height: "48px",
  background: "#202024",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  padding: 12,
  borderRadius: 6,
  cursor: "pointer",
  position: "relative",
});

export const ModalOverlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  background: "rgba(0 0 0 / 0.7)",
  backdropFilter: "blur(4px)",
  border: "none",
});

export const ModalTitle = styled(Dialog.Title, {
  fontSize: "1.25rem",
});

export const ModalContent = styled(Dialog.Content, {
  position: "absolute",
  top: 0,
  right: "-100%",
  padding: "72px 48px",
  width: "100%",
  maxWidth: 480,
  height: "100%",
  maxHeight: "100vh",
  zIndex: "2",
  background: "$gray800",
  "&[data-state='open']": {
    right: 0,
  },
});

export const ModalDescription = styled(Dialog.Description, {
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 80px)",
});

export const ModalClose = styled(Dialog.Close, {
  position: "absolute",
  top: "24px",
  right: "24px",
  cursor: "pointer",
});

export const CountItensCart = styled("div", {
  position: "absolute",
  top: -7,
  right: -7,
  width: 24,
  height: 24,
  background: "$green500",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
});

export const TotalContainer = styled("div", {
  marginTop: "auto",
  marginBottom: 48,

  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  strong: {
    fontSize: "$md",
  },

  span: {
    fontSize: "$md",
  },

  h2: {
    fontSize: "$xl",
  },

  button: {
    width: 384,
    height: 69,
    borderRadius: 8,
    color: "$white",
    background: "$green500",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    marginTop: 57,

    "&:hover": {
      background: "$green300",
    },
  },
});
