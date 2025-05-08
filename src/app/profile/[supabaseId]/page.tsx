// Private page
import FavoriteShops from "@/components/Profile/Profile-FavoriteShops";
import ProfileHeader from "@/components/Profile/Profile-Header";
import ProfileReviews from "@/components/Profile/Profile-Reviews";
import TabSelector from "@/components/Profile/Profile-TabSelector";
import { getBobaData, getUser } from "@/lib/utils/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Will You Be My Boba",
  description: "Your account profile of Will You Be My Boba",
};

export const dynamic = "force-dynamic";

const Profile = async ({
  params,
  searchParams,
}: {
  params: Promise<{ supabaseId: string }>;
  searchParams: Promise<{ tab: "reviews" | "favoriteShops" | undefined }>;
}) => {
  const { supabaseId } = await params;
  const { tab } = await searchParams;

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
    <main className="flex-1 container py-8">
      <ProfileHeader initialUserProfile={userProfile} />
      <TabSelector initialTab={tab ?? "reviews"} />
      <ProfileReviews bobas={bobas} />
      <FavoriteShops />
    </main>
  );
};

export default Profile;
