"use client";

import { createResourceAction } from "@/app/actions/a-resource";

import type { ResourceType } from "@/types/resources";

import Input from "@c/ui/Input";
import DropDown from "@c/ui/DropDown";
import DropDownOption from "@c/ui/DropDownOption";
import Form from "@c/ui/Form";

type CreateResourceFormProps = {
  topicId?: string;
  resourceTypes: ResourceType[];
  onClose: () => void;
};

export default function CreateResourceForm({
  topicId,
  resourceTypes,
  onClose,
}: CreateResourceFormProps) {
  if (!topicId) {
    return <div>You have not selected a topic</div>;
  }

  const selectedTopicId = topicId;

  async function handleSubmit(formData: FormData) {
    await createResourceAction(selectedTopicId, formData);
    onClose();
  }

  return (
    <Form onSubmit={handleSubmit} submitText="Create Resource">
      <Input type="text" name="title" placeholder="Name" required />

      <Input type="text" name="url" placeholder="URL" required />

      <DropDown
        name="resourceTypeId"
        defaultValue=""
        placeholder="Select resource type"
        required
      >
        {resourceTypes.map((type) => (
          <DropDownOption key={type.id} value={type.id}>
            {type.code}
          </DropDownOption>
        ))}
      </DropDown>
    </Form>
  );
}
