import { TeacherService } from "@/features/teacher/teacher.service";
import { useQuery } from "@tanstack/react-query";

export function useTeacher(page: number = 0) {
	return useQuery({
		queryKey: ["teachers", page],
		queryFn: () =>
			TeacherService.getAll({
				page,
				size: 10,
				name: "",
				college: "",
				lavozim: "",
			}),
	});
}