"use client";

import { useRouter } from "next/navigation";

import { createCategoryAction } from "@/app/actions/a-resource";

import Field from "@repo/ui/components/Field";
import Form from "@repo/ui/components/Form";
import Input from "@repo/ui/components/Input";
import FormHeading from "./FormHeading";

type CreateCategoryFormProps = {
  onClose: () => void;
};

export default function CreateCategoryForm({
  onClose,
}: CreateCategoryFormProps) {
  const router = useRouter();

  return (
    <Form
      action={createCategoryAction}
      submitText="Add category"
      pendingText="Adding..."
      onSuccess={() => {
        onClose();
        router.refresh();
      }}
      className="w-full sm:w-100"
    >
      <FormHeading title="New category" />

      <Field label="name">
        <Input
          name="name"
          maxLength={255}
          placeholder="e.g. Programming"
          required
        />
      </Field>
    </Form>
  );
}
