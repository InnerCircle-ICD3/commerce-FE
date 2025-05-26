interface MenuItem {
    id: string;
    text: string;
    href?: string;
}

interface SubNavItemProps {
    text: string;
    href?: string;
    isLast: boolean;
}

function SubNavItem({ text, href = "#", isLast }: SubNavItemProps) {
    return (
        <a 
            href={href}
            className={`
                flex items-center justify-center h-6 flex-shrink-0 text-white hover:text-gray-300 transition-colors
                ${!isLast ? 'after:content-[""] after:h-4 after:w-px after:bg-white after:mx-5 after:inline-block' : ''}
            `}
        >
            <span className="text-base font-semibold whitespace-nowrap">{text}</span>
        </a>
    );
}

const menuItems: MenuItem[] = [
    { id: "sub-nav-1", text: "New 시즌 한정 커피", href: "#" },
    { id: "sub-nav-2", text: "더블 에스프레소 80ml", href: "#" },
    { id: "sub-nav-3", text: "추천 세트", href: "#" },
    { id: "sub-nav-4", text: "스타벅스 by 801 커피 for 버츄오", href: "#" },
    { id: "sub-nav-5", text: "디카페인", href: "#" },
    { id: "sub-nav-6", text: "그랑 룽고 150ml", href: "#" },
];

export function SubNav() {
    return (
        <nav aria-label="Sub Navigation" className="w-full bg-black text-white">
            <div className="flex items-center justify-center h-14 mx-auto max-w-screen-xl">
                <ul className="flex items-center justify-start w-full px-4 sm:px-6 lg:px-8 overflow-x-auto hide-scrollbar list-none m-0 p-0">
                    {menuItems.map((item, index) => (
                        <li key={item.id} className="flex items-center">
                            <SubNavItem 
                                text={item.text} 
                                href={item.href}
                                isLast={index === menuItems.length - 1} 
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default SubNav;
