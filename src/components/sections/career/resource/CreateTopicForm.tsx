"use client";

import { useRouter } from "next/navigation";

import { createTopicAction } from "@/app/actions/a-resource";
import {
  CATEGORY_ROOT,
  type ResourceNavigationCategory,
} from "@/types/resources";

import Field from "@c/ui/Field";
import Form from "@c/ui/Form";
import Input from "@c/ui/Input";
import Select from "@c/ui/Select";
import FormHeading from "./FormHeading";

type CreateTopicFormProps = {
  category: ResourceNavigationCategory;
  onClose: () => void;
};

export default function CreateTopicForm({
  category,
  onClose,
}: CreateTopicFormProps) {
  const router = useRouter();

  // A topic goes either directly in the category or in one of its
  // subcategories
  const parentOptions = [
    { value: CATEGORY_ROOT, label: category.name, badge: "category" },
    ...category.subCategories.map((subCategory) => ({
      value: subCategory.id,
      label: subCategory.name,
    })),
  ];

  return (
    <Form
      action={createTopicAction.bind(null, category.id)}
      submitText="Add topic"
      pendingText="Adding..."
      onSuccess={() => {
        onClose();
        router.refresh();
      }}
      className="w-full sm:w-100"
    >
      <FormHeading title="New topic" context={`In ${category.name}`} />

      <Field label="name">
        <Input
          name="name"
          maxLength={255}
          placeholder="e.g. TypeScript"
          required
        />
      </Field>

      <Field label="in">
        <Select
          name="parent"
          options={parentOptions}
          defaultValue={CATEGORY_ROOT}
          required
        />
      </Field>
    </Form>
  );
}
