import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileService } from "@/features/file/file.service";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { ProfileEditRequest, ProfileFormData } from "@/features/teacher/teacher.type";

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: ProfileFormData) => {
			const payload: ProfileEditRequest = {
				id: input.id,
			};

			// Fayl upload qilish - imageUri
			if (input.imageUri && input.imageUri instanceof File) {
				const uploadedUrl = await fileService.uploadImage(input.imageUri);
				if (uploadedUrl) {
					payload.imgUrl = uploadedUrl;
				}
			}

			// Fayl upload qilish - fileUrl (Rezyume)
			if (input.fileUrl && input.fileUrl instanceof File) {
				const uploadedUrl = await fileService.uploadFile(input.fileUrl);
				if (uploadedUrl) {
					payload.fileUrl = uploadedUrl;
				}
			}

			// Faqat o'zgargan fieldlarni payload ga qo'sh
			// Barcha fieldlar optional, undefined bo'lmaganlarini yuborish
			if (input.fullName !== undefined) payload.fullName = input.fullName;
			if (input.phoneNumber !== undefined) payload.phoneNumber = input.phoneNumber;
			if (input.email !== undefined) payload.email = input.email;
			if (input.biography !== undefined) payload.biography = input.biography;
			if (input.input !== undefined) payload.input = input.input;
			if (input.age !== undefined) payload.age = input.age;
			if (input.orcid !== undefined) payload.orcid = input.orcid;
			if (input.scopusid !== undefined) payload.scopusid = input.scopusid;
			if (input.scienceId !== undefined) payload.scienceId = input.scienceId;
			if (input.researcherId !== undefined) payload.researcherId = input.researcherId;
			if (input.gender !== undefined) payload.gender = input.gender;
			if (input.profession !== undefined) payload.profession = input.profession;
			if (input.lavozmId !== undefined) payload.lavozmId = input.lavozmId;
			if (input.departmentId !== undefined) payload.departmentId = input.departmentId;

			// Backend ga yuborish
			return TeacherService.updateProfile(payload);
		},
		onSuccess: () => {
			// Cache invalidate qil - teacher list va detail refresh bo'lsin
			queryClient.invalidateQueries({ queryKey: ["teachers"] });
			queryClient.invalidateQueries({ queryKey: ["teacher-detail"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (error: any) => {
			console.error("Profile update error:", error);
			// Toast error TeacherService da bo'lishi mumkin
		},
	});
}
