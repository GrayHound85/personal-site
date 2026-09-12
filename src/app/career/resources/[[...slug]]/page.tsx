import BackgroundLayout from "@c/layout/BackgroundLayout";
import {
  getResourceNavigation,
  getResourcePageContext,
} from "@l/service/s-resources";

import ResourceNavigation from "@c/sections/career/ResourceNav";
import ResourceHeader from "@c/sections/career/ResourceHeader";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const navigation = await getResourceNavigation();

  const context = await getResourcePageContext(slug, navigation);

  return (
    <BackgroundLayout background="subtle">
      <main className="flex flex-col w-full h-full">
        <ResourceHeader context={context} />
        <div className="flex h-full w-full">
          <ResourceNavigation navigation={navigation} context={context} />
        </div>
      </main>
    </BackgroundLayout>
  );
}
