import * as SecureStore from 'expo-secure-store';

const DEMO_TOKEN_KEY = 'demoUserToken';

export async function saveDemoToken(token: string) {
  await SecureStore.setItemAsync(DEMO_TOKEN_KEY, token);
}

export async function loadDemoToken() {
  return SecureStore.getItemAsync(DEMO_TOKEN_KEY);
}

export async function removeDemoToken() {
  await SecureStore.deleteItemAsync(DEMO_TOKEN_KEY);
}
