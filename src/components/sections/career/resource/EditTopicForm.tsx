"use client";

import { useRouter } from "next/navigation";

import { deleteTopicAction, updateTopicAction } from "@/app/actions/a-resource";
import {
  CATEGORY_ROOT,
  type ResourceNavigationCategory,
  type ResourceNavigationTopic,
} from "@/types/resources";

import DeleteButton from "@c/ui/DeleteButton";
import Field from "@c/ui/Field";
import Form from "@c/ui/Form";
import Input from "@c/ui/Input";
import Select from "@c/ui/Select";
import FormHeading from "./FormHeading";

type EditTopicFormProps = {
  category: ResourceNavigationCategory;
  topic: ResourceNavigationTopic;
  // The subcategory the topic is in now, if any
  subCategoryId?: string;
  onClose: () => void;
};

export default function EditTopicForm({
  category,
  topic,
  subCategoryId,
  onClose,
}: EditTopicFormProps) {
  const router = useRouter();

  // Same choices as the new topic form: directly in the category, or in one
  // of its subcategories
  const parentOptions = [
    { value: CATEGORY_ROOT, label: category.name, badge: "category" },
    ...category.subCategories.map((subCategory) => ({
      value: subCategory.id,
      label: subCategory.name,
    })),
  ];

  return (
    <div className="flex w-full flex-col gap-6 sm:w-100">
      <Form
        action={updateTopicAction.bind(null, topic.id)}
        submitText="Save"
        onSuccess={() => {
          onClose();
          router.refresh();
        }}
      >
        <FormHeading title="Edit topic" context={`In ${category.name}`} />

        <Field label="name">
          <Input
            name="name"
            defaultValue={topic.name}
            maxLength={255}
            required
          />
        </Field>

        <Field label="in">
          <Select
            name="parent"
            options={parentOptions}
            defaultValue={subCategoryId ?? CATEGORY_ROOT}
            required
          />
        </Field>
      </Form>

      <div className="border-t border-white/10 pt-6">
        <DeleteButton
          action={deleteTopicAction.bind(null, topic.id)}
          name={topic.name}
          onDeleted={() => {
            // The topic's page is gone, so go back to its category
            onClose();
            router.push(`/career/resources/${category.slug}`);
          }}
        />
      </div>
    </div>
  );
}
