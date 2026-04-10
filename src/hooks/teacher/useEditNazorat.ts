import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NazoratService } from "@/features/nazorat/nazorat.service";
import type { NazoratCreateDTO } from "@/features/nazorat/nazorat.type";

export interface EditNazoratInput extends NazoratCreateDTO {
	id: number;
}

export function useEditNazorat() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: EditNazoratInput) => {
			const { id, ...data } = input;
			return NazoratService.edit(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["nazorat"] });
			toast.success("Nazorat muvaffaqiyatli tahrirlandi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Nazoratni tahrirlashda xatolik");
		},
	});
}
