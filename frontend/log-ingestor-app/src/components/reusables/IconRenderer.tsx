import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IIconRendererProps } from "../../types/IconRenderer.types";

const IconRenderer = (props: IIconRendererProps) => {
  const { icon, color = '#222f3e"' } = props;
  return <FontAwesomeIcon icon={icon} style={{ color }} />;
};

export default IconRenderer;
