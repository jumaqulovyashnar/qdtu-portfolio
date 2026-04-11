import { apiClient } from "@/api/client";
import type {
	CreatePositionDTO,
	IApiResponse,
	Position,
	PositionCreateResponse,
	PositionListResponse,
} from "./position.type";
import { POSITION } from "@/constants/apiEndpoint";

export const PositionService = {
	getAll() {
		return apiClient.get<PositionListResponse>(POSITION.LAVOZIM);
	},
	create(data: CreatePositionDTO) {
		return apiClient.post<PositionCreateResponse>(POSITION.LAVOZIM, data);
	},
	delete(id: number) {
		return apiClient.delete(`/lavozim/${id}`);
	},
	update(id: number, data: Partial<Position>) {
		return apiClient.put<{ success: boolean; message: string }>(`${POSITION.LAVOZIM}/${id}`, data);
	},
	getStatistik(){
		return apiClient.get<IApiResponse>(`${POSITION.STATISTIC}`)
	}
};
