import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    client: QueryClient;
}

export function TanstackQueryProviders({ children, client }: Props) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
