import NetInfo from '@react-native-community/netinfo';

export async function checkConnection() {
  const state = await NetInfo.fetch();
  return Boolean(state.isConnected && state.isInternetReachable !== false);
}
