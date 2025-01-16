import React from "react";

const ToolsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-neutral-900 min-h-screen p-4">{children}</div>;
};

export default ToolsLayout;
