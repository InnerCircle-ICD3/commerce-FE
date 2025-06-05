import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface AuthLayoutProps {
    children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
            {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
        </div>
    );
}
