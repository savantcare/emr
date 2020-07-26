[[toc]]

## How

### Q) How to start all dev servers?

```bash
> pwd
/Users/vk-tech/gt/sc-prog-repos/emr
> ./start-dev-servers-in-tmux.sh
```

### Q) How was documentation system installed?

```bash
yarn init

yarn add -D vuepress

echo '# Hello VuePress' > README.md

yarn docs:dev
```

### Q) How to install tmuxinator?

- On mac -> brew install tmuxinator
- on ubuntu -> apt install tmuxinator

## What

### Q) What is the core tech?

| Tech                                             | Stars  |
| ------------------------------------------------ | ------ |
| vue                                              | 167K   |
| vuex                                             | 24.2K  |
| vuex-orm                                         | 1.9K   |
| vuex-orm-search                                  | 29     |
| vuepress                                         | 16.9K  |
| [element.io](https://github.com/ElemeFE/element) | 46K    |
| nuxt                                             | 28K    |
| jest                                             | 31.6K  |
| puppeteer                                        | 62.8K  |
| sequelize                                        | 22.3K  |
| nodejs                                           |        |
| mariaDB system version                           |        |
| nginx                                            |        |
| Docker                                           |        |
| git                                              |        |
| github                                           |        |
| vscode                                           |        |
| tmux                                             |        |
| linux                                            |        |
| Total                                            | 372K + |

### Q) What are the vs code settings?

auto format on save
default formatter: prettier

![Formatter setting](../docs/images/misc/default-formatter.png)

## Why

### Q) Why is vue-press in parent folder of ptclient and ptserver?

vuepress cannot refer to files in parent folders. This vuepress will be used to document both client and server.
