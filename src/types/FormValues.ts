type LoginFormValues = {
  id: string;
  pw: string;
};

type EmailSignUpFormValues = {
  id: string;
  pw: string;
  pwConfirm: string;
  name: string;
  email: string;
  age: number;
};

export type { LoginFormValues, EmailSignUpFormValues };