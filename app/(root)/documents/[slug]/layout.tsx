import React from "react";
import { Room } from "./Room";

const DocumentsLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <Room>{children}</Room>;
};

export default DocumentsLayoutPage;
