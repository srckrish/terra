// Seed data for Terra application
// Initializes demo data for localStorage

import storage from '../utils/storage';

// Categories as specified in the build spec
export const CATEGORIES = {
  waste: {
    label: "River & Waste Cleanup",
    unit: "kg",
    phrase: (n) => `${n} kg waste removed`
  },
  plastic: {
    label: "Plastic Recovery",
    unit: "kg",
    phrase: (n) => `${n} kg plastic recovered`
  },
  trees: {
    label: "Tree Planting",
    unit: "ha",
    phrase: (n) => `${n} ha restored`
  },
  compost: {
    label: "Community Composting",
    unit: "kg",
    phrase: (n) => `${n} kg composted`
  }
};

// Districts as specified in the build spec
export const DISTRICTS = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Kavre"
];

// Seed users (demo accounts)
export const seedUsers = [
  {
    id: "user-sponsor-demo",
    name: "Demo Sponsor",
    email: "sponsor@terra.demo",
    phone: "+977-9841234567",
    password: "demo123",
    role: "sponsor",
    isOrganizer: false,
    organizationName: "",
    organizationAbout: "",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "user-organizer-demo",
    name: "Demo Organizer",
    email: "organizer@terra.demo",
    phone: "+977-9841234568",
    password: "demo123",
    role: "organizer",
    isOrganizer: true,
    organizationName: "Terra Demo Org",
    organizationAbout: "Demo organization for testing",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "user-verifier-demo",
    name: "Demo Verifier",
    email: "verifier@terra.demo",
    phone: "+977-9841234569",
    password: "demo123",
    role: "verifier",
    isOrganizer: false,
    organizationName: "Terra Verification Team",
    organizationAbout: "Official verifier for Terra projects",
    createdAt: "2026-09-01T10:00:00Z"
  }
];

