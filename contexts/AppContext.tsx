import { createContext } from 'react';

interface AppContext {
  searchText: string;
}

export const AppContext = createContext<AppContext>({} as AppContext);
