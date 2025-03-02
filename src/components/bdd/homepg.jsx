"use client";
import { useEffect, useState, useCallback } from "react";

export default function BloodDonorDashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    bloodGroups: {},
    recentDonors: [],
  });

  const [latestDonor, setLatestDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transitionState, setTransitionState] = useState("idle");
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Memoize fetchStats to prevent recreation on each render
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate`);

      
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      
      // Process data to ensure it matches the expected structure
      const processedData = {
        totalDonors: data.totalDonors || 0,
        bloodGroups: data.bloodGroups || {},
        recentDonors: data.recentDonors?.filter(donor => donor.approved === true).map(donor => ({
          name: donor.name,
          bloodGroup: donor.bloodGroup,
          date: donor.date,
          _id: donor._id
        })) || []
      };
 
      // Check if there's a new donation
      if (
        processedData.recentDonors.length > 0 && 
        (!latestDonor || 
         processedData.recentDonors[0]._id !== latestDonor._id)
      ) {
        if (latestDonor) {
          setTransitionState("exiting");
          setTimeout(() => {
            setLatestDonor(processedData.recentDonors[0]);
            setTransitionState("entering");
            setTimeout(() => setTransitionState("idle"), 1000);
          }, 700);
        } else {
          setLatestDonor(processedData.recentDonors[0]);
          setTransitionState("entering");
          setTimeout(() => setTransitionState("idle"), 1000);
        }
      }
      
      setStats(processedData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error loading donor stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [latestDonor]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchStats, refreshInterval]);

  // Blood group color mapping
  const getBloodGroupColor = (group) => {
    const colors = {
      'A+': 'bg-red-600 text-white',
      'A-': 'bg-red-500 text-white',
      'B+': 'bg-blue-600 text-white',
      'B-': 'bg-blue-500 text-white',
      'AB+': 'bg-purple-600 text-white',
      'AB-': 'bg-purple-500 text-white',
      'O+': 'bg-green-600 text-white',
      'O-': 'bg-green-500 text-white',
    };
    return colors[group] || 'bg-gray-600 text-white';
  };

  // Function to format relative time (x minutes ago)
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "N/A";
    
    const donationDate = new Date(dateString);
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const timeDiff = now - donationDate;
    
    // Convert to minutes
    const minutesAgo = Math.floor(timeDiff / 60000);
    
    if (minutesAgo < 1) return "Just now";
    if (minutesAgo === 1) return "1 minute ago";
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    
    // Convert to hours if more than 60 minutes
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo === 1) return "1 hour ago";
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    
    // Convert to days if more than 24 hours
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo === 1) return "1 day ago";
    return `${daysAgo} days ago`;
  };

  // Ensure all blood groups are displayed even if they have 0 donors
  const bloodGroupsDisplay = {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 
    'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0,
    ...stats.bloodGroups
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 p-6">
      {/* Header with Pulse Animation */}
      <div className="relative overflow-hidden bg-red-600 text-white rounded-xl shadow-xl mb-12 p-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-1 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold">Blood Donation Center</h1>
          <p className="text-xl mt-2 opacity-90">Every donation saves lives</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Total Donors Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
            <h2 className="text-xl font-semibold text-center">Total Donors</h2>
          </div>
          <div className="p-8 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-md animate-pulse"></div>
              <p className="relative text-6xl font-extrabold text-red-600">
                {loading ? '...' : stats.totalDonors}
              </p>
            </div>
          </div>
        </div>

        {/* Announcement Board */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden relative transform transition hover:scale-105 duration-300">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
            <h2 className="text-xl font-semibold text-center">Latest Donation</h2>
          </div>
          <div className="bg-gradient-to-b from-red-50 to-white p-8 flex items-center justify-center min-h-64 overflow-hidden relative">
            {/* Blood drop decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-red-100 rounded-full blur-md opacity-40"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-red-100 rounded-full blur-md opacity-40"></div>
            
            {loading && !latestDonor && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-xl">Loading donation data...</p>
              </div>
            )}
            {error && (
              <div className="text-center">
                <p className="text-red-500 text-xl mb-2">{error}</p>
                <button 
                  onClick={fetchStats}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            )}
            {!loading && !error && !latestDonor && (
              <p className="text-gray-500 text-2xl">Waiting for new donations...</p>
            )}
            {latestDonor && (
              <div className={`text-center w-full transition-all duration-700 ${
                transitionState === "exiting" ? "opacity-0 scale-75 blur-sm rotate-6" : 
                transitionState === "entering" ? "opacity-100 scale-100 blur-0 rotate-0 animate-bounce-once" : 
                "opacity-100 scale-100 blur-0 rotate-0"
              }`}>
                <div className="mb-6">
                  <p className="text-4xl md:text-5xl font-bold mb-1 tracking-tight">
                    <span className={`relative inline-block ${
                      transitionState === "entering" ? "animate-pop-in" : ""
                    }`}>
                      {latestDonor.name}
                    </span>
                  </p>
                  <div className={`bg-red-100 h-1 w-24 mx-auto my-3 rounded-full transition-all duration-1000 ${
                    transitionState === "entering" ? "w-24" : "w-0"
                  }`}></div>
                  <p className={`text-3xl font-medium text-gray-700 mb-4 transition-all duration-700 delay-300 ${
                    transitionState === "exiting" ? "opacity-0 -translate-y-8" : 
                    transitionState === "entering" ? "opacity-100 translate-y-0" : 
                    "opacity-100 translate-y-0"
                  }`}>
                    has just donated blood!
                  </p>
                </div>
                
                <div className="mt-4 inline-block">
                  <div className={`inline-flex items-center transition-all duration-700 delay-500 ${
                    transitionState === "exiting" ? "opacity-0 scale-75" : 
                    transitionState === "entering" ? "opacity-100 scale-100" : 
                    "opacity-100 scale-100"
                  }`}>
                    <span className={`px-4 py-2 rounded-full font-bold ${getBloodGroupColor(latestDonor.bloodGroup)}`}>
                      {latestDonor.bloodGroup}
                    </span>
                    <span className="text-gray-500 ml-2 text-lg">
                      {formatRelativeTime(latestDonor.date)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blood Group Stats */}
      <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Blood Group Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Object.entries(bloodGroupsDisplay).map(([group, count]) => (
            <div 
              key={group} 
              className="relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
            >
              <div className={`p-6 text-center ${getBloodGroupColor(group)}`}>
                <p className="text-2xl font-bold mb-1">{group}</p>
                <p className="text-3xl font-semibold">{count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Donors List */}
      <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Recent Donors
        </h2>
        {loading && stats.recentDonors.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading recent donors...</p>
          </div>
        ) : stats.recentDonors.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recent donations available.</p>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentDonors.slice(0, 5).map((donor) => (
                  <tr key={donor._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBloodGroupColor(donor.bloodGroup)}`}>
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(donor.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

const style = document.createElement('style');
style.textContent = `
  @keyframes pop-in {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes bounce-once {
    0% { transform: translateY(-20px); opacity: 0; }
    50% { transform: translateY(6px); opacity: 1; }
    75% { transform: translateY(-3px); }
    100% { transform: translateY(0); }
  }
  .animate-pop-in {
    animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  .animate-bounce-once {
    animation: bounce-once 0.8s ease-out forwards;
  }
`;
document.head.appendChild(style);