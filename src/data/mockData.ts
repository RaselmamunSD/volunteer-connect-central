
import { StaticImageData } from "next/image";

export interface TeamMember {
  id: number;
  name: string;
  photo: string;
  title: string;
  phone: string;
  address: string;
}

export interface Volunteer {
  id: number;
  name: string;
  phone: string;
  address: string;
  contribution: number;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  address: string;
  amount: number;
  date: string;
  isPaid: boolean;
}

export interface Concert {
  id: number;
  title: string;
  date: string;
  venue: string;
  image: string;
  price: number;
}

// Sample team members data
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rahmat Ali",
    photo: "/placeholder.svg",
    title: "Event Director",
    phone: "01712345678",
    address: "Dhaka, Bangladesh"
  },
  {
    id: 2,
    name: "Nasrin Ahmed",
    photo: "/placeholder.svg",
    title: "Volunteer Coordinator",
    phone: "01798765432",
    address: "Chittagong, Bangladesh"
  },
  {
    id: 3,
    name: "Kamal Hassan",
    photo: "/placeholder.svg",
    title: "Finance Manager",
    phone: "01654321789",
    address: "Sylhet, Bangladesh"
  },
  {
    id: 4,
    name: "Fatima Khan",
    photo: "/placeholder.svg",
    title: "Marketing Director",
    phone: "01876543219",
    address: "Rajshahi, Bangladesh"
  }
];

// Sample volunteers data
export const volunteers: Volunteer[] = [
  {
    id: 1,
    name: "Abdul Karim",
    phone: "01912345678",
    address: "Mirpur, Dhaka",
    contribution: 1500
  },
  {
    id: 2,
    name: "Sabina Yasmin",
    phone: "01865432198",
    address: "Uttara, Dhaka",
    contribution: 2000
  },
  {
    id: 3,
    name: "Mohammed Hossain",
    phone: "01723456789",
    address: "Banani, Dhaka",
    contribution: 1800
  }
];

// Sample bookings data
export const bookings: Booking[] = [
  {
    id: 1,
    name: "Jamal Uddin",
    phone: "01512345678",
    address: "Gulshan, Dhaka",
    amount: 2500,
    date: "2023-10-15",
    isPaid: true
  },
  {
    id: 2,
    name: "Aisha Begum",
    phone: "01698765432",
    address: "Dhanmondi, Dhaka",
    amount: 3000,
    date: "2023-10-20",
    isPaid: false
  },
  {
    id: 3,
    name: "Rahim Khan",
    phone: "01756789123",
    address: "Mohammadpur, Dhaka",
    amount: 2000,
    date: "2023-10-25",
    isPaid: true
  }
];

// Sample concerts data
export const concerts: Concert[] = [
  {
    id: 1,
    title: "Annual Charity Concert 2023",
    date: "2023-11-15",
    venue: "City Auditorium, Dhaka",
    image: "/placeholder.svg",
    price: 1500
  },
  {
    id: 2,
    title: "Youth Music Festival",
    date: "2023-12-10",
    venue: "Central Park, Chittagong",
    image: "/placeholder.svg",
    price: 1200
  },
  {
    id: 3,
    title: "Cultural Evening",
    date: "2024-01-05",
    venue: "Community Center, Sylhet",
    image: "/placeholder.svg",
    price: 1000
  }
];
