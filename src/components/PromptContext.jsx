import { createContext, useContext, useState } from "react";

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PortfolioProvider = ({ children }) => {
  const [promptData, setpromptData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState(null);
  const [clusterData, setClusterData] = useState(null);
  const [selectedClusterId, setselectedClusterId] = useState(null);
  return (
    <PromptContext.Provider
      value={{
        promptData,
        setpromptData,
        progress,
        setProgress,
        prompt,
        setPrompt,
        clusterData,
        setClusterData,
        selectedClusterId,
        setselectedClusterId,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
