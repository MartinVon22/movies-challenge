import React, { createContext, useReducer } from "react";


const initialState = {
    menuIsOpen: false,
    movies: []
};

export const AppContext = createContext({ state: initialState, dispatch: (action: any) => {} });


const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, menuIsOpen: true };
    case "CLOSE_MENU":
      return { ...state, menuIsOpen: false };
    case "ADD_MOVIES":
      return {...state, movies: [...state.movies, action.movie] }
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

