import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

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
