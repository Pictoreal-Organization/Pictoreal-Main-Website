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
  const [autoRefresh, setAutoRefresh] = useState(true);

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
    let interval;
    
    if (autoRefresh) {
      interval = setInterval(fetchStats, refreshInterval);
    }
    
    return () => clearInterval(interval);
  }, [fetchStats, refreshInterval, autoRefresh]);

  // Blood group color mapping with updated color scheme
  const getBloodGroupColor = (group) => {
    const colors = {
      'A+': 'bg-rose-600 text-white',
      'A-': 'bg-rose-500 text-white',
      'B+': 'bg-blue-600 text-white',
      'B-': 'bg-blue-500 text-white',
      'AB+': 'bg-violet-600 text-white',
      'AB-': 'bg-violet-500 text-white',
      'O+': 'bg-emerald-600 text-white',
      'O-': 'bg-emerald-500 text-white',
    };
    return colors[group] || 'bg-gray-600 text-white';
  };

  // Function to get gradient for blood group card
  const getBloodGroupGradient = (group) => {
    const gradients = {
      'A+': 'from-rose-500 to-rose-700',
      'A-': 'from-rose-400 to-rose-600',
      'B+': 'from-blue-500 to-blue-700',
      'B-': 'from-blue-400 to-blue-600',
      'AB+': 'from-violet-500 to-violet-700',
      'AB-': 'from-violet-400 to-violet-600',
      'O+': 'from-emerald-500 to-emerald-700',
      'O-': 'from-emerald-400 to-emerald-600',
    };
    return gradients[group] || 'from-gray-500 to-gray-700';
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

  // Calculate total percentage for each blood group
  const totalDonors = stats.totalDonors || 1; // Prevent division by zero
  const bloodGroupPercentages = Object.entries(bloodGroupsDisplay).map(([group, count]) => ({
    group,
    count,
    percentage: Math.round((count / totalDonors) * 100) || 0
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 p-4 md:p-6">
      {/* Fixed top navigation with auto refresh toggle */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 rounded-xl shadow-sm mb-4 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute inset-0 bg-red-600 rounded-full scale-75"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Blood Donation Center</h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Auto Refresh</span>
          <button 
            onClick={() => setAutoRefresh(!autoRefresh)} 
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${autoRefresh ? 'bg-red-600' : 'bg-gray-200'}`}
          >
            <span 
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRefresh ? 'translate-x-6' : 'translate-x-1'}`} 
            />
          </button>
          <button 
            onClick={fetchStats} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Refresh now"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Header with Animated Blood Drop */}
      <header className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-xl mb-8 p-6">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-800 rounded-full opacity-20 blur-xl"></div>
        
        {/* Animated Blood Drops */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-t-full opacity-10"
              style={{
                width: `${20 + Math.random() * 15}px`,
                height: `${30 + Math.random() * 20}px`,
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animation: `fall ${3 + Math.random() * 4}s linear ${Math.random() * 2}s infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center py-8 md:py-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blood Donation Center</h1>
          <p className="text-xl mt-3 opacity-90 font-light">Every donation saves up to three lives</p>
          
          {/* Blood fact */}
          <div className="mt-6 inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm font-medium">Did you know? Your body replaces donated blood volume within 24 hours.</p>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats Cards */}
        <div className="space-y-6">
          {/* Total Donors Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg duration-300">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
              <h2 className="text-xl font-semibold">Total Donors</h2>
            </div>
            <div className="p-6 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-md animate-pulse"></div>
                <div className="relative flex flex-col items-center">
                  <p className="text-5xl font-extrabold text-red-600 tracking-tight">
                    {loading ? '...' : stats.totalDonors.toLocaleString()}
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">lives potentially saved: {(stats.totalDonors * 3).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blood Distribution Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg duration-300">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
              <h2 className="text-xl font-semibold">Blood Type Distribution</h2>
            </div>
            <div className="p-6 space-y-4">
              {bloodGroupPercentages.map(({group, count, percentage}) => (
                <div key={group} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getBloodGroupColor(group)}`}>
                      {group}
                    </span>
                    <span className="text-sm text-gray-500">{count} donors ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getBloodGroupGradient(group)}`}
                      style={{ width: `${percentage}%`, transition: 'width 1s ease-in-out' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Center/Right Columns - Announcement Board */}
        <div className="md:col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden relative transition hover:shadow-lg duration-300">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
            <h2 className="text-xl font-semibold">Latest Donation</h2>
          </div>
          <div className="bg-gradient-to-b from-red-50 to-white p-6 md:p-8 flex items-center justify-center min-h-64 overflow-hidden relative">
            {/* Blood drop decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-red-100 rounded-full blur-md opacity-40"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-red-100 rounded-full blur-md opacity-40"></div>
            
            {loading && !latestDonor && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-xl">Loading donation data...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center p-8 bg-red-50 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-xl mb-4 font-medium">{error}</p>
                <button 
                  onClick={fetchStats}
                  className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md hover:shadow-lg"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && !latestDonor && (
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <path d="M12 2v6m0 0L4 20h16L12 8z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-2xl font-light">Waiting for new donations...</p>
                <p className="text-gray-400 mt-2">The dashboard will update automatically when new data arrives</p>
              </div>
            )}
            
            {latestDonor && (
              <div className={`text-center w-full transition-all duration-700 ${
                transitionState === "exiting" ? "opacity-0 scale-75 blur-sm rotate-3" : 
                transitionState === "entering" ? "opacity-100 scale-100 blur-0 rotate-0 animate-bounce-once" : 
                "opacity-100 scale-100 blur-0 rotate-0"
              }`}>
                <div className="mb-8">
                  {/* Celebration effect */}
                  <div className="mb-4 relative">
                    {transitionState === "entering" && (
                      <div className="absolute inset-0 flex justify-center pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                          <div 
                            key={i}
                            className="absolute h-2 w-2 rounded-full bg-red-400"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `rotate(${i * 18}deg) translateY(-60px)`,
                              opacity: 0,
                              animation: `celebrate 0.7s ease-out ${i * 0.02}s forwards`
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-4xl md:text-5xl font-bold mb-1 tracking-tight text-gray-900">
                      <span className={`relative inline-block ${
                        transitionState === "entering" ? "animate-pop-in" : ""
                      }`}>
                        {latestDonor.name}
                      </span>
                    </p>
                  </div>
                  
                  <div className={`h-1 w-24 mx-auto my-4 rounded-full transition-all duration-1000 bg-gradient-to-r from-red-400 to-red-600 ${
                    transitionState === "entering" ? "w-24" : "w-0"
                  }`}></div>
                  
                  <p className={`text-2xl md:text-3xl font-medium text-gray-700 transition-all duration-700 delay-300 ${
                    transitionState === "exiting" ? "opacity-0 -translate-y-8" : 
                    transitionState === "entering" ? "opacity-100 translate-y-0" : 
                    "opacity-100 translate-y-0"
                  }`}>
                    has just donated blood!
                  </p>
                </div>
                
                <div className="mt-6 inline-block">
                  <div className={`inline-flex items-center transition-all duration-700 delay-500 ${
                    transitionState === "exiting" ? "opacity-0 scale-75" : 
                    transitionState === "entering" ? "opacity-100 scale-100" : 
                    "opacity-100 scale-100"
                  }`}>
                    <span className={`px-4 py-2 rounded-full font-bold shadow-md ${getBloodGroupColor(latestDonor.bloodGroup)}`}>
                      {latestDonor.bloodGroup}
                    </span>
                    <span className="text-gray-500 ml-3 text-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatRelativeTime(latestDonor.date)}
                    </span>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    This donation could help save up to 3 lives
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Donors List */}
      <section className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Donors
          </h2>
          <div className="text-sm text-gray-500">
            Showing {stats.recentDonors.slice(0, 5).length} of {stats.recentDonors.length} recent donors
          </div>
        </div>
        
        {loading && stats.recentDonors.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading recent donors...</p>
          </div>
        ) : stats.recentDonors.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No recent donations available.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-100">
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
              <tbody>
                {stats.recentDonors.slice(0, 5).map((donor, index) => (
                  <tr 
                    key={donor._id} 
                    className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-600 font-bold text-sm">
                          {donor.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBloodGroupColor(donor.bloodGroup)}`}>
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatRelativeTime(donor.date)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm pb-6">
        <p>Blood donations save millions of lives every year. Thank you to all donors!</p>
        <p className="mt-1">© {new Date().getFullYear()} Blood Donation Center</p>
      </footer>
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
  @keyframes fall {
    0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    100% { transform: translateY(400px) rotate(45deg); opacity: 0; }
  }
  @keyframes celebrate {
    0% { transform: rotate(var(--rotation)) translateY(-60px) scale(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: rotate(var(--rotation)) translateY(-120px) scale(1); opacity: 0; }
  }
  .animate-pop-in {
    animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  .animate-bounce-once {
    animation: bounce-once 0.8s ease-out forwards;
  }
`;
document.head.appendChild(style);