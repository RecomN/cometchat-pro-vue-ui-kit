export const chatsWrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  };
};

export const chatsHeaderStyle = (theme) => {
  return {
    padding: "16px 16px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderBottom: `1px solid ${theme.color.darkSecondary}`,
    // dd-edited
    minHeight: '114px',
    width: '100%',
  };
};

export const chatsHeaderCloseStyle = (img) => {
  return {
    cursor: "pointer",
    display: "none",
    background: `url(${img}) left center / 18px no-repeat`,
    height: "24px",
    width: "33%",
  };
};

// dd-edited
export const chatsHeaderTitleStyle = (enableCloseMenu) => {
  const alignment = enableCloseMenu
    ? {
        // width: "33%",
        width: "100%",
        textAlign: "center",
      }
    : {};

  return {
    margin: "0",
    display: "inline-block",
    // width: "66%",
    width: "100%",
    fontWeight: "700",
    // textAlign: "left",
    textAlign: "center",
    fontSize: "20px",
    ...alignment,
  };
};

// dd-edited (text info if there is no chat)
export const chatsMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
  };
};

// dd-edited (text info if there is no chat)
export const chatsMsgTxtStyle = (theme) => {
  return {
    margin: "0",
    height: "30px",
    // color: `${theme.color.secondary}`,
    color: '#1D1D1D',
    // fontSize: "24px!important",
    fontSize: "16px",
    fontWeight: "600",
  };
};

export const chatsListStyle = () => {
  return {
    height: "calc(100% - 75px)",
    width: "100%",
    overflowY: "auto",
    margin: "0",
    padding: "0",
  };
};
