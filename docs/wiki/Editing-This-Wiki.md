The wiki is generated from the repo. **Don't edit it on GitHub**, changes are
overwritten on the next publish.

## Edit

1. Change files in `docs/wiki/` (one file per page).
2. Commit and push to `main`.
3. The **Publish wiki** workflow copies the folder here, committing as you.

| File           | Is                                                   |
| -------------- | ---------------------------------------------------- |
| `Home.md`      | The front page                                       |
| `_Sidebar.md`  | The menu on every page                               |
| `_Footer.md`   | The line at the bottom                               |
| `Some-Page.md` | Page "Some Page", linked as `[Some Page](Some-Page)` |

New page → add it to `_Sidebar.md` (and `Home.md` if it's a common task).

Keep `docs/site-guide.md` and the wiki in sync: change one, change the other
in the same commit.

## One-time setup (already done once)

Repo Settings → Features → tick **Wikis**, open the Wiki tab, create any first
page. That creates the wiki's git repo the workflow pushes to.
