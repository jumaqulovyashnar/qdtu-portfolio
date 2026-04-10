import { useQuery } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";

export function useTeacherId(id: number) {
	return useQuery({
		queryKey: ["teacher", id],
		queryFn: () => TeacherService.getById(id),
		enabled: !!id,
	});
}
