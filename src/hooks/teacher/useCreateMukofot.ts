import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AwardRequest } from "@/features/mukofot/mukofot";
import { MukofotService } from "@/features/mukofot/mukofot.service";

export function useCreateMukofot() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: AwardRequest) => MukofotService.create(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["mukofot"] });
			toast.success("Mukofot muvaffaqiyatli qo'shildi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Mukofot qo'shishda xatolik");
		},
	});
}
