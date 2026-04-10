import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { publicationService } from "@/features/publication/publication.service";
import type { PublicationCreateParams } from "@/features/publication/publication.type";

export interface EditPublicationInput extends PublicationCreateParams {
	id: number;
}

export function useEditNashr() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: EditPublicationInput) => {
			const { id, ...data } = input;
			return publicationService.edit(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["nashr"] });
			toast.success("Nashr muvaffaqiyatli tahrirlandi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Nashrni tahrirlashda xatolik yuz berdi");
		},
	});
}
