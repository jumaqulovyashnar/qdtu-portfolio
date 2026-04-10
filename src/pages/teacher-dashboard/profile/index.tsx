import { useTeacherComplation } from "@/hooks/teacher/useTeacherComplation";
import { useTeacherId } from "@/hooks/teacher/useTeacherId";
import { useUser } from "@/hooks/user/useUser";
import { ProfileForm } from "@/pages/teachers/detail/detail-profile/profile-form";
import { ProfileSidebar } from "@/pages/teachers/detail/detail-profile/profile-sidebar";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";

export default function TeacherProfile() {
	const { data: teacher, isLoading } = useUser();
	const { data: profile, isLoading: teacherLoading } = useTeacherId(teacher?.id);
	const { data: complation, isLoading: ComplationLoading } = useTeacherComplation(teacher?.id);	

	if (teacherLoading || isLoading || ComplationLoading)
		return (
			<div className="w-full h-[60vh] flex flex-col items-center justify-center gap-3 animate-in fade-in duration-500">
				<Loader2 className="size-10 text-primary animate-spin" />
				<p className="text-muted-foreground animate-pulse text-sm font-medium">ma'lumotlar yuklanmoqda...</p>
			</div>
		);
	return (
		<div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
			<ProfileSidebar profile={profile?.data} complation={complation?.data} />
			<div className="w-full lg:flex-1 min-w-0">
				<ProfileForm defaultValues={profile?.data} />
			</div>
		</div>
	);
}
