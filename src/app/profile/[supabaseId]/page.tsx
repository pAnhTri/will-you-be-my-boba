// Private page
import ProfileHeader from "@/components/Profile/Profile-Header";
import { getUser } from "@/lib/utils/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Will You Be My Boba",
  description: "Your account profile of Will You Be My Boba",
};

export const dynamic = "force-dynamic";

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
