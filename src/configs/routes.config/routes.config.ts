import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'userList',
        path: '/user',
        component: lazy(() => import('@/views/UserList')),
        authority: [],
    },
    {
        key: 'userEdit',
        path: '/user/edit/:userId',
        component: lazy(() => import('@/views/UserEdit')),
        authority: [],
    },
    {
        key: 'usherGroupList',
        path: '/usher-group',
        component: lazy(() => import('@/views/UsherGroupList')),
        authority: [],
    },
    {
        key: 'usherGroupEdit',
        path: `/usher-group/edit/:userGroupId`,
        component: lazy(() => import('@/views/UsherGroupEdit')),
        authority: [],
        meta: {
            header: 'Edit Usher Group',
        },
    },

    {
        key: 'usherGroupNew',
        path: `/usher-group/new`,
        component: lazy(() => import('@/views/UsherGroupNew')),
        authority: [],
        meta: {
            header: 'Edit Usher Group',
        },
    },
    {
        key: 'ScheduleNew',
        path: `/schedule/new`,
        component: lazy(() => import('@/views/Schedule')),
        authority: [],
        meta: {
            header: 'Edit Usher Group',
        },
    },
    {
        key: 'AbsentList',
        path: `/absent`,
        component: lazy(() => import('@/views/AbsentList')),
        authority: [],
        meta: {
            header: 'AbsentList',
        },
    },
    {
        key: 'Add Absence',
        path: `/absent/new`,
        component: lazy(() => import('@/views/AbsentNew')),
        authority: [],
        meta: {
            header: 'AbsentList',
        },
    },
    {
        key: 'scheduleList',
        path: '/schedule',
        component: lazy(() => import('../../views/ScheduleList')),
        authority: [],
    },
    {
        key: 'scheduleListToken',
        path: '/schedule/:weekId',
        component: lazy(() => import('../../views/ScheduleReplace')),
        authority: [],
    },
    {
        key: 'scheduleListTokenCheck',
        path: '/schedule/Um0Us0UeFrVWL52jIX3JWJ1tx+Nc94oAojNDWlchk4jgwLNoli5LQxlCnS7RkwHaY3Wac4+SZ/QlG+ENUxcMapUMJ2BCWQ77LO3w1tRjZ7PP+nTxS1r5VIMNkJiBHVU4cgiS3vME335FUWIYvTgS2FZOX9fIOwrM',
        component: lazy(() => import('../../views/ScheduleList')),
        authority: [],
    },

    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]