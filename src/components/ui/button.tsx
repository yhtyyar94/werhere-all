"use client";

import { Button as ChakraButton, Spinner } from "@chakra-ui/react";
import * as React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<
  typeof ChakraButton
> {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (
      <ChakraButton ref={ref} disabled={loading || disabled} {...rest}>
        {loading ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText ?? children}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    );
  },
);
