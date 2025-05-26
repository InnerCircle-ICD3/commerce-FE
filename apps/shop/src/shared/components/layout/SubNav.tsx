import React from 'react';

interface SubNavItemProps {
    text: string;
}

function SubNavItem({ text }: SubNavItemProps) {
    return (
        <div className="flex items-center justify-center h-6 flex-shrink-0">
            <span className="text-base font-semibold whitespace-nowrap">{text}</span>
        </div>
    );
}

function SubNavSeparator() {
    return <div className="h-1 w-px bg-white mx-5 flex-shrink-0" />;
}

interface MenuItem {
    id: string;
    text: string;
}

const menuItems: MenuItem[] = [
    { id: "new-season", text: "New 시즌 한정 커피" },
    { id: "double-espresso", text: "더블 에스프레소 80ml" },
    { id: "recommended-set", text: "추천 세트" },
    { id: "starbucks-801", text: "스타벅스 by 801 커피 for 버츄오" },
    { id: "decaffeine", text: "디카페인" },
    { id: "grand-lungo", text: "그랑 룽고 150ml" },
];

export function SubNav() {
    return (
        <div className="w-full bg-black text-white">
            <div className="flex items-center justify-center h-14 mx-auto max-w-screen-xl">
                <div className="flex items-center justify-start w-full px-4 sm:px-6 lg:px-8 flex-nowrap overflow-x-auto hide-scrollbar">
                    <div className="flex items-center space-x-5 flex-nowrap min-w-min">
                        {menuItems.map((item) => (
                            <React.Fragment key={item.id}>
                                <SubNavItem text={item.text} />
                                {menuItems.indexOf(item) < menuItems.length - 1 && <SubNavSeparator />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubNav;
