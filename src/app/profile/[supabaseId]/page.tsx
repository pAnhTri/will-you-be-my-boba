// Private page
import ProfileHeader from "@/components/Profile/Profile-Header";
import { getUser } from "@/lib/utils/server";

const Profile = async ({
  params,
}: {
  params: Promise<{ supabaseId: string }>;
}) => {
  const { supabaseId } = await params;

  if (!supabaseId) {
    return <div>No user ID provided</div>;
  }

  const userProfile = await getUser(supabaseId);

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex-1 container py-8">
      <ProfileHeader initialUserProfile={userProfile} />
    </main>
  );
};

export default Profile;
