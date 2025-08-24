import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/sidebar-assetholder";
import { Header } from "@/components/header";
import { useRequests } from "@/contexts/RequestsContext";

export default function RequestNew() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { addRequest } = useRequests();
  const [form, setForm] = useState({
    propertyName: "",
    description: "",
    loanAmount: "",
    months: "",
    collateralType: "",
    yieldPreference: "",
    propertyPhoto: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, propertyPhoto: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.propertyName || !form.description || !form.loanAmount || !form.months || !form.collateralType) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new request
      addRequest({
        property: form.propertyName,
        rate: 6.0, // Default rate, could be calculated based on form data
        months: parseInt(form.months), // Use the months from form
        totalProofs: 6, // Default proof requirements
        loanAmount: parseFloat(form.loanAmount),
        image: `/properties/${Math.floor(Math.random() * 6) + 1}.png`, // Random property image
        description: form.description,
        collateralType: form.collateralType,
        yieldPreference: form.yieldPreference ? parseFloat(form.yieldPreference) : undefined,
      });
      
      // Show success message briefly before navigation
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/my-requests");
      }, 1000);
    } catch (error) {
      console.error("Error creating request:", error);
      alert("Error creating request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 w-screen">
      <Header userRole="AH" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar sidebarOpen={sidebarOpen} userRole="AH" userId="123" />
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {showSuccess && (
              <div className="bg-green-600 text-white px-4 py-3 rounded-lg mb-6">
                ✅ Request created successfully! Redirecting to requests page...
              </div>
            )}
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">
                Create New Asset Request
              </h1>
              <p className="text-gray-400">
                Submit a new asset request for funding consideration.
              </p>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Request Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill in the details below to create your asset request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="propertyName" className="text-gray-100">
                      Property Name
                    </Label>
                    <Input
                      name="propertyName"
                      value={form.propertyName}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyPhoto" className="text-gray-100">
                      Property Photo
                    </Label>
                    <Input
                      name="propertyPhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-gray-800 border-gray-700 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Upload a clear photo of the property (max 5MB)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-100">
                      Description
                    </Label>
                    <Textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanAmount" className="text-gray-100">
                      Loan Amount (USD)
                    </Label>
                    <Input
                      name="loanAmount"
                      type="number"
                      value={form.loanAmount}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collateralType" className="text-gray-100">
                      Collateral Type (e.g. yield, direct)
                    </Label>
                    <Input
                      name="collateralType"
                      value={form.collateralType}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="months" className="text-gray-100">
                      Loan Term (months)
                    </Label>
                    <Input
                      name="months"
                      type="number"
                      value={form.months}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yieldPreference" className="text-gray-100">
                      Yield Preference % (if any)
                    </Label>
                    <Input
                      name="yieldPreference"
                      type="number"
                      value={form.yieldPreference}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating Request..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
