"use client";
import { useEffect, useState, useCallback } from "react";


export default function BloodDonorDashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    bloodGroups: {},
    recentDonors: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Fetching donor statistics from API
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Processing received data to handle missing fields gracefully
      const processedData = {
        totalDonors: data.totalDonors || 0,
        bloodGroups: data.bloodGroups || {},
        recentDonors: data.recentDonors?.filter(donor => donor.approved === true).map(donor => ({
          name: donor.name,
          bloodGroup: donor.bloodGroup,
          date: donor.createdAt || donor.date,
          _id: donor._id
        })) || []
      };

      setStats(processedData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error loading donor stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Setting up automatic refresh of donor stats
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchStats, refreshInterval]);

  // Function to get background color based on blood group type
  const getBloodGroupColor = (group) => {
    const colors = {
      'A+': 'bg-red-500 text-white p-4',
      'A-': 'bg-red-500 text-white p-4',
      'B+': 'bg-red-500 text-white p-4',
      'B-': 'bg-red-500 text-white p-4',
      'AB+': 'bg-red-500 text-white p-4',
      'AB-': 'bg-red-500 text-white p-4',
      'O+': 'bg-red-500 text-white p-4',
      'O-': 'bg-red-500 text-white p-4',
    };
    return colors[group] || 'bg-gray-600 text-white';
  };

  // Ensuring all blood groups exist even if not received from API
  const bloodGroupsDisplay = {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 
    'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0,
    ...stats.bloodGroups
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 p-6">
      {/* Header section */}
      <div className="relative overflow-hidden bg-red-600 text-white rounded-xl shadow-xl mb-12 p-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-1 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold font-[Georgia]">Blood Donation Drive</h1>
          <p className="text-xl mt-2 opacity-120">A Drop For You , A Life For Someone , Donate Blood Be a Hero </p>
        </div>
      </div>
      

     

       <div className="relative min-h-screen bg-[url('/vector.png')] bg-cover bg-center bg-no-repeat text-gray-900">
  {/* Centered Total Donors Section - Overlapping */}
  <div className="absolute inset-x-0 top-[50%] flex justify-center z-10">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300 w-72 -mt-20">
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white text-center">
        <h2 className="text-xl font-semibold">Total Donors</h2>
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
    </div>
  );
}
