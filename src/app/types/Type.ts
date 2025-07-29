// types/Type.ts

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  createdBy: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  orgPrimaryPhone: string;
  orgEmail: string;
  isPaid: boolean;
  average_rating: number;
  total_reviews: number;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };
}

export interface BookmarkedEvent {
  eventID: string;
  title: string;
  opType: string;
  location: string;
  datePosted: string;
  orgName: string;
}



export interface JobType {
    icon?: string
    title: string,
    location: string[],
    description: string,
    company: string
}

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: string;
//       accessToken?: string;
//     };
//   }

//   interface User {
//     role?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     accessToken?: string;
//   }
// }
