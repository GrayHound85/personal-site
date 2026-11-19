// What every form's server action returns. null before the first submit.
export type FormState =
  | { status: "error"; message: string }
  | { status: "success" }
  | null;
