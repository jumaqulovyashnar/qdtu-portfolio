import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";

export type { ColumnDef };

const PAGE_SIZE = 10;

type DataTableProps<T> = {
	columns: ColumnDef<T>[];
	data: T[];
	onRowClick?: (row: T) => void;
	page?: number;
	totalPage?: number;
	onPageChange?: (page: number) => void;
	isLoading?: boolean;
};

export function DataTable<T>({
	columns,
	data,
	onRowClick,
	page,
	totalPage,
	onPageChange,
	isLoading,
}: DataTableProps<T>) {
	const isExternal = page !== undefined && onPageChange !== undefined;
	const [internalPage, setInternalPage] = useState(0);

	const pageIndex = isExternal ? page! : internalPage;
	const setPageIndex = isExternal ? onPageChange! : setInternalPage;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		...(isExternal
			? {
					manualPagination: true,
					pageCount: totalPage ?? -1,
				}
			: {
					getPaginationRowModel: getPaginationRowModel(),
					manualPagination: false,
					onPaginationChange: (updater) => {
						const next = typeof updater === "function" ? updater({ pageIndex, pageSize: PAGE_SIZE }) : updater;
						setInternalPage(next.pageIndex);
					},
				}),
		state: {
			pagination: { pageIndex, pageSize: PAGE_SIZE },
		},
	});

	const totalPages = isExternal ? (totalPage ?? 1) : table.getPageCount();
	const showPagination = isExternal ? totalPages > 1 : data.length > PAGE_SIZE;

	const canPrev = pageIndex > 0;
	const canNext = pageIndex < totalPages - 1;

	return (
		<div className="flex flex-col gap-3">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground text-[13px]">
									Yuklanmoqda...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={() => onRowClick?.(row.original)}
									className={onRowClick ? "cursor-pointer hover:bg-muted/10" : ""}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Ma'lumot topilmadi.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{showPagination && (
				<div className="flex items-center justify-between px-1">
					<span className="text-[13px] text-muted-foreground">
						{pageIndex + 1} / {totalPages} sahifa
					</span>

					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => setPageIndex(0)}
							disabled={!canPrev}
						>
							<ChevronsLeft className="size-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => setPageIndex(pageIndex - 1)}
							disabled={!canPrev}
						>
							<ChevronLeft className="size-4" />
						</Button>

						{Array.from({ length: totalPages }, (_, i) => i).map((i) => (
							<Button
								key={i}
								variant={i === pageIndex ? "default" : "outline"}
								size="icon"
								className="h-8 w-8 text-[13px]"
								onClick={() => setPageIndex(i)}
							>
								{i + 1}
							</Button>
						))}

						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => setPageIndex(pageIndex + 1)}
							disabled={!canNext}
						>
							<ChevronRight className="size-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => setPageIndex(totalPages - 1)}
							disabled={!canNext}
						>
							<ChevronsRight className="size-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
