// Private page
import ProfileHeader from "@/components/Profile/Profile-Header";
import ProfileReviews from "@/components/Profile/Profile-Reviews";
import { getBobaData, getUser } from "@/lib/utils/server";
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

  const bobaData = await getBobaData();

  if (!bobaData) {
    return <div>No boba data found</div>;
  }

  const { bobas = [] } = bobaData;

  return (
    <main className="flex-1 container py-8 bg-graident">
      <ProfileHeader initialUserProfile={userProfile} />
      <ProfileReviews initialUserProfile={userProfile} bobas={bobas} />
    </main>
  );
};

export default Profile;
