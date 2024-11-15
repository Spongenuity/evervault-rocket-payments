'use client';

import { forwardRef } from 'react';
import { Card as EvervaultCard, themes } from "@evervault/react";

const theme = themes.clean();

export const Card = forwardRef((props: any, ref) => {
  return (
    <EvervaultCard
      ref={ref}
      theme={theme}
      onChange={(event: any) => {
        if (event.isValid && event.isComplete) {
          props.onChange(event);
        }
      }}
      options={{ enableBinDetection: true }}
    />
  );
});

Card.displayName = 'Card';
