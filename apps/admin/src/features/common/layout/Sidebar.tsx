import { Sidebar as SidebarUI, SidebarContent, SidebarFooter, SidebarRail } from "@/shared/components/ui/sidebar";
import { NavGroup } from "@/features/common/layout/nav-group";
import { NavUser } from "@/features/common/layout/nav-user";
import { sidebarData } from "./data/sidebar-data";

export default function Sidebar() {
    return (
        <SidebarUI collapsible="icon" variant="floating" className="border-r border-gray-200 dark:border-zinc-800">
            <SidebarContent>
                {sidebarData.navGroups.map(props => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </SidebarUI>
    );
}
