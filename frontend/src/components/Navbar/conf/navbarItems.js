export const navItemsLogged = [
    {
        name: "Inicio",
        icon: "circle-user",
        link: "/home",
        subItems: [
            {
                name: "Home",
                icon: "calendar",
                link: "/otroSitio",
            },
            {
                name: "Home2",
                icon: "calendar",
                link: "/otroSitio5",
            },
            {
                name: "Home3",
                icon: "calendar",
                link: "/otroSitio4",
            },
            {
                name: "Home4",
                icon: "calendar",
                link: "/otroSitio3",
            },
            {
                name: "Home5",
                icon: "calendar",
                link: "/otroSitio2",
            },
        ]
    },
    {
        name: "Calendario",
        icon: "calendar",
        link: "/calendar",
    },
    {
        name: "Calendario3",
        icon: "calendar",
        link: "/calendar4",
    }
];

export const navItemsNoLogged = [
    // center
    [
        {
            name: "Inicio",
            link: "/",
        },
        {
            name: "Link left 2",
            link: "/calendar4",
        }
    ],
    // right
    [
        {
            name: "Iniciar sesión",
            link: "/login",
        },
        {
            name: "Obtener gratis",
            link: "/signup",
            className: 'get-free'
        }
    ]
];