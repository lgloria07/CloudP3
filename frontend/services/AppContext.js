import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  return (
    <AppContext.Provider value={{ tickets, addTicket }}>
      {children}
    </AppContext.Provider>
  );
}