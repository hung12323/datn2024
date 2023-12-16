import React, {createContext, useState} from 'react';

//const AppContext = createContext(defaultValue);
//export const AppContext = React.createContext();
interface AppContextType {
  name: string;
  setName: (name: string) => void;
}

export const AppContext = createContext<AppContextType>({
  name: '',
  setName: () => {},
});
const AppProvider = ({children}) => {
  const [name, setName] = useState('');

  return (
    <AppContext.Provider value={{name, setName}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
