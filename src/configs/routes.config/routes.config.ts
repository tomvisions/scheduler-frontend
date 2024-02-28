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
            header: 'Edit Gallery',
        },
    },
    {
        key: 'gallerList',
        path: '/gallery',
        component: lazy(() => import('@/views/GalleryList')),
        authority: [],
    },
    {
        key: 'galleryEdit',
        path: `/gallery/edit/:galleryId`,
        component: lazy(() => import('@/views/GalleryEdit')),
        authority: [],
        meta: {
            header: 'Edit Gallery',
        },
    },
    {
        key: 'imageListByGalleryId',
        path: '/image/:galleryId',
        component: lazy(() => import('@/views/ImageListtByGalleryId')),
        authority: [],
    },
    {
        key: 'imageList',
        path: '/image',
        component: lazy(() => import('@/views/ImageList')),
        authority: [],
    },
    {
        key: 'imageEdit',
        path: '/image/edit/:imageId',
        component: lazy(() => import('@/views/ImageEdit')),
        authority: [],
    },
    {
        key: 'tag',
        path: '/tag',
        component: lazy(() => import('@/views/TagList')),
        authority: [],
    },
    {
        key: 'tagNew',
        path: '/tag/new',
        component: lazy(() => import('@/views/TagNew')),
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