// // types/personalInfo.ts
// export interface PersonalInfo {
//   name: string;
//   email: string;
//   gender: string;
//   dateOfBirth: Date;
//   language: string;
//   country: string;
// }

// export const genders: string[] = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
// export const languages: string[] = [
//   'English',
//   'Spanish',
//   'French',
//   'German',
//   'Italian',
//   'Portuguese',
//   'Chinese',
//   'Japanese',
// ];
// export const countries: string[] = [
//   'United States',
//   'United Kingdom',
//   'Canada',
//   'Australia',
//   'Germany',
//   'France',
//   'Italy',
//   'Spain',
//   'Brazil',
//   'India',
//   'Japan',
//   'China',
// ];

// types/personalInfo.ts

export interface PersonalInfo {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  language: string;
  country: string;
}

export interface PickerItem {
  id: string;
  label: string;
  value: string; // API code (e.g. "en", "US", "male")
}

export const genders: PickerItem[] = [
  { id: 'female', label: 'Female', value: 'female' },
  { id: 'male', label: 'Male', value: 'male' },
  { id: 'other', label: 'Non-binary', value: 'other' },
  { id: 'other2', label: 'Prefer not to say', value: 'other' },
];

export const languages: PickerItem[] = [
  { id: 'en', label: 'English', value: 'en' },
  { id: 'es', label: 'Spanish', value: 'es' },
  { id: 'fr', label: 'French', value: 'fr' },
  { id: 'de', label: 'German', value: 'de' },
  { id: 'it', label: 'Italian', value: 'it' },
  { id: 'pt', label: 'Portuguese', value: 'pt' },
  { id: 'zh', label: 'Chinese', value: 'zh' },
  { id: 'ja', label: 'Japanese', value: 'ja' },
  { id: 'ko', label: 'Korean', value: 'ko' },
  { id: 'ar', label: 'Arabic', value: 'ar' },
  { id: 'hi', label: 'Hindi', value: 'hi' },
];

export const countries: PickerItem[] = [
  { id: 'us', label: 'United States', value: 'US' },
  { id: 'uk', label: 'United Kingdom', value: 'GB' },
  { id: 'ca', label: 'Canada', value: 'CA' },
  { id: 'au', label: 'Australia', value: 'AU' },
  { id: 'de', label: 'Germany', value: 'DE' },
  { id: 'fr', label: 'France', value: 'FR' },
  { id: 'it', label: 'Italy', value: 'IT' },
  { id: 'es', label: 'Spain', value: 'ES' },
  { id: 'nl', label: 'Netherlands', value: 'NL' },
  { id: 'se', label: 'Sweden', value: 'SE' },
  { id: 'no', label: 'Norway', value: 'NO' },
  { id: 'dk', label: 'Denmark', value: 'DK' },
  { id: 'fi', label: 'Finland', value: 'FI' },
  { id: 'jp', label: 'Japan', value: 'JP' },
  { id: 'cn', label: 'China', value: 'CN' },
  { id: 'in', label: 'India', value: 'IN' },
  { id: 'br', label: 'Brazil', value: 'BR' },
  { id: 'mx', label: 'Mexico', value: 'MX' },
  { id: 'za', label: 'South Africa', value: 'ZA' },
  { id: 'ae', label: 'UAE', value: 'AE' },
  { id: 'bd', label: 'Bangladesh', value: 'BD' },
];
