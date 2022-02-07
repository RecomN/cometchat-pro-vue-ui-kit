export const chatHeaderStyle = (theme) => {
  return {
    // dd-edited
    padding: "14px 16px",
    // padding: "13px 16px",
    width: "100%",
    backgroundColor: `${theme.backgroundColor.white}`,
    zIndex: "1",
    borderBottom: `1px solid ${theme.borderColor.primary}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // dd-edited
    background: '#D7226D',
  };
};

export const chatDetailStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "calc(100% - 100px)",
  };
};

export const chatSideBarBtnStyle = (img, sidebar) => {
  const displayValue =
    sidebar && sidebar === 0 ? { display: "none!important" } : {};

  return {
    cursor: "pointer",
    display: "none",
    background: `url(${img}) 4px no-repeat`,
    padding: "20px",
    width: "24px",
    height: "24px",
    float: "left",
    ...displayValue,
  };
};

export const chatThumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0",
  };
};

export const chatUserStyle = () => {
  return {
    width: "calc(100% - 50px)",
    padding: "0 14px",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
  };
};

export const chatNameStyle = () => {
  return {
    margin: "0",
    fontSize: "15px",
    fontWeight: "600",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // dd-edited
    color: "#fff",
  };
};

export const chatStatusStyle = (
  theme,
  presence = "",
  statusProp = "",
  type = ""
) => {
  let status = {};
  if (type === "user") {
    status = {
      // color: `${theme.color.blue}`,
      // dd--edited
      color: "rgba(255, 255, 255, 0.6)",
      textTransform: "capitalize",
    };

    if (presence === "offline") {
      status = {
        // color: `${theme.color.helpText}`,
        // dd-edited
        color: "rgba(255, 255, 255, 0.6)",
        textTransform: "capitalize",
      };
    }

    if (statusProp.includes("typing")) {
      status = {
        color: `${theme.color.helpText}`,
        textTransform: "none",
        fontStyle: "italic",
      };
    }
  } else if (type === "group") {
    status = {
      color: `${theme.color.helpText}`,
    };

    if (statusProp.includes("typing")) {
      status = {
        color: `${theme.color.helpText}`,
        fontStyle: "italic",
      };
    }
  }

  return {
    fontSize: "13px",
    lineHeight: "20px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...status,
  };
};

export const chatOptionWrapStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100px",
  };
};

export const chatOptionStyle = (img, type) => {
  // let width = "21px";
  let width = "0px";
  let height = "0px";
  let margin = "0px";
  let pos = "2px";

  if (type === "audio") {
    // width = "27px";
    width = "28px";
    height = "22px";
    pos = "4px";
  } else if (type === "detail" || "video") {
    // width = "24px";
    width = "28px";
    height = "28px";
    pos = "3px";
  }

  // dd-edited
  if(type === "video") {
    margin = "0 8px";
  }else {
    margin = "0px";
  }

  return {
    width,
    height,
    // dd-edited
    // margin: "0 8px",
    margin,
    cursor: "pointer",
    display: "inline-block",
    background: `url(${img}) 0% ${pos} / contain no-repeat`,
  };
};
