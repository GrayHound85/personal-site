import BackgroundLayout from "@c/layout/BackgroundLayout";
import { getCategoriesService } from "@l/service/s-resources";

export default async function ResourcesPage() {
  const categories = await getCategoriesService();

  return (
    <BackgroundLayout background="subtle">
      <main className="flex flex-col w-full h-full items-center p-8">
        <h2 className="font-bold text-3xl text-text-secondary">Resources</h2>
        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </main>
    </BackgroundLayout>
  );
}
