"use server";

import {
  createCategoryService,
  createResourceService,
  createSubCategoryService,
  createTopicService,
  ResourceConflictError,
} from "@l/service/s-resources";
import { requirePathAccess } from "@/lib/auth/server";
import type { FormState } from "@/types/forms";
import { CATEGORY_ROOT } from "@/types/resources";

const UUID_PATTERN = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function getTextField(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : null;
}

export async function createResourceAction(
  topicId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
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

//===============================================================
// Categories, subcategories and topics

function validateName(name: string | null): FormState {
  if (!name) {
    return { status: "error", message: "Enter a name." };
  }

  if (name.length > 255) {
    return {
      status: "error",
      message: "Enter a name of 255 characters or fewer.",
    };
  }

  return null;
}

// Runs a create service, turning its errors into a message for the form
async function saveOrError(save: () => Promise<void>): Promise<FormState> {
  try {
    await save();
  } catch (error) {
    if (error instanceof ResourceConflictError) {
      return { status: "error", message: error.message };
    }

    return {
      status: "error",
      message: "That could not be saved. Please try again.",
    };
  }

  return { status: "success" };
}

export async function createCategoryAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  return saveOrError(() => createCategoryService(name));
}

export async function createSubCategoryAction(
  categoryId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  if (!UUID_PATTERN.test(categoryId)) {
    return { status: "error", message: "Select a valid category." };
  }

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  return saveOrError(() => createSubCategoryService(categoryId, name));
}

export async function createTopicAction(
  categoryId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  if (!UUID_PATTERN.test(categoryId)) {
    return { status: "error", message: "Select a valid category." };
  }

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  // Either CATEGORY_ROOT or the id of a subcategory in this category
  const parent = getTextField(formData, "parent");

  if (parent !== CATEGORY_ROOT && (!parent || !UUID_PATTERN.test(parent))) {
    return { status: "error", message: "Select where the topic goes." };
  }

  const subCategoryId = parent === CATEGORY_ROOT ? null : parent;

  return saveOrError(() => createTopicService(categoryId, subCategoryId, name));
}
