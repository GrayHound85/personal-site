import BackgroundLayout from "@c/layout/BackgroundLayout";
import {
  getResourceNavigation,
  getResourcePageContext,
} from "@l/service/s-resources";

import ResourceNavigation from "@c/sections/career/ResourceNav";
import ResourceHeader from "@c/sections/career/ResourceHeader";
import ResourceTopicDescription from "@c/sections/career/ResourceTopicDescription";
import ResourceList from "@c/sections/career/ResourcesList";

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
      <main className="flex flex-col w-full h-full gap-5">
        <ResourceHeader context={context} />
        <div className="flex flex-row h-full w-full gap-5 pb-5 pr-5">
          <ResourceNavigation navigation={navigation} context={context} />
          <div className="flex flex-col w-full h-full gap-5">
            <ResourceTopicDescription
              description={"fesfesf"}
              notesSlug={slug}
            />
            <ResourceList context={context} />
          </div>
        </div>
      </main>
    </BackgroundLayout>
  );
}
