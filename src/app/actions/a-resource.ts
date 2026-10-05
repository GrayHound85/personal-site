"use server";

import { createResourceService } from "@l/service/s-resources";
import { requirePathAccess } from "@/lib/auth/server";

export type CreateResourceActionState =
  | { status: "error"; message: string }
  | { status: "success" }
  | null;

const UUID_PATTERN = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function getTextField(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : null;
}

export async function createResourceAction(
  topicId: string,
  _state: CreateResourceActionState,
  formData: FormData,
): Promise<CreateResourceActionState> {
  await requirePathAccess("/career/resources");

  const title = getTextField(formData, "title");
  const url = getTextField(formData, "url");
  const resourceTypeId = getTextField(formData, "resourceTypeId");

  if (!UUID_PATTERN.test(topicId)) {
    return { status: "error", message: "Select a valid topic." };
  }

  if (!title || title.length > 255) {
    return {
      status: "error",
      message: "Enter a name of 255 characters or fewer.",
    };
  }

  if (!url || url.length > 2048) {
    return { status: "error", message: "Enter a valid URL." };
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { status: "error", message: "Enter a valid URL." };
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return { status: "error", message: "Use an HTTP or HTTPS URL." };
  }

  if (!resourceTypeId || !UUID_PATTERN.test(resourceTypeId)) {
    return { status: "error", message: "Select a valid resource type." };
  }

  try {
    await createResourceService(topicId, title, url, resourceTypeId);
  } catch {
    return {
      status: "error",
      message: "The resource could not be saved. Please try again.",
    };
  }

  return { status: "success" };
}
