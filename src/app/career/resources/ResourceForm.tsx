"use client";

import { createResourceAction } from "@/app/actions/resource";

export default function ResourceForm() {
  async function handleSubmit(formData: FormData) {
    await createResourceAction(formData);
  }

  return (
    <form action={handleSubmit}>
      <input>dwadwad</input>
      <button type="submit">Create Resource</button>
    </form>
  );
}
