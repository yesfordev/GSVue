/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/",
  //   name: "Home",
  //   slug: "home",
  //   icon: "HomeIcon",
  // },
  // {
  //   url: "/page2",
  //   name: "Page 2",
  //   slug: "page2",
  //   icon: "FileIcon",
  // }
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: null,
    name: "Data Hub",
    icon: 'PieChartIcon',
    submenu: [
      {
        url: null,
        name: '한국은행 지표 관리',
        slug: 'datahub-koreanbank',
        submenu: [
          {
            url: '/datahub/koreanbank/1',
            name: 'GDP (국내총생산)',
            slug: 'datahub-koreanbank-gdp'
          },
          {
            url: '/datahub/koreanbank/2',
            name: 'Real GDP Growth (경제성장률)',
            slug: 'datahub-koreanbank-rgg'
          },
          {
            url: '/datahub/koreanbank/3',
            name: 'Inflation (소비자물가등락률)',
            slug: 'datahub-koreanbank-inflation'
          },
          {
            url: '/datahub/koreanbank/4',
            name: 'Private Consumption Growth (민간소비증감률)',
            slug: 'datahub-koreanbank-pcg'
          },
          {
            url: '/datahub/koreanbank/5',
            name: 'Exchange Rate(KRW/USD) (평균환율-원화의 대미달러)',
            slug: 'datahub-koreanbank-er'
          },
          {
            url: '/datahub/koreanbank/6',
            name: 'Import (수입)',
            slug: 'datahub-koreanbank-import'
          },
          {
            url: '/datahub/koreanbank/7',
            name: 'Export (수출)',
            slug: 'datahub-koreanbank-export'
          },
          {
            url: '/datahub/koreanbank/8',
            name: 'Population (추계인구)',
            slug: 'datahub-koreanbank-population'
          },
          {
            url: '/datahub/koreanbank/9',
            name: 'unemployment (실업률)',
            slug: 'datahub-koreanbank-unemployment'
          }
        ]
      },
      {
        url: '/datahub/construct',
        name: '건축물대장 관리',
        slug: 'datahub-construct'
      },
      {
        url: '/datahub/license',
        name: '인허가정보 관리',
        slug: 'datahub-license'
      }
    ]
  },
  {
    url: null,
    name: "Model",
    slug: "model",
    icon: 'GridIcon'
  },
  {
    url: "/help",
    name: "Help",
    slug: "help",
    icon: 'HelpCircleIcon'
  }
]
