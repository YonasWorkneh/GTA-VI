import { createContext, useContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState({ src: "", trailerLink: "" });
  return (
    <AppContext.Provider
      value={{ isTrailerOpen, videoInfo, setVideoInfo, setIsTrailerOpen }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("App context was used outside of app context provider");
  return context;
}

export { AppContextProvider, useAppContext };
