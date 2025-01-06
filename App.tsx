import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UserProvider } from './src/context/user-context';
import AuthNavigator from './src/navigation/auth-navigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
