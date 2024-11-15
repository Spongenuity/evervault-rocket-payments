export const evervaultConfig = {
  teamId: process.env.NEXT_PUBLIC_EVERVAULT_TEAM_ID!,
  appId: process.env.NEXT_PUBLIC_EVERVAULT_APP_ID!,
};

// Add validation
if (!evervaultConfig.teamId || !evervaultConfig.appId) {
  throw new Error('Missing required Evervault configuration');
}
