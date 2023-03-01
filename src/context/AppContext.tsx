import React, { createContext, useReducer } from "react";


const initialState = {
    menuIsOpen: false
};

export const AppContext = createContext({ state: initialState, dispatch: (action: any) => {} });


const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, menuIsOpen: true };
    case "CLOSE_MENU":
      return { ...state, menuIsOpen: false };
    default:
      throw new Error(`Acción invalida: ${action.type}`);
  }
}

export const AppContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

