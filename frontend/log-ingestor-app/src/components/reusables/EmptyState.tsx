import React from "react";

import IconRenderer from "./IconRenderer";

import { IEmptyStatePassedProps } from "../../types/EmptyState.types";

import "../../styles/EmptyState.css";

const EmptyState = (props: IEmptyStatePassedProps) => {
  const { icon, message } = props;
  return (
    <div className="empty-state-container">
      <IconRenderer icon={icon} size={"5x"} />
      <div>{message}</div>
    </div>
  );
};

export default EmptyState;
