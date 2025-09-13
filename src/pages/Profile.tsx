// ...existing code...
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">No user is logged in.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
            />
          )}
          <div className="w-full">
            <p className="text-lg font-semibold">Name:</p>
            <p className="text-gray-700 mb-2">{currentUser.displayName || 'N/A'}</p>
            <p className="text-lg font-semibold">Email:</p>
            <p className="text-gray-700 mb-2">{currentUser.email}</p>
            {/* Doctor ID is not available on Firebase User object by default */}
            <p className="text-lg font-semibold">UID:</p>
            <p className="text-gray-700">{currentUser.uid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
