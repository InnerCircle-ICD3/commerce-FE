import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

interface RootLayoutProps {
    children?: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar />
                <MainContent>{children}</MainContent>
            </div>

            {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
        </div>
    );
}
