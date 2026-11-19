"use client";

import { useRouter } from "next/navigation";

import {
  deleteResourceAction,
  updateResourceAction,
} from "@/app/actions/a-resource";
import type { Resource, ResourceType } from "@/types/resources";

import DeleteButton from "@c/ui/DeleteButton";
import Field from "@c/ui/Field";
import Form from "@c/ui/Form";
import Input from "@c/ui/Input";
import Select from "@c/ui/Select";
import FormHeading from "./FormHeading";

type EditResourceFormProps = {
  resource: Resource;
  resourceTypes: ResourceType[];
  onClose: () => void;
};

export default function EditResourceForm({
  resource,
  resourceTypes,
  onClose,
}: EditResourceFormProps) {
  const router = useRouter();

  function closeAndRefresh() {
    onClose();
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-6 sm:w-100">
      <Form
        action={updateResourceAction.bind(null, resource.id)}
        submitText="Save"
        onSuccess={closeAndRefresh}
      >
        <FormHeading title="Edit resource" />

        <Field label="name">
          <Input
            name="title"
            defaultValue={resource.title}
            maxLength={255}
            required
          />
        </Field>

        <Field label="url">
          <Input
            name="url"
            type="url"
            defaultValue={resource.url}
            maxLength={2048}
            required
          />
        </Field>

        <Field label="type">
          <Select
            name="resourceTypeId"
            defaultValue={resource.type.id}
            required
            options={resourceTypes.map((type) => ({
              value: type.id,
              label: type.code,
            }))}
          />
        </Field>
      </Form>

      <div className="border-t border-white/10 pt-6">
        <DeleteButton
          action={deleteResourceAction.bind(null, resource.id)}
          name={resource.title}
          onDeleted={closeAndRefresh}
        />
      </div>
    </div>
  );
}
