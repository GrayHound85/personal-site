"use server";

import { createResourceService } from "@l/service/s-resources";

export async function createResourceAction(
  topicId: string,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const resourceTypeId = formData.get("resourceTypeId") as string;

  await createResourceService(topicId, title, url, resourceTypeId);
}
