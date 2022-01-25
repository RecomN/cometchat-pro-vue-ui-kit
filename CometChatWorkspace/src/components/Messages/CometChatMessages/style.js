export const chatWrapperStyle = (theme) => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: `${theme.fontFamily}`,
    "--chat-wrapper-font-family": `${theme.fontFamily}`,
    // dd-edited
    left: "-334px",
    boxShadow: "0px 16px 32px rgba(20, 20, 20, 0.2)",
  };
};

export const reactionsWrapperStyle = () => {
  return {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    zIndex: "2",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    pointerEvents: "none",
  };
};
