import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AwardRequest } from "@/features/mukofot/mukofot";
import { MukofotService } from "@/features/mukofot/mukofot.service";

export interface EditMukofotInput extends AwardRequest {
	id: number;
}

export function useEditMukofot() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: EditMukofotInput) => {
			const { id, ...data } = input;
			return MukofotService.edit(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["mukofot"] });
			toast.success("Mukofot muvaffaqiyatli tahrirlandi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Mukofotni tahrirlashda xatolik yuz berdi");
		},
	});
}
