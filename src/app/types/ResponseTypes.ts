//ResponseTypes.ts

import { BookmarkedEvent, Opportunity } from "./Type";


export interface OpportunitiesResponse {
  success: boolean;
  message: string;
  data: Opportunity[];
  errors: string | null;
  count: number;
}

export interface OpportunityResponseById {
  success: boolean;
  message: string;
  data: Opportunity;
  errors: string | null;
  count: number;
}

export interface BookmarkResponse {
  success: boolean;
  message: string;
  data: BookmarkedEvent[];
  errors: string | null;
  count: number;
}