import * as SecureStore from 'expo-secure-store';
import { loadDemoToken, removeDemoToken, saveDemoToken } from '../src/utils/secureStorage';

describe('secure storage utils', () => {
  it('saves demo token in SecureStore', async () => {
    await saveDemoToken('abc');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('demoUserToken', 'abc');
  });

  it('loads demo token from SecureStore', async () => {
    await expect(loadDemoToken()).resolves.toBe('demo-token');
  });

  it('removes demo token from SecureStore', async () => {
    await removeDemoToken();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('demoUserToken');
  });
});
