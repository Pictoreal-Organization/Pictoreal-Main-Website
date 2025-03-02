"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Search, Download, Award, FileText, Loader2 } from "lucide-react";

export default function DonorCertificates() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchBy, setSearchBy] = useState("name"); // "name" or "regNumber"
  const [downloadingId, setDownloadingId] = useState(null);

  // Fetch approved donors
  useEffect(() => {
    const fetchApprovedDonors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate/certificate`);
        
        if (!res.ok) throw new Error("Failed to fetch donors");
        
        const data = await res.json();
        
        // Ensure we're working with an array of approved donors
        const approvedDonors = Array.isArray(data) 
          ? data 
          : Array.isArray(data.donors) 
            ? data.donors 
            : [];
            
        setDonors(approvedDonors);
        setFilteredDonors(approvedDonors);
      } catch (error) {
        console.error("Error fetching donors:", error);
        toast.error("Could not load donor data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedDonors();
  }, []);

  // Filter donors based on search input
  useEffect(() => {
    if (!search.trim()) {
      setFilteredDonors(donors);
      return;
    }

    const searchLower = search.toLowerCase().trim();
    const filtered = donors.filter(donor => {
      if (searchBy === "name") {
        return donor.name?.toLowerCase().includes(searchLower);
      } else {
        return donor.reg_number?.toLowerCase().includes(searchLower);
      }
    });

    setFilteredDonors(filtered);
  }, [search, donors, searchBy]);

  // Handle certificate download
  // Handle certificate download
const handleDownload = async (donorId, regNumber) => {
    try {
      setDownloadingId(donorId);
      
      // Updated URL to match the backend endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate/certificate/${regNumber}`);
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to generate certificate");
      }
  
      // Check if the response is a blob
      const contentType = res.headers.get("content-type");
      
      if (contentType && (contentType.includes("application/pdf") || contentType.includes("image/jpeg") || contentType.includes("image/jpg") || contentType.includes("image/png"))) {
        // Direct file response (PDF or image)
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Determine file extension based on content type
        let extension = "pdf";
        if (contentType.includes("image/jpeg") || contentType.includes("image/jpg")) {
          extension = "jpg";
        } else if (contentType.includes("image/png")) {
          extension = "png";
        }
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${regNumber}.${extension}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        
        toast.success("Certificate downloaded successfully!");
      } else {
        // JSON response with a URL
        const data = await res.json();
        
        if (data.certificateUrl) {
          // Determine file extension from the URL or default to pdf
          const urlLower = data.certificateUrl.toLowerCase();
          const extension = urlLower.includes(".jpg") || urlLower.includes(".jpeg") 
            ? "jpg" 
            : urlLower.includes(".png") 
              ? "png" 
              : "pdf";
          
          // Create invisible link and trigger download
          const a = document.createElement("a");
          a.href = data.certificateUrl;
          a.download = `certificate-${regNumber}.${extension}`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          
          toast.success("Certificate downloaded successfully!");
        } else {
          throw new Error("No certificate URL received");
        }
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error(error.message || "Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };
  // Format date for better readability
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get blood group badge color
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

  return (
    <div className="min-h-screen bg-red-50 p-6 md:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg mb-8 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Blood Donor Certificates</h1>
            <p className="text-red-100">Download your blood donation certificate</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Award className="mr-2 text-yellow-300" />
              <span className="font-medium">Recognize Your Contribution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      <div className="bg-white rounded-xl shadow-md mb-8 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder={`Search by ${searchBy === "name" ? "donor name" : "registration number"}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button 
              className={`px-4 py-2 ${searchBy === "name" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}
              onClick={() => setSearchBy("name")}
            >
              By Name
            </button>
            <button 
              className={`px-4 py-2 ${searchBy === "regNumber" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}
              onClick={() => setSearchBy("regNumber")}
            >
              By Reg. No
            </button>
          </div>
        </div>
      </div>

      {/* Donor List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <FileText className="mr-2 text-red-600" />
          Available Certificates
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-red-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading donor certificates...</p>
          </div>
        ) : filteredDonors.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No donors found</h3>
            <p className="text-gray-500">
              {search ? "Try a different search term or filter" : "There are no approved donors yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reg. Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donation Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonors.map((donor) => (
                  <tr key={donor._id} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                      <div className="text-sm text-gray-500">{donor.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono font-medium">{donor.reg_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBloodGroupColor(donor.bloodGroup)}`}>
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(donor.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDownload(donor._id, donor.reg_number)}
                        disabled={downloadingId === donor._id}
                        className={`flex items-center justify-center px-4 py-2 rounded-md ${
                          downloadingId === donor._id 
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed" 
                            : "bg-red-600 text-white hover:bg-red-700"
                        } transition-colors`}
                      >
                        {downloadingId === donor._id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Certificate
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Thank you for your valuable contribution to our blood donation program.</p>
        <p className="mt-1">If you have any issues downloading your certificate, please contact our support team.</p>
      </div>
    </div>
  );
}