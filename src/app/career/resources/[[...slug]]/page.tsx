import {
  getResourceNavigation,
  getResourcePageContext,
  getResourcesByContext,
} from "@l/service/s-resources";

import ResourcePageClient from "../ResourcePageClient";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const navigation = await getResourceNavigation();

  const context = await getResourcePageContext(slug, navigation);
  const resourceList = await getResourcesByContext(context);

  return (
    <ResourcePageClient
      context={context}
      slug={slug}
      navigation={navigation}
      resourceList={resourceList}
    />
  );
}
