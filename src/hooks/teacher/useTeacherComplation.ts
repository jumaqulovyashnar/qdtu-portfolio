import { TeacherService } from "@/features/teacher/teacher.service";
import { useQuery } from "@tanstack/react-query";

export function useTeacherComplation(id: number) {
	return useQuery({
		queryKey: ["teacher-completion"],
		queryFn: () => TeacherService.completion(id),
		enabled: !!id,
	});
}
