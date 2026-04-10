import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MaslahatService } from "@/features/consultation/consultation.service";
import type { ConsultationRequest } from "@/features/consultation/consultation.type";

export function useCreateMaslahat() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: ConsultationRequest) => MaslahatService.create(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["maslahat"] });
			toast.success("Maslahat muvaffaqiyatli qo'shildi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Maslahat qo'shishda xatolik");
		},
	});
}
