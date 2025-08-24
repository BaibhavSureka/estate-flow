import { createContext, useContext, useState, ReactNode } from "react";

export interface EstateFlowRequest {
  id: string;
  property: string;
  rate: number;
  months: number;
  status: "Open" | "Pending" | "Completed" | "Rejected";
  proofSubmitted: number;
  totalProofs: number;
  loanAmount: number;
  image: string;
  description?: string;
  collateralType?: string;
  yieldPreference?: number;
  createdAt: Date;
}

interface RequestsContextType {
  requests: EstateFlowRequest[];
  addRequest: (request: Omit<EstateFlowRequest, "id" | "createdAt" | "status" | "proofSubmitted">) => void;
  updateRequest: (id: string, updates: Partial<EstateFlowRequest>) => void;
  deleteRequest: (id: string) => void;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

// Initial mock data
const initialRequests: EstateFlowRequest[] = [
  {
    id: "p1",
    property: "Jaipur Palace",
    rate: 5.9,
    months: 24,
    status: "Open",
    proofSubmitted: 2,
    totalProofs: 6,
    loanAmount: 250000,
    image: "/properties/1.png",
    description: "Luxurious palace-style property in Jaipur",
    collateralType: "yield",
    yieldPreference: 6.5,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "p2",
    property: "Pune Residency",
    rate: 6.3,
    months: 36,
    status: "Pending",
    proofSubmitted: 0,
    totalProofs: 6,
    loanAmount: 320000,
    image: "/properties/2.png",
    description: "Modern residential complex in Pune",
    collateralType: "direct",
    yieldPreference: 5.8,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "p3",
    property: "Goa Beach Villa",
    rate: 5.5,
    months: 48,
    status: "Open",
    proofSubmitted: 4,
    totalProofs: 6,
    loanAmount: 450000,
    image: "/properties/3.png",
    description: "Beachfront villa in Goa",
    collateralType: "yield",
    yieldPreference: 7.2,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "p4",
    property: "Bangalore Tech Park",
    rate: 6.1,
    months: 30,
    status: "Open",
    proofSubmitted: 1,
    totalProofs: 6,
    loanAmount: 380000,
    image: "/properties/4.png",
    description: "Commercial tech park in Bangalore",
    collateralType: "direct",
    yieldPreference: 6.0,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "p5",
    property: "Hyderabad Heights",
    rate: 5.7,
    months: 36,
    status: "Pending",
    proofSubmitted: 3,
    totalProofs: 6,
    loanAmount: 290000,
    image: "/properties/5.png",
    description: "High-rise residential building in Hyderabad",
    collateralType: "yield",
    yieldPreference: 6.8,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "p6",
    property: "Chennai Marina",
    rate: 6.0,
    months: 24,
    status: "Open",
    proofSubmitted: 5,
    totalProofs: 6,
    loanAmount: 275000,
    image: "/properties/4.png",
    description: "Marina-front property in Chennai",
    collateralType: "direct",
    yieldPreference: 5.5,
    createdAt: new Date("2024-01-12"),
  },
];

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<EstateFlowRequest[]>(initialRequests);

  const addRequest = (requestData: Omit<EstateFlowRequest, "id" | "createdAt" | "status" | "proofSubmitted">) => {
    const newRequest: EstateFlowRequest = {
      ...requestData,
      id: `p${Date.now()}`, // Generate unique ID
      status: "Open",
      proofSubmitted: 0,
      createdAt: new Date(),
    };
    
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequest = (id: string, updates: Partial<EstateFlowRequest>) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, ...updates } : request
      )
    );
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(request => request.id !== id));
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, updateRequest, deleteRequest }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    throw new Error("useRequests must be used within a RequestsProvider");
  }
  return context;
}

