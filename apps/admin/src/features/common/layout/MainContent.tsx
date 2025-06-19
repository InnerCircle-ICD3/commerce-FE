import { Outlet } from "@tanstack/react-router";

interface MainContentProps {
    children?: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
    return (
        <main className="ml-64 flex-1 p-8">
            <Outlet />
            {children}
        </main>
    );
}
