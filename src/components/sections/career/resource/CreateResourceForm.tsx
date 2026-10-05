"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createResourceAction } from "@/app/actions/a-resource";

import type { ResourceType } from "@/types/resources";

import Input from "@c/ui/Input";
import DropDown from "@/components/ui/DropDown";
import DropDownOption from "@c/ui/DropDownOption";
import Form from "@c/ui/Form";

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
  const [state, formAction, pending] = useActionState(
    createResourceAction.bind(null, topicId),
    null,
  );

  useEffect(() => {
    if (state?.status === "success") {
      onClose();
      router.refresh();
    }
  }, [onClose, router, state]);

  return (
    <Form
      action={formAction}
      error={state?.status === "error" ? state.message : null}
      pending={pending}
      pendingText="Creating resource..."
      submitText="Create Resource"
      className="w-full gap-4 sm:w-100 sm:gap-5"
    >
      <div className="flex flex-col gap-2">
        <label
          id="resource-type-label"
          htmlFor="resource-type"
          className="text-sm text-text-secondary"
        >
          Name
        </label>
        <Input
          aria-labelledby="resource-type-label"
          id="resource-title"
          maxLength={255}
          name="title"
          placeholder="Resource name"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resource-url" className="text-sm text-text-secondary">
          URL
        </label>
        <Input
          id="resource-url"
          maxLength={2048}
          name="url"
          placeholder="https://example.com"
          required
          type="url"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          id="resource-type-label"
          htmlFor="resource-type"
          className="text-sm text-text-secondary"
        >
          Resource type
        </label>
        <DropDown
          aria-labelledby="resource-type-label"
          id="resource-type"
          name="resourceTypeId"
          defaultValue=""
          placeholder="Select a resource type"
          required
        >
          {resourceTypes.map((type) => (
            <DropDownOption key={type.id} value={type.id}>
              {type.code}
            </DropDownOption>
          ))}
        </DropDown>
      </div>
    </Form>
  );
}
