jest.mock('react-native', () => {
  const MockAsyncStorage = require('mock-async-storage').default;

  return {
    AsyncStorage: new MockAsyncStorage(),
  };
});
