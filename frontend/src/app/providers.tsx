'use client';

import { EvervaultProvider } from '@evervault/react';

// Define interface for environment variables
interface EvervaultConfig {
  teamId: string;
  appId: string;
}

// Declare window augmentation for our config
declare global {
  interface Window {
    __EVERVAULT_CONFIG__?: EvervaultConfig;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Access the config that was injected into the window object
  const config = {
    teamId: process.env.NEXT_PUBLIC_EVERVAULT_TEAM_ID || '',
    appId: process.env.NEXT_PUBLIC_EVERVAULT_APP_ID || ''
  };

  if (!config.teamId || !config.appId) {
    console.error('Missing Evervault configuration');
    return null;
  }

  return (
    <EvervaultProvider teamId={config.teamId} appId={config.appId}>
      {children}
    </EvervaultProvider>
  );
}