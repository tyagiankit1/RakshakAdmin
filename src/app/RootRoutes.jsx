import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import influancerRoutes from './views/influancer/InfluancerRoutes'
import airlineRoutes from './views/airline/AirlineRoutes'
import cinemaRoutes from './views/cinema/CinemaRoutes'
import digitalRoutes from './views/digital/DigitalRoutes'
import magazineRoutes from './views/magazine/MagazineRoutes'
import newspaperRoutes from './views/newspaper/NewspaperRoutes'
import nontraditionalRoutes from './views/nontraditional/NonTraditionalRoutes'
import radioRoutes from './views/radio/RadioRoutes'
import televisionRoutes from './views/television/TelevisionRoutes'
import userRoutes from './views/user/UserRoutes'
import mechanicRoutes from './views/mechanic/MechanicRoutes'
import employeeRoutes from './views/employee/EmployeeRoutes'
import QRRoutes from './views/qr/QRRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'


import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'


const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/qrLot" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...influancerRoutes,
    ...airlineRoutes,
    ...cinemaRoutes,
    ...digitalRoutes,
    ...magazineRoutes,
    ...newspaperRoutes,
    ...nontraditionalRoutes,
    ...radioRoutes,
    ...televisionRoutes,
    ...materialRoutes,
    ...userRoutes,
    ...mechanicRoutes,
    ...employeeRoutes,
    ...QRRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...formsRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
