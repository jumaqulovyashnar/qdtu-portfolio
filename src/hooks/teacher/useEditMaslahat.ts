import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MaslahatService } from "@/features/consultation/consultation.service";
import type { ConsultationRequest } from "@/features/consultation/consultation.type";

interface EditConsultationInput extends ConsultationRequest {
	id: number;
}

export function useEditMaslahat() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: EditConsultationInput) => {
			const { id, ...data } = input;
			return MaslahatService.edit(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["maslahat"] });
			toast.success("Maslahat muvaffaqiyatli tahrirlandi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Maslahatni tahrirlashda xatolik yuz berdi");
		},
	});
}
