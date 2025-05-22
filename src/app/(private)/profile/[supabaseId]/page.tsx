// Private page
import FavoriteShops from "@/components/Profile/Profile-FavoriteShops";
import ProfileHeader from "@/components/Profile/Profile-Header";
import ProfileReviews from "@/components/Profile/Profile-Reviews";
import TabSelector from "@/components/Profile/Profile-TabSelector";
import { createClient } from "@/lib/supabase/server";
import { getBobaData, getUser } from "@/lib/utils/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  // Check for unauthorized access
  if (!supabaseId || user.user?.id !== supabaseId) {
    notFound();
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
    <main className="flex-1 py-8">
      <ProfileHeader initialUserProfile={userProfile} isPublic={false} />
      <TabSelector initialTab={tab ?? "reviews"} />
      <ProfileReviews bobas={bobas} />
      <FavoriteShops />
    </main>
  );
};

export default Profile;
