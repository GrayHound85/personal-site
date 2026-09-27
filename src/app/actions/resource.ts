"use server";

export async function createResourceAction(formData: FormData) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const topicId = formData.get("topicId") as string;
  const resourceTypeId = formData.get("resourceTypeId") as string;
}
