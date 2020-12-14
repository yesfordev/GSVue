/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue')
              },
              {
                path: '/datahub/koreanbank/1',
                name: 'GDP',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'GDP (국내총생산)', active: true }
                  ],
                  pageTitle: 'GDP (국내총생산)',
                  rule: 'editor'
                }
              },
              {
                path: '/datahub/koreanbank/2',
                name: 'Real-GDP-Growth',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'Real GDP Growth (경제성장률)', active: true }
                  ],
                  pageTitle: 'Real GDP Growth (경제성장률)',
                  rule: 'editor'
                }
              },
              {
                path: '/datahub/koreanbank/3',
                name: 'Inflation',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'Inflation (소비자물가등락률)', active: true }
                  ],
                  pageTitle: 'Inflation (소비자물가등락률)',
                  rule: 'editor'
                }
              },
              {
                path: '/datahub/koreanbank/4',
                name: 'Private-Consumption-Growth',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'Private Consumption Growth (민간소비증감률)', active: true }
                  ],
                  pageTitle: 'Private Consumption Growth (민간소비증감률)',
                  rule: 'editor'
                }
              },
              {
                path: '/datahub/koreanbank/5',
                name: 'Exchange-Rate',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'Exchange Rate (KRW/USD) (평균환율-원화의 대미달러)', active: true }
                  ],
                  pageTitle: 'Exchange Rate (KRW/USD) (평균환율-원화의 대미달러)',
                  rule: 'editor'
                }
              },
              // {
              //   path: '/datahub/koreanbank/6',
              //   name: 'Import',
              //   component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
              //   meta: {
              //     breadcrumb: [
              //       { title: 'Home', url: '/' },
              //       { title: 'Data Hub' },
              //       { title: '한국은행 지표 관리' },
              //       { title: 'Import (수입)', active: true }
              //     ],
              //     pageTitle: 'Import (수입)',
              //     rule: 'editor'
              //   }
              // },
              // {
              //   path: '/datahub/koreanbank/7',
              //   name: 'Export',
              //   component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
              //   meta: {
              //     breadcrumb: [
              //       { title: 'Home', url: '/' },
              //       { title: 'Data Hub' },
              //       { title: '한국은행 지표 관리' },
              //       { title: 'Export (수출)', active: true }
              //     ],
              //     pageTitle: 'Export (수출)',
              //     rule: 'editor'
              //   }
              // },
              {
                path: '/datahub/koreanbank/8',
                name: 'Population',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'Population (추계인구)', active: true }
                  ],
                  pageTitle: 'Population (추계인구)',
                  rule: 'editor'
                }
              },
              {
                path: '/datahub/koreanbank/9',
                name: 'Unemployment',
                component: () => import('./views/datahub/koranbank/Koreanbank.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Data Hub' },
                    { title: '한국은행 지표 관리' },
                    { title: 'Unemployment (실업률)', active: true }
                  ],
                  pageTitle: 'Unemployment (실업률)',
                  rule: 'editor'
                }
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
