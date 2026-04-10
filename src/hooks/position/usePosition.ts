import { useQuery } from "@tanstack/react-query";
import { PositionService } from "@/features/position/position.service";
import type { Position } from "@/features/position/position.type";

export function usePosition() {
	return useQuery<{ data: Position[] }>({
		queryKey: ["positions"],
		queryFn: () => PositionService.getAll(),
	});
}
