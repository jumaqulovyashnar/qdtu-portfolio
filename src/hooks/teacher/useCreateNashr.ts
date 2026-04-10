import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { publicationService } from "@/features/publication/publication.service";
import type { PublicationCreateParams } from "@/features/publication/publication.type";

export function useCreateNashr() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: PublicationCreateParams) => publicationService.create(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["nashr"] });
			toast.success("Nashr muvaffaqiyatli qo'shildi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Nashr qo'shishda xatolik");
		},
	});
}
