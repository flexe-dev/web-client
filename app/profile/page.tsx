import ProfileHeader from "./components/ProfileHeader";
import ProfileContent from './components/ProfileContent';

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 relative">
        <ProfileHeader />
        <ProfileContent />
      </div>
    </div>
  )
};

export default Page;
