import {
  getResourceNavigation,
  getResourcePageContext,
  getResourcesByContext,
  getAllResourceTypes,
} from "@l/service/s-resources";

import ResourcePageClient from "../ResourcePageClient";

export const dynamic = "force-dynamic";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const navigation = await getResourceNavigation();
  const resourceTypes = await getAllResourceTypes();
  const context = await getResourcePageContext(slug, navigation);
  const resourceList = await getResourcesByContext(context, resourceTypes);

  return (
    <ResourcePageClient
      context={context}
      slug={slug}
      navigation={navigation}
      resourceList={resourceList}
      resourceTypes={resourceTypes}
    />
  );
}
