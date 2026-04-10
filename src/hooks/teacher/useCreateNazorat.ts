import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NazoratService } from "@/features/nazorat/nazorat.service";
import type { NazoratCreateDTO } from "@/features/nazorat/nazorat.type";

export function useCreateNazorat() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: NazoratCreateDTO) => NazoratService.create(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["nazorat"] });
			toast.success("Nazorat muvaffaqiyatli qo'shildi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Nazorat qo'shishda xatolik");
		},
	});
}
