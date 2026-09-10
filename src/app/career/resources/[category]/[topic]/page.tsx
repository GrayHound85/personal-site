import BackgroundLayout from "@c/layout/BackgroundLayout";
import { getResourceNavigation } from "@l/service/s-resources";

import ResourceNavigation from "@c/sections/career/ResourceNav";

export default async function ResourcesPage() {
  const navigation = await getResourceNavigation();

  return (
    <BackgroundLayout background="subtle">
      <main className="flex flex-col w-full h-full items-center p-8">
        <ResourceNavigation navigation={navigation} />
      </main>
    </BackgroundLayout>
  );
}
