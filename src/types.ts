export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface OrganizationData {
  companyName: string;
  websiteUrl: string;
  description: string;
}

export interface WebpageStatus {
  url: string;
  status: 'detected' | 'scraped' | 'pending';
  chunks?: string[];
}

export type Step = 'registration' | 'organization' | 'integration' | 'success';