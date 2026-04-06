// types/personalInfo.ts
export interface PersonalInfo {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  language: string;
  country: string;
}

export const genders: string[] = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
export const languages: string[] = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
];
export const countries: string[] = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Brazil',
  'India',
  'Japan',
  'China',
];
