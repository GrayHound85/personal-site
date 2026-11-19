Two files: a server action and a form component.

## Server action

`apps/personal-site/src/app/actions/a-<area>.ts`

```ts
"use server";

import { requirePathAccess } from "@/lib/auth/server";
import type { FormState } from "@repo/ui/types/forms";

export async function createThingAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/things"); // always first

  const name = formData.get("name");
  if (typeof name !== "string" || name.trim().length === 0) {
    return { status: "error", message: "Enter a name." };
  }

  try {
    await createThingService(name.trim());
  } catch {
    return { status: "error", message: "Could not save. Please try again." };
  }

  return { status: "success" };
}
```

Returns: `{ status: "error", message }` (shown above the button),
`{ status: "success" }` (runs `onSuccess`), or a `redirect()`.
Extra id argument? Put it first and `.bind(null, id)` in the form.

## Form component

```tsx
"use client";

import { useRouter } from "next/navigation";

import { createThingAction } from "@/app/actions/a-thing";
import Field from "@repo/ui/components/Field";
import Form from "@repo/ui/components/Form";
import Input from "@repo/ui/components/Input";
import Select from "@repo/ui/components/Select";

export default function CreateThingForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <Form
      action={createThingAction}
      submitText="Add thing"
      pendingText="Adding..."
      onSuccess={() => {
        onClose();
        router.refresh();
      }}
    >
      <Field label="name">
        <Input name="name" required />
      </Field>
      <Field label="kind">
        <Select
          name="kind"
          placeholder="Select a kind"
          required
          options={[
            { value: "a", label: "Kind A", badge: "default" },
            { value: "b", label: "Kind B" },
          ]}
        />
      </Field>
    </Form>
  );
}
```

- `name` on a field = the key for `formData.get(...)`.
- Validate in the action too, not just with `required`.
- Labels lowercase. Delete in an edit form:
  `<DeleteButton action={deleteThingAction.bind(null, id)} name={thing.name} onDeleted={...} />`
- Modal example: `ResourcesList.tsx` → `onOpenModal`.
