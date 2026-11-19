"use server";

import {
  createCategoryService,
  createResourceService,
  createSubCategoryService,
  createTopicService,
  deleteCategoryService,
  deleteResourceService,
  deleteSubCategoryService,
  deleteTopicService,
  ResourceConflictError,
  updateCategoryService,
  updateResourceService,
  updateSubCategoryService,
  updateTopicService,
} from "@l/service/s-resources";
import { requirePathAccess } from "@/lib/auth/server";
import type { FormState } from "@/types/forms";
import { CATEGORY_ROOT } from "@/types/resources";

const UUID_PATTERN = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

//===============================================================
// Shared helpers

function getTextField(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : null;
}

function invalidId(id: string, what: string): FormState {
  return UUID_PATTERN.test(id)
    ? null
    : { status: "error", message: `Select a valid ${what}.` };
}

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

// The name / url / type fields from the create and edit resource forms
function readResourceFields(
  formData: FormData,
):
  | { error: FormState }
  | { title: string; url: string; resourceTypeId: string } {
  const title = getTextField(formData, "title");
  const url = getTextField(formData, "url");
  const resourceTypeId = getTextField(formData, "resourceTypeId");

  const nameError = validateName(title);
  if (nameError || !title) return { error: nameError };

  if (!url || url.length > 2048) {
    return { error: { status: "error", message: "Enter a valid URL." } };
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { error: { status: "error", message: "Enter a valid URL." } };
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return { error: { status: "error", message: "Use an HTTP or HTTPS URL." } };
  }

  if (!resourceTypeId || !UUID_PATTERN.test(resourceTypeId)) {
    return {
      error: { status: "error", message: "Select a valid resource type." },
    };
  }

  return { title, url, resourceTypeId };
}

// The topic forms' "in" dropdown: CATEGORY_ROOT or a subcategory id
function readTopicParent(
  formData: FormData,
): { error: FormState } | { subCategoryId: string | null } {
  const parent = getTextField(formData, "parent");

  if (parent === CATEGORY_ROOT) {
    return { subCategoryId: null };
  }

  if (!parent || !UUID_PATTERN.test(parent)) {
    return {
      error: { status: "error", message: "Select where the topic goes." },
    };
  }

  return { subCategoryId: parent };
}

// Runs a service, turning its errors into a message for the form.
// ResourceConflictError messages are written for the user, anything else
// gets a generic message.
async function saveOrError(save: () => Promise<unknown>): Promise<FormState> {
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

//===============================================================
// Resources

export async function createResourceAction(
  topicId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(topicId, "topic");
  if (idError) return idError;

  const fields = readResourceFields(formData);
  if ("error" in fields) return fields.error;

  return saveOrError(() =>
    createResourceService(
      topicId,
      fields.title,
      fields.url,
      fields.resourceTypeId,
    ),
  );
}

export async function updateResourceAction(
  resourceId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(resourceId, "resource");
  if (idError) return idError;

  const fields = readResourceFields(formData);
  if ("error" in fields) return fields.error;

  return saveOrError(() =>
    updateResourceService(
      resourceId,
      fields.title,
      fields.url,
      fields.resourceTypeId,
    ),
  );
}

export async function deleteResourceAction(
  resourceId: string,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(resourceId, "resource");
  if (idError) return idError;

  return saveOrError(() => deleteResourceService(resourceId));
}

//===============================================================
// Categories

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

export async function updateCategoryAction(
  categoryId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(categoryId, "category");
  if (idError) return idError;

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  return saveOrError(() => updateCategoryService(categoryId, name));
}

export async function deleteCategoryAction(
  categoryId: string,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(categoryId, "category");
  if (idError) return idError;

  return saveOrError(() => deleteCategoryService(categoryId));
}

//===============================================================
// Subcategories

export async function createSubCategoryAction(
  categoryId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(categoryId, "category");
  if (idError) return idError;

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  return saveOrError(() => createSubCategoryService(categoryId, name));
}

export async function updateSubCategoryAction(
  subCategoryId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(subCategoryId, "subcategory");
  if (idError) return idError;

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  return saveOrError(() => updateSubCategoryService(subCategoryId, name));
}

export async function deleteSubCategoryAction(
  subCategoryId: string,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(subCategoryId, "subcategory");
  if (idError) return idError;

  return saveOrError(() => deleteSubCategoryService(subCategoryId));
}

//===============================================================
// Topics

export async function createTopicAction(
  categoryId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(categoryId, "category");
  if (idError) return idError;

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  const parent = readTopicParent(formData);
  if ("error" in parent) return parent.error;

  return saveOrError(() =>
    createTopicService(categoryId, parent.subCategoryId, name),
  );
}

export async function updateTopicAction(
  topicId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(topicId, "topic");
  if (idError) return idError;

  const name = getTextField(formData, "name");
  const nameError = validateName(name);
  if (nameError || !name) return nameError;

  const parent = readTopicParent(formData);
  if ("error" in parent) return parent.error;

  return saveOrError(() =>
    updateTopicService(topicId, parent.subCategoryId, name),
  );
}

export async function deleteTopicAction(topicId: string): Promise<FormState> {
  await requirePathAccess("/career/resources");

  const idError = invalidId(topicId, "topic");
  if (idError) return idError;

  return saveOrError(() => deleteTopicService(topicId));
}
