import { authRoles } from './auth/authRoles'

export const navigations = [
    // {
    //     name: 'Dashboard',
    //     path: '/dashboard',
    //     icon: 'dashboard',
    // },
    // {
    //     name: 'Dashboard2',
    //     path: '/dashboard2',
    //     icon: 'dashboard',
    // },
    // {
    //     name: 'InventoryManagement',
    //     path: '/inventoryManagement',
    //     icon: 'dashboard',
    // },
    
    {
        name: 'Employee Details',
        icon: 'person',
        children: [
            {
                name: 'Add New Employee',
                iconText: 'IA',
                path: '/employee/add',
            },
            {
                name: 'Employee List',
                iconText: 'UL',
                path: '/employee/list',
            }            
        ],
    },    
    {
        name: 'QR Details',
        icon: 'dashboard',
        children: [
            {
                name: 'QR Lot List',
                iconText: 'UL',
                path: '/qrLot',
            },
            // {
            //     name: 'Add New Influancer',
            //     iconText: 'IA',
            //     path: '/influancer/create',
            // }
        ],
    },
    {
        name: 'User List',
        icon: 'person',
        path: '/user/list'
    },
    {
        name: 'Mechanic Details',
        icon: 'dashboard',
        children: [
            {
                name: 'Mechanic List',
                iconText: 'UL',
                path: '/mechanic/list',
            },
            // {
            //     name: 'Add Mechanic',
            //     iconText: 'UL',
            //     path: '/mechanic/add',
            // },
            // {
            //     name: 'Add New Influancer',
            //     iconText: 'IA',
            //     path: '/influancer/create',
            // }
        ],
    },
    // {
    //     name: 'Vehicle Deails List',
    //     icon: 'directions_car',
    //     path: '/airline/list',
       
    // },
    
    // {
    //     name: 'Digital Portal',
    //     icon: 'person',
    //     path: '/influancer/list',
    //     children: [
    //         {
    //             name: 'Digital List',
    //             iconText: 'IL',
    //             path: '/digital/list',
    //         },
    //         {
    //             name: 'Add New Digital',
    //             iconText: 'IA',
    //             path: '/digital/create',
    //         }
    //     ],
    // },
    // {
    //     name: 'Magazine Portal',
    //     icon: 'person',
    //     path: '/magazine/list',
    //     children: [
    //         {
    //             name: 'Magazine List',
    //             iconText: 'IL',
    //             path: '/magazine/list',
    //         },
    //         {
    //             name: 'Add New Magazine',
    //             iconText: 'IA',
    //             path: '/magazine/create',
    //         }
    //     ],
    // },
    // {
    //     name: 'Newspaper Portal',
    //     icon: 'person',
    //     path: '/newspaper/list',
    //     children: [
    //         {
    //             name: 'Newspaper List',
    //             iconText: 'IL',
    //             path: '/newspaper/list',
    //         },
    //         {
    //             name: 'Add New Newspaper',
    //             iconText: 'IA',
    //             path: '/newspaper/create',
    //         }
    //     ],
    // },
    // {
    //     name: 'Non Traditional Portal',
    //     icon: 'person',
    //     path: '/nontraditional/list',
    //     children: [
    //         {
    //             name: 'Non Traditional List',
    //             iconText: 'IL',
    //             path: '/nontraditional/list',
    //         },
    //         {
    //             name: 'Add New Non Traditional',
    //             iconText: 'IA',
    //             path: '/nontraditional/create',
    //         }
    //     ],
    // },
    // {
    //     name: 'Radio Portal',
    //     icon: 'person',
    //     path: '/radio/list',
    //     children: [
    //         {
    //             name: 'Radio List',
    //             iconText: 'IL',
    //             path: '/radio/list',
    //         },
    //         {
    //             name: 'Add New Radio',
    //             iconText: 'IA',
    //             path: '/radio/create',
    //         }
    //     ],
    // },
    // {
    //     name: 'Television Portal',
    //     icon: 'person',
    //     path: '/television/list',
    //     children: [
    //         {
    //             name: 'Television List',
    //             iconText: 'IL',
    //             path: '/television/list',
    //         },
    //         {
    //             name: 'Add New Television',
    //             iconText: 'IA',
    //             path: '/television/create',
    //         }
    //     ],
    // },

    // {
    //     label: 'Pages',
    //     type: 'label',
    // },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    
    // {
    //     label: 'Components',
    //     type: 'label',
    // },
    // {
    //     name: 'Components',
    //     icon: 'favorite',
    //     badge: { value: '30+', color: 'secondary' },
    //     children: [
    //         {
    //             name: 'Auto Complete',
    //             path: '/material/autocomplete',
    //             iconText: 'A',
    //         },
    //         {
    //             name: 'Buttons',
    //             path: '/material/buttons',
    //             iconText: 'B',
    //         },
    //         {
    //             name: 'Checkbox',
    //             path: '/material/checkbox',
    //             iconText: 'C',
    //         },
    //         {
    //             name: 'Dialog',
    //             path: '/material/dialog',
    //             iconText: 'D',
    //         },
    //         {
    //             name: 'Drag and Drop',
    //             iconText: 'D',
    //             path: '/others/drag-and-drop',
    //         },
    //         {
    //             name: 'Expansion Panel',
    //             path: '/material/expansion-panel',
    //             iconText: 'E',
    //         },
    //         {
    //             name: 'Form',
    //             path: '/material/form',
    //             iconText: 'F',
    //         },
    //         {
    //             name: 'Icons',
    //             path: '/material/icons',
    //             iconText: 'I',
    //         },
    //         {
    //             name: 'Menu',
    //             path: '/material/menu',
    //             iconText: 'M',
    //         },
    //         {
    //             name: 'Progress',
    //             path: '/material/progress',
    //             iconText: 'P',
    //         },
    //         {
    //             name: 'Radio',
    //             path: '/material/radio',
    //             iconText: 'R',
    //         },
    //         {
    //             name: 'Switch',
    //             path: '/material/switch',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Slider',
    //             path: '/material/slider',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Snackbar',
    //             path: '/material/snackbar',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Table',
    //             path: '/material/table',
    //             iconText: 'T',
    //         },
    //     ],
    // },
    // {
    //     name: 'Utilities',
    //     icon: 'format_list_bulleted',
    //     children: [
    //         {
    //             name: 'Color',
    //             path: '/utilities/color',
    //             iconText: 'C',
    //             auth: authRoles.admin,
    //         },
    //         {
    //             name: 'Spacing',
    //             path: '/utilities/spacing',
    //             iconText: 'S',
    //             auth: authRoles.admin,
    //         },
    //         {
    //             name: 'Typography',
    //             path: '/utilities/typography',
    //             iconText: 'T',
    //         },
    //         {
    //             name: 'Display',
    //             path: '/utilities/display',
    //             iconText: 'D',
    //         },
    //         {
    //             name: 'Position',
    //             path: '/utilities/position',
    //             iconText: 'P',
    //         },
    //         {
    //             name: 'Shadow',
    //             path: '/utilities/shadow',
    //             iconText: 'S',
    //         },
    //     ],
    // },
    // {
    //     name: 'Charts',
    //     icon: 'trending_up',
    //     children: [
    //         {
    //             name: 'Echarts',
    //             path: '/charts/echarts',
    //             iconText: 'E',
    //         }
    //     ],
    // },
    // {
    //     name: 'Maps',
    //     icon: 'trending_up',
    //     path: '/map'
    // },
    // {
    //     name: 'Documentation',
    //     icon: 'launch',
    //     type: 'extLink',
    //     path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },
]
