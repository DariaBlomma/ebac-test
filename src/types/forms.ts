export type PasswordInputType = 'text' | 'password';
export type ChangePasswordPassInputNames = 'current' | 'new' | 'confirm';

export interface PasswordRequirementItem {
  id: number,
  text: string,
}

export interface ElOption {
  value: string,
  label: string,
}
