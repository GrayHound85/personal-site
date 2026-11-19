All done on `/career/resources`, no code changes.

## Add

| What        | Where                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| Category    | `+ category` under the category list                                     |
| Subcategory | Open the category → `+ subcategory`                                      |
| Topic       | Open the category → `+ topic`, pick "in" (the category or a subcategory) |
| Resource    | Open the topic → `+` in the resources panel                              |

## Edit or delete

Pencil buttons open an edit form with **Delete** at the bottom (asks to
confirm).

| Edit        | Pencil on                                  |
| ----------- | ------------------------------------------ |
| Category    | Category panel header, next to `← all`     |
| Subcategory | Its heading in the list                    |
| Topic       | Summary panel header (on the topic's page) |
| Resource    | Its row                                    |

- Only **empty** things can be deleted (no subcategories / topics /
  resources inside). Resources can always be deleted.
- Renaming keeps the URL (slugs never change).
- Names must be unique where they live.

## Resource types

No UI. Add with SQL → [Homelab: Database](Homelab-Database#add-resource-types)

## Code

- Forms: `apps/personal-site/src/components/sections/career/resource/`
- Actions: `apps/personal-site/src/app/actions/a-resource.ts`
- Rules (duplicates, "still has…", slugs): `apps/personal-site/src/lib/service/s-resources.ts`
