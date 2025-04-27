// Private page
import ProfileHeader from "@/components/Profile/Profile-Header";
import { getAvatar } from "@/lib/utils/server";

const Profile = async () => {
  const avatar = await getAvatar();

  return (
    <main className="flex-1 container py-8">
      <ProfileHeader initialAvatar={avatar} />
    </main>
  );
};

export default Profile;
