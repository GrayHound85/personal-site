"use client";

import { useRouter } from "next/navigation";

import {
  deleteSubCategoryAction,
  updateSubCategoryAction,
} from "@/app/actions/a-resource";
import type {
  ResourceNavigationCategory,
  ResourceNavigationSubCategory,
} from "@/types/resources";

import DeleteButton from "@c/ui/DeleteButton";
import Field from "@c/ui/Field";
import Form from "@c/ui/Form";
import Input from "@c/ui/Input";
import FormHeading from "./FormHeading";

type EditSubCategoryFormProps = {
  category: ResourceNavigationCategory;
  subCategory: ResourceNavigationSubCategory;
  onClose: () => void;
};

export default function EditSubCategoryForm({
  category,
  subCategory,
  onClose,
}: EditSubCategoryFormProps) {
  const router = useRouter();

  function closeAndRefresh() {
    onClose();
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-6 sm:w-100">
      <Form
        action={updateSubCategoryAction.bind(null, subCategory.id)}
        submitText="Save"
        onSuccess={closeAndRefresh}
      >
        <FormHeading title="Edit subcategory" context={`In ${category.name}`} />

        <Field label="name">
          <Input
            name="name"
            defaultValue={subCategory.name}
            maxLength={255}
            required
          />
        </Field>
      </Form>

      <div className="border-t border-white/10 pt-6">
        <DeleteButton
          action={deleteSubCategoryAction.bind(null, subCategory.id)}
          name={subCategory.name}
          onDeleted={closeAndRefresh}
        />
      </div>
    </div>
  );
}
