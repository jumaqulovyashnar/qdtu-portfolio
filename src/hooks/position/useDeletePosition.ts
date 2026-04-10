import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PositionService } from "@/features/position/position.service";

export function useDeletePosition() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => PositionService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["positions"] });
			toast.success("Lavozim muvaffaqiyatli o'chirildi");
		},
		onError: (error: any) => {
			if (error.status === 500) {
				toast.warning("bu lavozimda xodimlar bor !");
				return;
			}

			toast.error(error?.response?.data?.message || "Lavozimni o'chirishda xatolik");
		},
	});
}
