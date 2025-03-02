"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { Search, Trash2, PlusCircle, Menu, Check, X, Save } from "lucide-react";

const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const categories = ["Faculty", "Student"];

export default function AdminPanel() {
  const [donors, setDonors] = useState([]);
  const [pendingDonors, setPendingDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({
    name: "",
    reg_number: "",
    mobile_number: "",
    category: "Faculty",
    bloodGroup: "O+",
    approved: false
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("register");
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch both approved and pending donors
  const fetchDonors = async () => {
    try {
      setLoading(true);

      // Fetch pending donors
      const adminRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate/admin`);
      if (!adminRes.ok) throw new Error("Failed to fetch pending donors");
      const adminData = await adminRes.json();
      console.log("Admin Data:", adminData); // Debugging


      // Ensure the expected data structure exists
      const approvedDonors = Array.isArray(adminData)
        ? adminData.filter(donor => donor.approved === true)
        : [];

      const pendingDonors = Array.isArray(adminData)
        ? adminData.filter(donor => donor.approved === false)
        : [];

      console.log("Updated Approved Donors:", approvedDonors);
      console.log("Updated Pending Donors:", pendingDonors);


      setDonors(approvedDonors);
      setPendingDonors(pendingDonors);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Error loading donors");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDonors();
  }, []);

  const handleChange = (e) => {
    setNewDonor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!newDonor.name.trim()) return toast.error("Name is required!");

    try {
      setLoading(true);

      const donorData = { ...newDonor };
      console.log("Sending Data:", JSON.stringify(donorData));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });

      if (!res.ok) throw new Error("Failed to add donor");

      // After successful submission, fetch the updated donor list
      await fetchDonors();

      // Reset form
      setNewDonor({
        name: "",
        reg_number: "",
        mobile_number: "",
        category: "Faculty",
        bloodGroup: "O+",
      });

      toast.success("Donor added successfully! Awaiting approval.");
      setPage("list");
      setActiveTab("pending");

    } catch (error) {
      console.error("Error saving donor:", error);
      toast.error("Error adding donor");
    } finally {
      setLoading(false);
    }
  }, [newDonor]);


  const handleApprove = async (id) => {
    try {
      setLoading(true);

      // Find the donor using the _id and extract the reg_number
      const donorToApprove = pendingDonors.find(d => d._id === id);
      if (!donorToApprove) throw new Error("Donor not found");

      const donorRegnoArray = [donorToApprove.reg_number]; // ✅ Send reg_number

      console.log("Sending Data:", JSON.stringify({ donorRegno: donorRegnoArray }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate/admin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorRegno: donorRegnoArray }), // ✅ Correct key
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to approve donor");
      }

      fetchDonors();
      toast.success("Donor approved successfully!");
    } catch (error) {
      console.error("Error approving donor:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };





  // const handleDelete = async (id, isPending = false) => {
  //   try {
  //     setLoading(true);

  //     // Delete from backend
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate/admin/${id}`, { 
  //       method: "DELETE" 
  //     });

  //     if (!res.ok) throw new Error("Failed to delete donor");

  //     // Update local state
  //     if (isPending) {
  //       setPendingDonors(prev => prev.filter(d => d._id !== id));
  //     } else {
  //       setDonors(prev => prev.filter(d => d._id !== id));
  //     }

  //     toast.success("Donor removed successfully");
  //   } catch (error) {
  //     console.error("Error deleting donor:", error);
  //     toast.error("Error deleting donor");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Filter donors based on search and active tab
  const getFilteredDonors = () => {
    console.log("Donors List:", donors);
    console.log("Pending Donors List:", pendingDonors);

    const list = activeTab === "pending" ? pendingDonors : donors;

    return list.filter(d =>
      d?.name?.toLowerCase().includes(search.toLowerCase()) // Ensuring `d` is valid
    );
  };

  const filteredDonors = getFilteredDonors();

  return (
    <div className="min-h-screen bg-red-100 p-8 text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-red-700">Blood Donation Admin</h1>
        <button className="text-red-700" onClick={() => setPage(page === "register" ? "list" : "register")}>
          <Menu size={32} />
        </button>
      </div>

      {page === "register" ? (
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-red-700 mb-4">Register New Donor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={newDonor.name}
                onChange={handleChange}
                placeholder="Enter donor's full name"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="regNo" className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <input
                id="regNo"
                type="text"
                name="reg_number"
                value={newDonor.reg_number}
                onChange={handleChange}
                placeholder="Enter registration number"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                id="mobile"
                type="text"
                name="mobile_number"
                value={newDonor.mobile_number}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={newDonor.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={newDonor.bloodGroup}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>

            <button type="submit" className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
              <PlusCircle className="mr-2" /> Add Donor
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-red-700 mb-4">Donor List</h2>

          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-4">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'border-b-2 border-red-600 text-red-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approval ({pendingDonors.length})
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'approved' ? 'border-b-2 border-red-600 text-red-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('approved')}
            >
              Approved Donors ({donors.length})
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search donors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg"
            />
          </div>

          {loading ? <p className="text-center text-gray-600">Loading...</p> : (
            <div className="max-h-80 overflow-auto">
              {filteredDonors.length === 0 ? (
                <p className="text-center text-gray-600 py-4">
                  {activeTab === 'pending' ? 'No pending donors found' : 'No approved donors found'}
                </p>
              ) : (
                <table className="w-full text-left border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-red-600 text-white">
                      <th className="p-3 border">Name</th>
                      <th className="p-3 border">Reg No</th>
                      <th className="p-3 border">Mobile</th>
                      <th className="p-3 border">Blood Group</th>
                      <th className="p-3 border">Category</th>
                      <th className="p-3 border">Date</th>
                      <th className="p-3 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonors.map((donor) => (
                      <tr
                        key={donor._id}
                        className={`border hover:bg-gray-100 ${activeTab === 'pending' ? 'bg-yellow-50' : ''}`}
                      >
                        <td className="p-3 border">{donor.name}</td>
                        <td className="p-3 border">{donor.reg_number}</td>
                        <td className="p-3 border">{donor.mobile_number}</td>
                        <td className="p-3 border">{donor.bloodGroup}</td>
                        <td className="p-3 border">{donor.category}</td>
                        <td className="p-3 border">{new Date(donor.date).toLocaleDateString()}</td>
                        <td className="p-3 border flex space-x-2">
                          {activeTab === 'pending' && (
                            <button
                              onClick={() => handleApprove(donor._id)}
                              className="bg-green-600 text-white p-1 rounded hover:bg-green-700"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          {/*<button
                            onClick={() => handleDelete(donor._id, activeTab === 'pending')}
                            className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>*/}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}