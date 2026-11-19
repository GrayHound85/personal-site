"use client";

import { useRouter } from "next/navigation";

import { createSubCategoryAction } from "@/app/actions/a-resource";
import type { ResourceNavigationCategory } from "@/types/resources";

import Field from "@c/ui/Field";
import Form from "@c/ui/Form";
import Input from "@c/ui/Input";
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
