export interface Course {
  id: string;
  category: string;
  rating: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  color: string;
  spotlightColor: string;
  duration: string;
  level: string;
  students: number;
  instructor: string;
  instructorBio: string;
  curriculum: {
    module: string;
    topics: string[];
  }[];
  skills: string[];
  prerequisites: string[];
  certification: string;
  jobGuarantee: boolean;
  placementRate: string;
  averageSalary: string;
}

export const courses: Course[] = [
  {
    id: "full-stack-dev",
    category: "Full Stack",
    rating: "4.9",
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, databases, and deployment strategies.",
    price: "₹79,999",
    originalPrice: "₹1,29,999",
    color: "#3B82F6",
    spotlightColor: "#60A5FA",
    duration: "16 weeks",
    level: "Beginner to Advanced",
    students: 2847,
    instructor: "Sarah Chen",
    instructorBio: "Senior Software Engineer at Google with 8 years of experience building scalable web applications.",
    curriculum: [
      {
        module: "Frontend Fundamentals",
        topics: ["HTML5 & CSS3", "JavaScript ES6+", "React.js", "TypeScript", "Tailwind CSS"]
      },
      {
        module: "Backend Development",
        topics: ["Node.js & Express", "RESTful APIs", "Authentication", "Database Design", "MongoDB & PostgreSQL"]
      },
      {
        module: "Advanced Topics",
        topics: ["GraphQL", "Microservices", "Docker", "AWS Deployment", "Testing & CI/CD"]
      },
      {
        module: "Capstone Project",
        topics: ["Full-stack Application", "Code Review", "Performance Optimization", "Production Deployment"]
      }
    ],
    skills: ["React.js", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker", "Git"],
    prerequisites: ["Basic computer skills", "Problem-solving mindset"],
    certification: "CareerLaunch Certified Full Stack Developer",
    jobGuarantee: true,
    placementRate: "94%",
    averageSalary: "₹10,00,000"
  },
  {
    id: "data-science",
    category: "Data Science",
    rating: "4.8",
    title: "Data Science & Machine Learning",
    description: "Learn Python, statistics, machine learning, and data visualization to become a data scientist.",
    price: "₹92,999",
    originalPrice: "₹1,45,999",
    color: "#10B981",
    spotlightColor: "#34D399",
    duration: "20 weeks",
    level: "Beginner to Advanced",
    students: 1923,
    instructor: "Dr. Michael Rodriguez",
    instructorBio: "Former Data Science Lead at Netflix with PhD in Statistics and 10 years of industry experience.",
    curriculum: [
      {
        module: "Python & Statistics",
        topics: ["Python Programming", "NumPy & Pandas", "Statistical Analysis", "Data Cleaning", "Jupyter Notebooks"]
      },
      {
        module: "Machine Learning",
        topics: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Neural Networks", "TensorFlow"]
      },
      {
        module: "Data Visualization",
        topics: ["Matplotlib & Seaborn", "Plotly", "Tableau", "Power BI", "Dashboard Creation"]
      },
      {
        module: "Real-world Projects",
        topics: ["Predictive Modeling", "NLP Projects", "Computer Vision", "Big Data with Spark", "Model Deployment"]
      }
    ],
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Tableau", "TensorFlow", "AWS"],
    prerequisites: ["Basic mathematics", "Analytical thinking"],
    certification: "CareerLaunch Certified Data Scientist",
    jobGuarantee: true,
    placementRate: "91%",
    averageSalary: "₹12,00,000"
  },
  {
    id: "mobile-development",
    category: "Mobile Dev",
    rating: "4.9",
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile apps using React Native and Flutter.",
    price: "₹74,999",
    originalPrice: "₹1,15,999",
    color: "#8B5CF6",
    spotlightColor: "#A78BFA",
    duration: "14 weeks",
    level: "Intermediate",
    students: 1456,
    instructor: "Alex Thompson",
    instructorBio: "Mobile App Architect at Uber with expertise in React Native and Flutter development.",
    curriculum: [
      {
        module: "Mobile Fundamentals",
        topics: ["Mobile Design Principles", "React Native Setup", "Navigation", "State Management", "APIs"]
      },
      {
        module: "Advanced Features",
        topics: ["Push Notifications", "Camera & Media", "Geolocation", "Offline Storage", "Performance"]
      },
      {
        module: "Cross-platform Development",
        topics: ["Flutter Basics", "Dart Programming", "Widget System", "Platform Channels", "Testing"]
      },
      {
        module: "Publishing & Distribution",
        topics: ["App Store Guidelines", "Play Store Publishing", "CI/CD for Mobile", "Analytics", "Monetization"]
      }
    ],
    skills: ["React Native", "Flutter", "JavaScript", "Dart", "Mobile UI/UX", "Firebase", "Git"],
    prerequisites: ["JavaScript knowledge", "Basic programming experience"],
    certification: "CareerLaunch Certified Mobile Developer",
    jobGuarantee: true,
    placementRate: "89%",
    averageSalary: "₹9,00,000"
  },
  {
    id: "cloud-engineering",
    category: "Cloud Eng",
    rating: "4.7",
    title: "Cloud Engineering & DevOps",
    description: "Master AWS, Docker, Kubernetes, and DevOps practices for scalable cloud infrastructure.",
    price: "₹87,999",
    originalPrice: "₹1,39,999",
    color: "#F59E0B",
    spotlightColor: "#FBBF24",
    duration: "18 weeks",
    level: "Intermediate to Advanced",
    students: 1678,
    instructor: "David Park",
    instructorBio: "Cloud Solutions Architect at Amazon Web Services with expertise in large-scale infrastructure.",
    curriculum: [
      {
        module: "Cloud Fundamentals",
        topics: ["AWS Core Services", "EC2 & VPC", "S3 & Storage", "IAM & Security", "Billing & Cost"]
      },
      {
        module: "Containerization",
        topics: ["Docker Fundamentals", "Container Orchestration", "Kubernetes", "EKS", "Container Security"]
      },
      {
        module: "DevOps & Automation",
        topics: ["CI/CD Pipelines", "Infrastructure as Code", "Terraform", "CloudFormation", "Monitoring"]
      },
      {
        module: "Advanced Topics",
        topics: ["Microservices Architecture", "Serverless Computing", "Multi-cloud Strategy", "Disaster Recovery"]
      }
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "Python", "Monitoring"],
    prerequisites: ["Basic programming", "Linux command line knowledge"],
    certification: "CareerLaunch Certified Cloud Engineer",
    jobGuarantee: true,
    placementRate: "92%",
    averageSalary: "₹14,00,000"
  },
  {
    id: "ux-design",
    category: "UX Design",
    rating: "4.8",
    title: "UX/UI Design Mastery",
    description: "Create stunning user experiences with design thinking, prototyping, and user research.",
    price: "₹64,999",
    originalPrice: "₹1,04,999",
    color: "#EF4444",
    spotlightColor: "#F87171",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    students: 2134,
    instructor: "Emma Williams",
    instructorBio: "Lead UX Designer at Airbnb with 7 years of experience designing user-centered products.",
    curriculum: [
      {
        module: "Design Fundamentals",
        topics: ["Design Principles", "Color Theory", "Typography", "Layout & Composition", "Design Systems"]
      },
      {
        module: "User Research",
        topics: ["User Interviews", "Personas", "Journey Mapping", "Usability Testing", "Analytics"]
      },
      {
        module: "Prototyping & Tools",
        topics: ["Figma Mastery", "Wireframing", "Prototyping", "Animation", "Handoff to Developers"]
      },
      {
        module: "Portfolio Development",
        topics: ["Case Study Creation", "Portfolio Website", "Interview Preparation", "Client Presentation"]
      }
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Design Systems", "HTML/CSS"],
    prerequisites: ["Creative mindset", "Basic computer skills"],
    certification: "CareerLaunch Certified UX Designer",
    jobGuarantee: true,
    placementRate: "87%",
    averageSalary: "₹7,50,000"
  },
  {
    id: "cybersecurity",
    category: "Security",
    rating: "4.9",
    title: "Cybersecurity Specialist",
    description: "Protect organizations from cyber threats with ethical hacking, penetration testing, and security analysis.",
    price: "₹99,999",
    originalPrice: "₹1,58,999",
    color: "#DC2626",
    spotlightColor: "#EF4444",
    duration: "22 weeks",
    level: "Intermediate to Advanced",
    students: 987,
    instructor: "Marcus Johnson",
    instructorBio: "Former NSA Cybersecurity Analyst with 12 years of experience in threat detection and prevention.",
    curriculum: [
      {
        module: "Security Fundamentals",
        topics: ["Network Security", "Cryptography", "Risk Assessment", "Compliance", "Security Frameworks"]
      },
      {
        module: "Ethical Hacking",
        topics: ["Penetration Testing", "Vulnerability Assessment", "Social Engineering", "Web App Security", "Mobile Security"]
      },
      {
        module: "Incident Response",
        topics: ["Digital Forensics", "Malware Analysis", "Threat Intelligence", "SOC Operations", "Crisis Management"]
      },
      {
        module: "Advanced Topics",
        topics: ["Cloud Security", "IoT Security", "AI in Cybersecurity", "Zero Trust Architecture", "Security Automation"]
      }
    ],
    skills: ["Penetration Testing", "Network Security", "Python", "Linux", "SIEM", "Incident Response", "Compliance"],
    prerequisites: ["Basic networking knowledge", "Programming fundamentals"],
    certification: "CareerLaunch Certified Cybersecurity Specialist",
    jobGuarantee: true,
    placementRate: "95%",
    averageSalary: "₹16,00,000"
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};
