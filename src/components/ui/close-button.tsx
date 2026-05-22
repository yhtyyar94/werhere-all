"use client";

import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import * as React from "react";
import { LuX } from "react-icons/lu";

export interface CloseButtonProps extends IconButtonProps {}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  return (
    <IconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
      {props.children ?? <LuX />}
    </IconButton>
  );
});
