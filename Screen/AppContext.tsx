// import React, {createContext, useState} from 'react';

// //const AppContext = createContext(defaultValue);
// //export const AppContext = React.createContext();
// interface AppContextType {
//   name: string;
//   setName: (name: string) => void;
// }

// export const AppContext = createContext<AppContextType>({
//   name: '',
//   setName: () => {},
// });
// const AppProvider = ({children}) => {
//   const [name, setName] = useState('');

//   return (
//     <AppContext.Provider value={{name, setName}}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppProvider;
import React, {createContext, useState} from 'react';

//const AppContext = createContext(defaultValue);
//export const AppContext = React.createContext();
interface AppContextType {
  emailname: string;
  setEmailname: (emailname: string) => void;
  idProduct: string;
  setIdproduct: (idProduct: string) => void;
}

export const AppContext = createContext<AppContextType>({
  emailname: '',
  setEmailname: () => {},
  idProduct: '',
  setIdproduct: () => {},
});
const AppProvider = ({children}:any) => {
  const [emailname, setEmailname] = useState('');
  const [idProduct, setIdproduct] = useState('');


  return (
    <AppContext.Provider value={{emailname, setEmailname, idProduct, setIdproduct}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
