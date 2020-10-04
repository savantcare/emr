module.exports = {
  title: "Patient file",
  description: "Big picture, server side and client side doc",

  evergreen: true, // Only support latest browser Ref: https://vuepress.vuejs.org/config/#evergreen

  /* Two consecutive asterisks ** in patterns matched against full pathname may have special meaning:
      A leading ** followed by a slash means match in all directories. For example, **slashfoo matches file or directory foo anywhere, the same as pattern foo. **slashfoo/bar matches file or directory bar anywhere that is directly under directory foo.
    A trailing /** matches everything inside. For example, abc/** matches all files inside directory abc, relative to the location of the .gitignore file, with infinite depth.
    Ref: https://stackoverflow.com/questions/29820791/git-ignore-node-modules-folder-everywhere
    Ref: https://github.com/vuejs/vuepress/issues/1700 
    Ref: https://forum.vuejs.org/t/vuepress-ignore-node-modules/47219/2
    Version of config after 7ac365ca6ff447513dbd828754c433ea441b4b1f 
      in vupress dev command:
        does not say "language does not exisit c++ etc" and 
        does not give ran out of memory error
      In vue-ress build command it still gives language does not exisit errors and fails to build
          Neded to add "!startstar/node_modules" for vuepress build command to stop complaining.

  */

  patterns: ["**/*.md", "!.vuepress", "!node_modules", "!**/node_modules"],
  plugins: ["tabs"],
  themeConfig: {
    nav: [
      { text: "Demo", link: "http://95.217.13.83/pf/abcd" },
      { text: "Github", link: "https://github.com/savantcare/emr" },
    ],
    sidebar: [
      {
        title: "Home", // required
        path: "/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 0, // optional, defaults to 1
        children: [
          {
            title: "FAQ",
            path: "/docs/faq",
            sidebarDepth: 0,
          },
        ],
      },
      {
        title: "Big picture",
        path: "/docs/",
        collapsable: true,
        sidebarDepth: 0,
        // How to do nested sidebar? https://github.com/vuejs/vuepress/issues/287#issuecomment-480805333
        children: [
          {
            path: "/webclient/docs/ui/",
            title: "UI",
            sidebarDepth: 0,
            children: [
              {
                path: "/webclient/docs/ui/why",
                title: "Why",
                sidebarDepth: 0,
              },
              {
                path: "/webclient/docs/ui/what",
                title: "What",
                sidebarDepth: 0,
              },
            ],
          },
          {
            path: "/docs/tech/",
            title: "Tech",
            sidebarDepth: 0,
            children: [
              {
                path: "/docs/tech/why",
                title: "Why",
                sidebarDepth: 0,
              },
              {
                path: "/docs/tech/what",
                title: "What",
                sidebarDepth: 0,
              },
              {
                path: "/docs/tech/how",
                title: "How",
                sidebarDepth: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Server",
        path: "/ptserver/",
        collapsable: true,
        sidebarDepth: 0,
        children: [
          {
            path: "/ptserver/docs/big-picture.html",
            title: "Big picture",
            sidebarDepth: 0,
          },
          {
            path: "/ptserver/docs/faq.html",
            title: "Faq",
            sidebarDepth: 0,
          },
        ],
      },
      {
        title: "Client",
        path: "/webclient/",
        collapsable: true,
        sidebarDepth: 0,
        children: [
          {
            path: "/webclient/store/",
            title: "vuex-orm",
            sidebarDepth: 0,
          },
          {
            path: "/webclient/cts/",
            title: "Components",
            sidebarDepth: 0,
            children: [
              {
                path: "/webclient/cts/ptinfo-single/allergies/",
                title: "Allergies",
                sidebarDepth: 0,
                children: [
                  {
                    path:
                      "/webclient/cts/ptinfo-single/allergies/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/bm/",
                title: "Body measurements",
                sidebarDepth: 0,
                children: [
                  {
                    path: "/webclient/cts/ptinfo-single/bm/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/contacts/",
                title: "Contacts",
                sidebarDepth: 0,
                children: [
                  {
                    path: "/webclient/cts/ptinfo-single/contacts/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/dx/",
                title: "Diagnosis",
                sidebarDepth: 0,
                children: [
                  {
                    path: "/webclient/cts/ptinfo-single/dx/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/documents/",
                title: "Documents",
                sidebarDepth: 0,
                children: [
                  {
                    path:
                      "/webclient/cts/ptinfo-single/documents/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/family-history/",
                title: "Family history",
                sidebarDepth: 0,
                children: [
                  {
                    path:
                      "/webclient/cts/ptinfo-single/family-history/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/medications/",
                title: "Medication",
                sidebarDepth: 0,
                children: [
                  {
                    path:
                      "/webclient/cts/ptinfo-single/medications/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/mse/",
                title: "Mental status exam",
                sidebarDepth: 0,
                children: [
                  {
                    path: "/webclient/cts/ptinfo-single/mse/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/pharmacy/",
                title: "Pharmacy",
                sidebarDepth: 0,
                children: [
                  {
                    path: "/webclient/cts/ptinfo-single/pharmacy/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/psych-review-of-systems/",
                title: "Psych review of systems",
                sidebarDepth: 0,
                children: [
                  {
                    path:
                      "/webclient/cts/ptinfo-single/psych-review-of-systems/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
              {
                path: "/webclient/cts/ptinfo-single/rec/",
                title: "Recommendations",
                sidebarDepth: 0,
              },
              {
                path: "/webclient/cts/ptinfo-single/scr/",
                title: "Screening",
                sidebarDepth: 0,
                children: [
                  {
                    path: "/webclient/cts/ptinfo-single/scr/design/design",
                    title: "Design",
                    sidebarDepth: 0,
                  },
                ],
              },
            ],
          },
          {
            title: "FAQ",
            path: "/webclient/docs/faq",
            sidebarDepth: 0,
          },
        ],
      },
      {
        title: "Glossary",
        path: "/docs/GLOSSARY",
        sidebarDepth: 0,
      },
    ],
  },
  /* Commented the 2 plugins in july 2020  Reasons:
  markdown: {
    
    > npm run docs-in-dev-mode was taking long time as it was processing all files
          Language does not exist: console                                                                                                                                                                                                                                                                      
          Language does not exist: cmd                                                                                                                                                                                                                                                                          
          Language does not exist: jsonc                                                                                                                                                                                                                                                                        
          Language does not exist: text                                                                                                                                                                                                                                                                         
          Language does not exist: dosini     
          Language does not exist: webidl  
          Language does not exist: c++                                                                                                                                                                                                                                                                          
          Language does not exist: html+erb          
    and it was giving the fatal error:
      FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory 

    extendMarkdown: (md) => {
      var Plugin = require("markdown-it-regexp");

      const elLinker = Plugin(/:(el):/, (match, utils) => {
        return `<a href="https://element.eleme.io/#/en-US" target="_blank">${match[1]}</a>`;
      });
      const dialogLinker = Plugin(/:(dialog):/, (match, utils) => {
        return `<a href="https://element.eleme.io/#/en-US/component/dialog#dialog" target="_blank">${match[1]}</a>`;
      });
      const tabsLinker = Plugin(/:(tabs):/, (match, utils) => {
        return `<a href="https://element.eleme.io/#/en-US/component/tabs#tabs" target="_blank">${match[1]}</a>`;
      });
      const tabpaneLinker = Plugin(/:(tab-pane):/, (match, utils) => {
        return `<a href="https://element.eleme.io/#/en-US/component/tabs#tabs" target="_blank">${match[1]}</a>`;
      });
      const ctLinker = Plugin(/:(Component):/, (match, utils) => {
        return `<a href="https://vuejs.org/v2/guide/components.html#Dynamic-Components" target="_blank">${match[1]}</a>`;
      });
      md.use(elLinker);
      md.use(dialogLinker);
      md.use(tabsLinker);
      md.use(tabpaneLinker);
      md.use(ctLinker);
      md.use(require("markdown-it-vuese"), {
        
      });
      
    },
  },*/
};
