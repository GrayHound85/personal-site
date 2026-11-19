"use client";

import { useRouter } from "next/navigation";

import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/actions/a-resource";
import type { ResourceNavigationCategory } from "@/types/resources";

import DeleteButton from "@repo/ui/components/DeleteButton";
import Field from "@repo/ui/components/Field";
import Form from "@repo/ui/components/Form";
import Input from "@repo/ui/components/Input";
import FormHeading from "./FormHeading";

type EditCategoryFormProps = {
  category: ResourceNavigationCategory;
  onClose: () => void;
};

export default function EditCategoryForm({
  category,
  onClose,
}: EditCategoryFormProps) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-6 sm:w-100">
      <Form
        action={updateCategoryAction.bind(null, category.id)}
        submitText="Save"
        onSuccess={() => {
          onClose();
          router.refresh();
        }}
      >
        <FormHeading title="Edit category" />

        <Field label="name">
          <Input
            name="name"
            defaultValue={category.name}
            maxLength={255}
            required
          />
        </Field>
      </Form>

      <div className="border-t border-white/10 pt-6">
        <DeleteButton
          action={deleteCategoryAction.bind(null, category.id)}
          name={category.name}
          onDeleted={() => {
            onClose();
            router.push("/career/resources");
          }}
        />
      </div>
    </div>
  );
}
