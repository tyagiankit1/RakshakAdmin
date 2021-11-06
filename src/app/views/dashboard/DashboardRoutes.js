import React from 'react'
import { authRoles } from '../../auth/authRoles'

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Analytics')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard2',
        component: React.lazy(() => import('./Analytics2')),
        auth: authRoles.sa,
    },
    {
        path: '/inventoryManagement',
        component: React.lazy(() => import('./InventoryManagement')),
        auth: authRoles.sa,
    }
]

export default dashboardRoutes
