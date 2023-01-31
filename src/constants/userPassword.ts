import type { PasswordRequirementItem } from '@/types';

export const currentDefaultPass = 'admin';
export const passMinLength = 5;

export const requirementsList: PasswordRequirementItem[] = [
  {
    id: 1,
    text: `Minimum ${passMinLength} characters `,
  },
  {
    id: 2,
    text: 'Only latin alphabet',
  },
  {
    id: 3,
    text: 'At least one number',
  },
];