// Seed projects (approximately 6 projects covering all categories, districts, and statuses)
export const seedProjects = [
  {
    id: "project-bagmati-cleanup",
    ownerId: "user-organizer-demo",
    title: "Bagmati Riverside Cleanup",
    description: "Community-driven cleanup of the Bagmati River banks in Kathmandu to remove waste and restore the river ecosystem.",
    category: "waste",
    district: "Kathmandu",
    place: "Bagmati River, Teku",
    lat: 27.6855,
    lng: 85.3202,
    eventDate: "2026-10-15T09:00:00Z",
    goalAmount: 50000, // Rs. 50,000
    targetResult: 500, // 500 kg waste removed
    volunteersNeeded: 30,
    budgetNote: "Funds will be used for waste collection bags, gloves, transportation, and disposal fees.",
    coverImageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHJpdmVyJTIwY2xlYW51cHxlbnwwfHx8fDE2NjQwNjUwMDg&ixlib=rb-1.2.1&q=80&w=400",
    status: "funding",
    reviewNote: "",
    createdAt: "2026-09-10T14:30:00Z"
  },
  {
    id: "project-balkhu-plastic",
    ownerId: "user-organizer-demo",
    title: "Balkhu Plastic Recovery Drive",
    description: "Focused plastic waste collection and recycling initiative in the Balkhu area to prevent plastic pollution in waterways.",
    category: "plastic",
    district: "Kathmandu",
    place: "Balkhu Waste Transfer Station",
    lat: 27.6609,
    lng: 85.2936,
    eventDate: "2026-10-22T10:00:00Z",
    goalAmount: 35000, // Rs. 35,000
    targetResult: 300, // 300 kg plastic recovered
    volunteersNeeded: 25,
    budgetNote: "Covers collection sacks, sorting equipment, and transport to recycling facility.",
    coverImageUrl: "https://images.unsplash.com/photo-1616507096876-0a9d7ec2a4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fcGxhc3RpYyUyMHJlY2xpY3xlbnwwfHx8fDE2NjQwNjUwMDk&ixlib=rb-1.2.1&q=80&w=400",
    status: "ready",
    reviewNote: "",
    createdAt: "2026-09-08T09:15:00Z"
  },
  {
    id: "project-godawari-trees",
    ownerId: "user-organizer-demo",
    title: "Godawari Community Tree Planting",
    description: "Reforestation initiative in Godawari Botanical Garden area to plant native tree species and restore green cover.",
    category: "trees",
    district: "Lalitpur",
    place: "Godawari, Lalitpur",
    lat: 27.5425,
    lng: 85.3524,
    eventDate: "2026-11-05T08:00:00Z",
    goalAmount: 45000, // Rs. 45,000
    targetResult: 2, // 2 hectares restored
    volunteersNeeded: 40,
    budgetNote: "Includes saplings, planting tools, mulch, and irrigation supplies for first month.",
    coverImageUrl: "https://images.unsplash.com/photo-1520253420418-6a2b5f0b4b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRyZWV8ZW58MHx8fHwxNjY0MDY1MDEw&ixlib=rb-1.2.1&q=80&w=400",
    status: "review",
    reviewNote: "",
    createdAt: "2026-09-05T16:45:00Z"
  },
  {
    id: "project-bhaktapur-compost",
    ownerId: "user-organizer-demo",
    title: "Bhaktapur Neighborhood Compost Project",
    description: "Community composting initiative in Bhaktapur to convert organic waste into valuable fertilizer for urban gardens.",
    category: "compost",
    district: "Bhaktapur",
    place: "Bhaktapur Durbar Square Area",
    lat: 27.6710,
    lng: 85.4299,
    eventDate: "2026-10-29T09:00:00Z",
    goalAmount: 25000, // Rs. 25,000
    targetResult: 1000, // 1000 kg composted
    volunteersNeeded: 20,
    budgetNote: "Funds for compost bins, shredders, and training materials for participants.",
    coverImageUrl: "https://images.unsplash.com/photo-1601043518124-2db4fd6b9f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNvbXBvc3QlMjBidWlufGVufDB8fHx8MTY2NDA2NTAxMQ&ixlib=rb-1.2.1&q=80&w=400",
    status: "verified",
    reviewNote: "Excellent community participation and measurable impact achieved.",
    createdAt: "2026-09-03T11:20:00Z"
  },
  {
    id: "project-kavre-restoration",
    ownerId: "user-organizer-demo",
    title: "Kavre Hillside Restoration",
    description: "Slope stabilization and reforestation project in Kavre district to prevent landslides and restore watershed health.",
    category: "trees",
    district: "Kavre",
    place: "Dhulikhel Hillside",
    lat: 27.6182,
    lng: 85.5426,
    eventDate: "2026-11-12T08:00:00Z",
    goalAmount: 60000, // Rs. 60,000
    targetResult: 1.5, // 1.5 hectares restored
    volunteersNeeded: 35,
    budgetNote: "Covers bio-engineering materials, saplings, and labor for slope stabilization work.",
    coverImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhpbGxzaWQlMjByZXN0b3JhdGlvbnxlbnwwfHx8fDE2NjQwNjUwMTI&ixlib=rb-1.2.1&q=80&w=400",
    status: "pending",
    reviewNote: "",
    createdAt: "2026-09-12T10:00:00Z"
  },
  {
    id: "project-taudaha-lake",
    ownerId: "user-organizer-demo",
    title: "Taudaha Lake Plastic Recovery",
    description: "Targeted cleanup of Taudaha Lake to remove floating plastic and protect aquatic habitat.",
    category: "plastic",
    district: "Kathmandu",
    place: "Taudaha Lake, Kirtipur",
    lat: 27.6389,
    lng: 85.2587,
    eventDate: "2026-10-18T10:00:00Z",
    goalAmount: 30000, // Rs. 30,000
    targetResult: 200, // 200 kg plastic recovered
    volunteersNeeded: 25,
    budgetNote: "Includes boats for lake access, collection nets, and proper disposal of collected waste.",
    coverImageUrl: "https://images.unsplash.com/photo-1559827260-bc64dbcb36ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGxha2V8ZW58MHx8fHwxNjY0MDY1MDEz&ixlib=rb-1.2.1&q=80&w=400",
    status: "evidence",
    reviewNote: "",
    createdAt: "2026-09-07T13:10:00Z"
  }
];

// Initialize seed data in localStorage
export const initializeSeedData = () => {
  // Initialize users if not present
  storage.initialize('users', seedUsers);

  // Initialize projects if not present
  storage.initialize('projects', seedProjects);

  // Initialize other storage keys with empty arrays
  storage.initialize('sponsorships', []);
  storage.initialize('volunteers', []);
  storage.initialize('evidence', []);
  storage.initialize('reports', []);
  storage.initialize('terra_session', null);

  console.log('Terra seed data initialized');
};

export default {
  CATEGORIES,
  DISTRICTS,
  seedUsers,
  seedProjects,
  initializeSeedData
};