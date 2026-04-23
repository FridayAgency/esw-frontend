import { GET_CASE_STUDIES } from "@/data/graphql/queries/caseStudies";
import client from "@/lib/client";
import {
  CaseStudy,
  CaseStudyCategory,
  RootQueryToCaseStudyCategoryConnection,
  RootQueryToCaseStudyConnection,
} from "@/types/graphql";
import { removeNodes } from "@fridayagency/utils";
import React from "react";
import CaseStdiesListClient from "./CaseStdiesListClient";

const CaseStudiesList: React.FC = async () => {
  try {
    const { caseStudies, caseStudyCategories } = await client.query<{
      caseStudies: RootQueryToCaseStudyConnection;
      caseStudyCategories: RootQueryToCaseStudyCategoryConnection;
    }>(GET_CASE_STUDIES);

    const caseStudyList = caseStudies ? removeNodes<CaseStudy>(caseStudies) : [];
    const caseStudyCategoryList = caseStudyCategories ? removeNodes<CaseStudyCategory>(caseStudyCategories) : [];

    if (caseStudyList.length === 0) {
      return null;
    }

    return <CaseStdiesListClient caseStudies={caseStudyList} caseStudyCategories={caseStudyCategoryList} />;
  } catch (error) {
    console.error("Error loading case studies:", error);
    return null; // or return a fallback UI>;
  }
};

export default CaseStudiesList;
