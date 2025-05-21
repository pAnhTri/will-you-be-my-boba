import ProfileHeader from "@/components/Profile/Profile-Header";
import { getUser } from "@/lib/utils/server";

export const dynamic = "force-dynamic";

const PublicProfile = async ({
  params,
}: {
  params: Promise<{ supabaseId: string }>;
}) => {
  const { supabaseId } = await params;

  if (!supabaseId) {
    return <div>No supabaseId</div>;
  }

  const userProfile = await getUser(supabaseId);

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex-1 py-8">
      <ProfileHeader initialUserProfile={userProfile} isPublic={true} />
    </main>
  );
};

export default PublicProfile;
