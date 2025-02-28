// mockData.js
// Dummy data generator for Blood Donor Dashboard

// Blood groups
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// List of dummy donor names
const donorNames = [
  'John Smith', 'Maria Garcia', 'David Kim', 'Sarah Johnson', 
  'Mohammed Ali', 'Emma Wilson', 'Chen Wei', 'Priya Patel',
  'James Brown', 'Ana Lopez', 'Raj Sharma', 'Olivia Taylor',
  'Michael Davis', 'Sofia Rodriguez', 'Aiden Lee', 'Zoe Martin',
  'Liam Wilson', 'Isabella Thomas', 'Noah Miller', 'Ava White',
  'Ethan Harris', 'Charlotte Lewis', 'Lucas Walker', 'Mia Clark'
];

// Generate a random date within the last 30 days
function getRandomRecentDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // Random day within last 30 days
  const hoursAgo = Math.floor(Math.random() * 24); // Random hour
  const minutesAgo = Math.floor(Math.random() * 60); // Random minute
  
  const randomDate = new Date(now);
  randomDate.setDate(now.getDate() - daysAgo);
  randomDate.setHours(now.getHours() - hoursAgo);
  randomDate.setMinutes(now.getMinutes() - minutesAgo);
  
  return randomDate;
}

// Generate a random donor
function generateRandomDonor() {
  return {
    name: donorNames[Math.floor(Math.random() * donorNames.length)],
    bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
    date: getRandomRecentDate()
  };
}

// Generate blood group statistics
function generateBloodGroupStats(donorCount) {
  const stats = {};
  bloodGroups.forEach(group => {
    stats[group] = Math.floor(Math.random() * (donorCount / 4)) + 1;
  });
  return stats;
}

// Generate full mock data
function generateMockData(totalDonors = 120) {
  // Generate 20 recent donors or less if totalDonors is smaller
  const recentDonorCount = Math.min(20, totalDonors);
  
  const recentDonors = Array.from({ length: recentDonorCount }, () => 
    generateRandomDonor()
  ).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  
  return {
    totalDonors,
    bloodGroups: generateBloodGroupStats(totalDonors),
    recentDonors
  };
}

// Export the mock data and generator function
module.exports = {
  generateMockData,
  getRandomDonor: generateRandomDonor
};