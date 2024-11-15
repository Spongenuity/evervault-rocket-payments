import './globals.css';
import { EvervaultProvider } from '@evervault/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const teamId = process.env.NEXT_PUBLIC_EVERVAULT_TEAM_ID;
  const appId = process.env.NEXT_PUBLIC_EVERVAULT_APP_ID;

  console.log('Evervault Config:', { teamId, appId });

  if (!teamId || !appId) {
    console.error('Missing Evervault configuration');
    return null;
  }

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <EvervaultProvider 
          teamId={teamId}
          appId={appId}
        >
          {children}
        </EvervaultProvider>
      </body>
    </html>
  );
}