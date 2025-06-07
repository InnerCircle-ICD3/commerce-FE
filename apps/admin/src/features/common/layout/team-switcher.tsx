import { useState } from "react";
import { useSidebar } from "@/shared/components/ui/sidebar";
import { ChevronDown } from "lucide-react";

interface Team {
  name: string;
  value: string;
}

interface TeamSwitcherProps {
  teams: Team[];
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { open } = useSidebar();
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectTeam = (team: Team) => {
    setSelectedTeam(team);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full px-2">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-md border p-2 text-left text-sm hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded bg-primary text-white">
            {selectedTeam.name.charAt(0)}
          </div>
          {open && (
            <div>
              <div className="text-sm font-medium">{selectedTeam.name}</div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-950">
          <div className="py-1">
            {teams.map((team) => (
              <button
                type="button"
                key={team.value}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 ${
                  selectedTeam.value === team.value
                    ? "bg-gray-100 dark:bg-zinc-800"
                    : ""
                }`}
                onClick={() => selectTeam(team)}
              >
                <div className="grid h-6 w-6 place-items-center rounded bg-primary text-white">
                  {team.name.charAt(0)}
                </div>
                <div className="text-sm font-medium">{team.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
