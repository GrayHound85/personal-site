import type { ResourceNavigation } from "@/types/resources";

type ResourceNavigationProps = {
  navigation: ResourceNavigation;
};

export default function ResourceNavigation({
  navigation,
}: ResourceNavigationProps) {
  return (
    <nav>
      {navigation.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>

          {category.topics.length > 0 && (
            <ul>
              {category.topics.map((topic) => (
                <li key={topic.id}>{topic.name}</li>
              ))}
            </ul>
          )}

          {category.subCategories.map((subCategory) => (
            <div key={subCategory.id}>
              <h3>{subCategory.name}</h3>

              <ul>
                {subCategory.topics.map((topic) => (
                  <li key={topic.id}>{topic.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
