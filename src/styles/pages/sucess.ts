import { styled } from "..";

export const SucessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },
  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },
  a: {
    display: "block",
    marginTop: "5rem",
    fontSize: "$lg",
    color: "$green500",
    fontWeight: "bold",
    textDecoration: "none",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const SectionContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "4rem",
});

export const ImageContainer = styled("div", {
  position: "relative",
  zIndex: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "0.25rem",
  margin: "0 -26px",

  // width: "100%",
  maxWidth: 130,
  height: 145,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.8)",
  borderRadius: "50%",

  img: {
    objectFit: "cover",
  },
});
