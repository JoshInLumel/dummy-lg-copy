import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IIconRendererProps } from "../../types/IconRenderer.types";

const IconRenderer = (props: IIconRendererProps) => {
  const { icon, color = "#222f3e", size } = props;

  return <FontAwesomeIcon icon={icon} style={{ color }} size={size} />;
};

export default IconRenderer;
