/** @format */

"use client";

import { CompanyInformation } from "@/types/graphql";
import React, { createContext, useContext } from "react";

interface CompanyInformationContextType {
  companyInformation: CompanyInformation;
}

const CompanyInformationContext = createContext<CompanyInformationContextType | undefined>(undefined);

export const useCompanyInformation = () => {
  const context = useContext(CompanyInformationContext);
  if (!context) {
    throw new Error("useCompanyInformation must be used within CompanyInformationProvider");
  }
  return context;
};

interface CompanyInformationProviderProps {
  companyInformation: CompanyInformation;
  children: React.ReactNode;
}

export const CompanyInformationProvider: React.FC<CompanyInformationProviderProps> = ({
  companyInformation,
  children,
}) => {
  return (
    <CompanyInformationContext.Provider value={{ companyInformation }}>{children}</CompanyInformationContext.Provider>
  );
};
