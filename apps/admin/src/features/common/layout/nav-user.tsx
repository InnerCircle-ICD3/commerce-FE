import { useSidebar } from "@/shared/components/ui/sidebar";
import { useUser } from "@/features/auth/stores/authStore";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface User {
    name: string;
    email: string;
    image?: string;
}

interface NavUserProps {
    user?: User; // optional로 변경
}

export function NavUser({ user: fallbackUser }: NavUserProps) {
    const { open } = useSidebar();
    const loggedInUser = useUser(); // zustand에서 실제 로그인한 사용자 정보 가져오기
    const { signOut } = useAuth();

    // 실제 로그인한 사용자 정보를 우선 사용
    const user = loggedInUser ||
        fallbackUser || {
            name: "관리자",
            email: "admin@example.com",
        };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="flex items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2 truncate">
                <div className="h-8 w-8 shrink-0 rounded-full bg-gray-100 dark:bg-zinc-800">
                    {user.image ? (
                        <img src={user.image} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <div className="grid h-full w-full place-items-center rounded-full bg-gray-100 text-sm font-medium uppercase dark:bg-zinc-800">
                            {user.name.charAt(0)}
                        </div>
                    )}
                </div>
                {open && (
                    <div className="truncate">
                        <div className="truncate text-sm font-medium">{user.name}</div>
                        <div className="truncate text-xs text-gray-500 dark:text-zinc-400">{user.email}</div>
                    </div>
                )}
            </div>
            {open && (
                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    aria-label="로그아웃"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
