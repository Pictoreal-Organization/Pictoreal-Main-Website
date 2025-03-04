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
  const [refreshInterval] = useState(60000); // Refresh every minute

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
          date: donor.createdAt || donor.date, // Use createdAt if available, fallback to date
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
      'A+': 'bg-red-500 text-white',
      'A-': 'bg-red-500 text-white',
      'B+': 'bg-red-500 text-white',
      'B-': 'bg-red-500 text-white',
      'AB+': 'bg-red-500 text-white',
      'AB-': 'bg-red-500 text-white',
      'O+': 'bg-red-500 text-white',
      'O-': 'bg-red-500 text-white',
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

  // Format timestamp to a human-readable format
  const formatTimestamp = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    
    // Format: March 2, 2025 at 08:53 AM
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' at ' + 
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Ensure all blood groups are displayed even if they have 0 donors
  const bloodGroupsDisplay = {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 
    'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0,
    ...stats.bloodGroups
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 p-1">
      {/* Header section */}
      <div className="relative overflow-hidden bg-red-600 text-white rounded-xl shadow-xl mb-6 p-1">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-1 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className = "flex items-center justify-center ">
        <div className="relative z-10 text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold font-[Georgia]">Blood Donation Drive</h1>
          <p className="text-xl mt-2 opacity-120">A Drop For You , A Life For Someone , Donate Blood Be a Hero </p>
        </div>
        <img src = "/Pictoreal.jpg" alt = "Pictoreal logo" className = "absolute  left-10 w-24 h-24 rounded-full shadow-lg "/>
        <img src = "/NSS.jpg" alt = "NSS logo" className = "absolute  right-10 w-24 h-24 rounded-full shadow-lg "/>
            </div>
      </div>
     

      {/* Centered Total Donors Section */}
      <div className="relative min-h-screen bg-[url('/vector.png')] bg-cover bg-center bg-no-repeat text-gray-900">
  {/* Centered Total Donors Section - Overlapping */}
  <div className="absolute inset-x-0 top-[35%] flex justify-center z-10">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300 w-72 -mt-20">
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white text-center">
        <h2 className="text-xl font-semibold">Total Donors</h2>
      </div>
      <div className="p-8 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-md"></div>
          <p className="relative text-6xl font-extrabold text-red-600">
            {loading ? '' : stats.totalDonors}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Blood Group Statistics Section */}
      <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Blood Group Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Object.entries(bloodGroupsDisplay).map(([group, count]) => (
            <div key={group} className="relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 transform hover:shadow-lg">
              <div className={`p-6 text-center ${getBloodGroupColor(group)}`}>
                <p className="text-2xl font-bold mb-1">{group}</p>
                <p className="text-3xl font-semibold">{count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(donor.date)}
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
