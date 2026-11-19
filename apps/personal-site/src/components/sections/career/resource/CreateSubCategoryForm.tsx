"use client";

import { useRouter } from "next/navigation";

import { createSubCategoryAction } from "@/app/actions/a-resource";
import type { ResourceNavigationCategory } from "@/types/resources";

import Field from "@repo/ui/components/Field";
import Form from "@repo/ui/components/Form";
import Input from "@repo/ui/components/Input";
import FormHeading from "./FormHeading";

type CreateSubCategoryFormProps = {
  category: ResourceNavigationCategory;
  onClose: () => void;
};

export default function CreateSubCategoryForm({
  category,
  onClose,
}: CreateSubCategoryFormProps) {
  const router = useRouter();

  return (
    <Form
      action={createSubCategoryAction.bind(null, category.id)}
      submitText="Add subcategory"
      pendingText="Adding..."
      onSuccess={() => {
        onClose();
        router.refresh();
      }}
      className="w-full sm:w-100"
    >
      <FormHeading title="New subcategory" context={`In ${category.name}`} />

      <Field label="name">
        <Input
          name="name"
          maxLength={255}
          placeholder="e.g. Web Development"
          required
        />
      </Field>
    </Form>
  );
}
