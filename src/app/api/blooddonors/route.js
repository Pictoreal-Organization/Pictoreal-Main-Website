// pages/api/blooddonors.js or app/api/blooddonors/route.js (depending on if you're using Pages or App Router)

import { generateMockData, getRandomDonor } from '../blooddonors/mock';

// Keep track of our data between requests
let mockData = generateMockData();
let lastUpdate = new Date();

// Occasionally add a new donor (roughly every 15-30 seconds)
function maybeAddNewDonor() {
  const now = new Date();
  const secsSinceLastUpdate = (now - lastUpdate) / 1000;
  
  // ~20% chance of new donor every 5 seconds, 
  // higher chance the longer it's been since last update
  const chance = 0.2 * (1 + secsSinceLastUpdate / 15);
  
  if (Math.random() < chance) {
    const newDonor = getRandomDonor();
    newDonor.date = new Date();
    
    // Add to the beginning of recentDonors array
    mockData.recentDonors.unshift(newDonor);
    
    // Keep only the most recent 20 donors
    if (mockData.recentDonors.length > 20) {
      mockData.recentDonors.pop();
    }
    
    // Update blood group counts
    mockData.bloodGroups[newDonor.bloodGroup]++;
    
    // Update total count
    mockData.totalDonors++;
    
    // Reset last update time
    lastUpdate = now;
  }
}

// If using Next.js Pages Router:
export default function handler(req, res) {
  maybeAddNewDonor();
  res.status(200).json(mockData);
}

// If using Next.js App Router:
export async function GET() {
  maybeAddNewDonor();
  return new Response(JSON.stringify(mockData), {
    headers: { 'Content-Type': 'application/json' }
  });
}