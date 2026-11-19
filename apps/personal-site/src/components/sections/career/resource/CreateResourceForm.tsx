"use client";

import { useRouter } from "next/navigation";

import { createResourceAction } from "@/app/actions/a-resource";
import type { ResourceType } from "@/types/resources";

import Field from "@repo/ui/components/Field";
import Form from "@repo/ui/components/Form";
import Input from "@repo/ui/components/Input";
import Select from "@repo/ui/components/Select";
import FormHeading from "./FormHeading";

type CreateResourceFormProps = {
  topicId: string;
  resourceTypes: ResourceType[];
  onClose: () => void;
};

export default function CreateResourceForm({
  topicId,
  resourceTypes,
  onClose,
}: CreateResourceFormProps) {
  const router = useRouter();

  return (
    <Form
      action={createResourceAction.bind(null, topicId)}
      submitText="Add resource"
      pendingText="Adding..."
      onSuccess={() => {
        onClose();
        router.refresh();
      }}
      className="w-full sm:w-100"
    >
      <FormHeading title="New resource" />

      <Field label="name">
        <Input
          name="title"
          maxLength={255}
          placeholder="Resource name"
          required
        />
      </Field>

      <Field label="url">
        <Input
          name="url"
          type="url"
          maxLength={2048}
          placeholder="https://example.com"
          required
        />
      </Field>

      <Field label="type">
        <Select
          name="resourceTypeId"
          placeholder="Select a resource type"
          required
          options={resourceTypes.map((type) => ({
            value: type.id,
            label: type.code,
          }))}
        />
      </Field>
    </Form>
  );
}
