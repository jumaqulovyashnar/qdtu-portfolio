import { Flame, UserRound } from "lucide-react";
import { Progress } from "@/ui/progress";

type ProfileSidebarProps = {
	profile: {
		fullName: string;
		lavozimName: string;
		imageUrl: string | null;
	};
	newImage?: string | File | null;
	complation?: number | null;
};

export function ProfileSidebar({ profile, newImage, complation }: ProfileSidebarProps) {
	const preview =
		newImage instanceof File
			? URL.createObjectURL(newImage)
			: typeof newImage === "string"
				? newImage
				: profile.imageUrl;

	const percentage = complation ? Math.round(complation) : 0;

	return (
		<div className="w-full lg:w-72 lg:shrink-0 animate-in fade-in duration-500">
			<div className="group rounded-3xl border border-border/40 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
				{/* Rasm qismi */}
				<div className="relative aspect-square w-full bg-muted overflow-hidden">
					{preview ? (
						<img
							src={preview}
							alt={profile.fullName}
							className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-muted-foreground/20">
							<UserRound className="size-20" strokeWidth={1} />
						</div>
					)}

					<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent dark:from-foreground/80 dark:via-foreground/30 dark:to-transparent" />

					<div className="absolute bottom-4 left-4 right-4 text-white dark:text-foreground">
						<h2 className="text-[15px] font-bold leading-tight line-clamp-1">{profile.fullName}</h2>
						<p className="text-[11px] text-white/80 dark:text-muted-foreground font-medium mt-0.5">
							{profile.lavozimName}
						</p>
					</div>
				</div>

				{/* Status qismi */}
				<div className="p-5 space-y-4">
					<div className="flex items-center justify-between gap-2">
						<div className="space-y-0.5">
							<p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.05em]">
								Profil Natijasi
							</p>
							<div className="flex items-center gap-1.5">
								<span className="text-xl font-black text-foreground tabular-nums">{percentage}%</span>
								{percentage > 0 && <Flame className="size-4 text-orange-500 fill-orange-500" />}
							</div>
						</div>

						{/* Holat badge - whitespace-nowrap matn bo'linib ketmasligi uchun */}
						<div
							className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap shadow-sm border ${
								percentage > 80
									? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800"
									: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800"
							}`}
						>
							{percentage === 100 ? "To'liq" : percentage > 50 ? "Yaxshi" : "Tugallanmagan"}
						</div>
					</div>

					<div className="space-y-2">
						<Progress
							value={percentage}
							className="h-2 bg-muted transition-all"
							// To'lgan qismini rangini o'zgartirish (agar shadcn bo'lsa)
						/>
						<p className="text-[11px] text-muted-foreground leading-snug">
							{percentage < 100
								? "Profilingizni 100% ga yetkazib, ko'proq imkoniyatlarga ega bo'ling."
								: "Ajoyib natija! Ma'lumotlaringiz to'liq."}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
