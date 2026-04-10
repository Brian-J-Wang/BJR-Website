type BaseNavLink = {
    href: string;
    displayName: string;
};

type SimpleNavLink = BaseNavLink & {
    type: "simple";
};

type DropDownNavLink = BaseNavLink & {
    type: "dropdown";
    dropdownContent: NavLinkContent[];
};

export type NavLinkContent = {
    displayName: string;
    blurb: string;
    href: string;
};

export type NavLink = SimpleNavLink | DropDownNavLink;

export const navLinks: NavLink[] = [
    {
        type: "simple",
        href: "/",
        displayName: "Home",
    },
    {
        type: "dropdown",
        href: "/team",
        displayName: "Our Team",
        dropdownContent: [
            {
                displayName: "About Dr. Roberts",
                blurb: "",
                href: "/team#dr-roberts",
            },
            {
                displayName: "Our Doctors",
                blurb: "",
                href: "/team#doctors",
            },
            {
                displayName: "Our Staff",
                blurb: "",
                href: "/team#staff",
            },
        ],
    },
    {
        type: "dropdown",
        href: "/eye-surgery",
        displayName: "Eye Surgeries",
        dropdownContent: [
            //TODO: Add drop down content
        ],
    },
    {
        type: "dropdown",
        href: "/eye-exams",
        displayName: "Eye Exams",
        dropdownContent: [],
    },
    {
        type: "dropdown",
        href: "/resources",
        displayName: "Resources",
        dropdownContent: [],
    },
];
