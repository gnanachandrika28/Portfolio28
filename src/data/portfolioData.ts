export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  tech: string[];
  categories: string[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  impact: string;
  architecture: string;
  developmentProcess: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  accentColor: string;
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Data & Analytics' | 'Web Development' | 'Tools';
  level: 'Strong Foundation' | 'Working Knowledge' | 'Familiar';
  description: string;
  icon: string;
}

export interface TimelineMilestone {
  period: string;
  title: string;
  focus: string;
  description: string;
  skills: string[];
  status?: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  stream: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  note?: string;
}

export const portfolioData = {
  personal: {
    name: 'Gnana Chandrika Boya',
    shortName: 'Gnana Chandrika',
    initials: 'GC',
    title: 'Software Engineer',
    subtitle: 'Software Engineer | Python Developer | Data & BI Enthusiast',
    email: 'gnanignani989@gmail.com',
    phone: '+91 9100428285',
    location: 'Guntakal, Anantapur District, Andhra Pradesh, India',
    locationShort: 'Guntakal, AP, India',
    github: 'https://github.com/gnanachandrika28',
    linkedin: 'https://www.linkedin.com/in/gnana-chandrika-boya',
    resumeFileName: 'Gnana_Chandrika_Boya_Resume.pdf',
    intro:
      'Software Engineer with a strong foundation in Python, SQL, data analysis, Power BI, and web development. I enjoy building practical solutions, interactive dashboards, and user-focused applications that solve real-world problems.',
    aboutMain:
      "I'm Gnana Chandrika Boya, a Software Engineer passionate about building practical technology solutions. I enjoy working with Python, SQL, Power BI, and web technologies to turn ideas and data into useful applications and meaningful insights. My learning journey combines software development, data analytics, and problem-solving.",
    aboutSecondary:
      "I have built projects such as a Placement Readiness Dashboard for analyzing student placement data and Study Share Hub, a full-stack platform for sharing academic resources. These projects have helped me strengthen my skills in programming, databases, data visualization, frontend development, backend development, and API integration. I'm continuously improving my DSA, Python, SQL, data analytics, and software development skills, while exploring new technologies and working on projects that solve real-world problems.",
    developerStatement: 'I believe the best way to learn technology is to build with it.',
    developerStatementSub:
      'I focus on learning by building, experimenting, solving problems, and continuously improving my technical skills.',
  },

  rotatingRoles: [
    'Software Engineer',
    'Python Developer',
    'Data Analyst',
    'Web Developer',
    'Problem Solver',
  ],

  stats: [
    { label: 'Major Projects', value: '2+', detail: 'Placement Dashboard & Study Hub' },
    { label: 'Core Technologies', value: '5+', detail: 'Python, SQL, Power BI, React, Node' },
    { label: 'Education', value: 'B.Tech', detail: 'Computer Science & Engineering' },
    { label: 'Specialization', value: 'Data + Web', detail: 'Analytics & Full Stack Development' },
  ],

  profileHighlights: [
    {
      title: 'Software Development',
      icon: 'Code2',
      description: 'Building practical applications using Python and modern web technologies.',
      accent: 'from-blue-500/20 to-cyan-500/20',
      borderAccent: 'group-hover:border-cyan-500/50',
    },
    {
      title: 'Data & Analytics',
      icon: 'BarChart3',
      description: 'Working with SQL, Excel, and Power BI to transform data into useful insights.',
      accent: 'from-purple-500/20 to-violet-500/20',
      borderAccent: 'group-hover:border-purple-500/50',
    },
    {
      title: 'Problem Solving',
      icon: 'Cpu',
      description: 'Strengthening programming fundamentals and DSA to develop better solutions.',
      accent: 'from-indigo-500/20 to-blue-500/20',
      borderAccent: 'group-hover:border-indigo-500/50',
    },
    {
      title: 'Continuous Learning',
      icon: 'Sparkles',
      description: 'Exploring new technologies and continuously improving through hands-on projects.',
      accent: 'from-violet-500/20 to-fuchsia-500/20',
      borderAccent: 'group-hover:border-violet-500/50',
    },
  ],

  interests: [
    'Python',
    'SQL',
    'Power BI',
    'Data Analytics',
    'Web Development',
    'DSA',
    'APIs',
    'AI/ML',
  ],

  skills: [
    // Programming
    {
      name: 'Python',
      category: 'Programming',
      level: 'Strong Foundation',
      description: 'Core syntax, data manipulation, automation scripts, algorithmic logic, and backend processing.',
      icon: 'FileCode2',
    },
    {
      name: 'Basic Java',
      category: 'Programming',
      level: 'Working Knowledge',
      description: 'Object-oriented programming, class design, inheritance, interfaces, and core Java foundations.',
      icon: 'Coffee',
    },
    {
      name: 'SQL',
      category: 'Programming',
      level: 'Strong Foundation',
      description: 'Relational database querying, multi-table JOINs, subqueries, group aggregations, and data filtering.',
      icon: 'Database',
    },
    {
      name: 'Basic DSA',
      category: 'Programming',
      level: 'Working Knowledge',
      description: 'Arrays, strings, searching, sorting algorithms, recursion, and computational complexity analysis.',
      icon: 'Boxes',
    },

    // Data & Analytics
    {
      name: 'Power BI',
      category: 'Data & Analytics',
      level: 'Strong Foundation',
      description: 'Interactive dashboard authoring, custom DAX measures, dynamic filtering, and visual reporting.',
      icon: 'BarChart2',
    },
    {
      name: 'Excel',
      category: 'Data & Analytics',
      level: 'Strong Foundation',
      description: 'Pivot tables, VLOOKUP/XLOOKUP, conditional formulas, data structuring, and tabular analysis.',
      icon: 'Table',
    },
    {
      name: 'Data Analysis',
      category: 'Data & Analytics',
      level: 'Strong Foundation',
      description: 'Data inspection, pattern discovery, trend identification, anomaly checking, and metric synthesis.',
      icon: 'PieChart',
    },
    {
      name: 'Data Visualization',
      category: 'Data & Analytics',
      level: 'Strong Foundation',
      description: 'Designing intuitive visual hierarchies, cross-filtered charts, KPI summary tiles, and executive graphs.',
      icon: 'LineChart',
    },

    // Web Development
    {
      name: 'React.js',
      category: 'Web Development',
      level: 'Working Knowledge',
      description: 'Component architecture, state management with hooks, responsive interfaces, and interactive single-page apps.',
      icon: 'Layout',
    },
    {
      name: 'Node.js',
      category: 'Web Development',
      level: 'Working Knowledge',
      description: 'Server runtime execution, asynchronous operations, npm package management, and backend logic.',
      icon: 'Server',
    },
    {
      name: 'Express.js',
      category: 'Web Development',
      level: 'Working Knowledge',
      description: 'RESTful API routing, middleware integration, JSON request parsing, and error-handling pipelines.',
      icon: 'Network',
    },
    {
      name: 'MongoDB',
      category: 'Web Development',
      level: 'Working Knowledge',
      description: 'NoSQL document schema modeling, collections, CRUD operations, and Mongoose integration.',
      icon: 'HardDrive',
    },
    {
      name: 'REST APIs',
      category: 'Web Development',
      level: 'Working Knowledge',
      description: 'Client-server communication, HTTP verbs, status codes, JSON payload contracts, and endpoint testing.',
      icon: 'Globe',
    },

    // Tools
    {
      name: 'Git',
      category: 'Tools',
      level: 'Working Knowledge',
      description: 'Distributed version control, branch management, commit hygiene, and change tracking.',
      icon: 'GitBranch',
    },
    {
      name: 'GitHub',
      category: 'Tools',
      level: 'Working Knowledge',
      description: 'Remote code repositories, README documentation, code reviews, and project collaboration.',
      icon: 'Github',
    },
    {
      name: 'VS Code',
      category: 'Tools',
      level: 'Strong Foundation',
      description: 'Primary IDE, debugging workflows, extensions ecosystem, integrated terminal, and code formatting.',
      icon: 'Terminal',
    },
    {
      name: 'Eclipse',
      category: 'Tools',
      level: 'Familiar',
      description: 'Java development environment, build path configuration, compilation, and workspace management.',
      icon: 'Layers',
    },
  ] as SkillItem[],

  projects: [
    {
      id: 'placement-readiness-dashboard',
      slug: 'placement-readiness-dashboard',
      title: 'Placement Readiness Dashboard',
      shortDescription:
        "An interactive dashboard designed to monitor and analyze students' placement readiness using academic and placement data.",
      tech: ['Power BI', 'SQL', 'Excel', 'Python'],
      categories: ['Data Analytics', 'Business Intelligence', 'Dashboard Development'],
      accentColor: 'from-purple-600 to-indigo-600',
      problem:
        'Placement coordinators and students frequently lack a consolidated, visual mechanism to assess readiness across academic percentages, aptitude tests, programming skills, communication levels, and interview benchmarks. Spreadsheets were fragmented and made trend evaluation difficult.',
      solution:
        'Engineered an end-to-end analytical solution: consolidated raw records using Python and Excel, structured relational queries in SQL to extract key performance indicators, and modeled interactive Power BI dashboards with real-time KPI metrics and dynamic filters.',
      keyFeatures: [
        'Interactive KPI cards summarizing total candidates, eligibility benchmarks, and clearance rates',
        'Attendance analysis to identify correlations between class presence and placement performance',
        'Aptitude score analysis tracking quantitative aptitude and logical reasoning percentiles',
        'Technical skill analysis evaluating core programming language proficiency',
        'Communication skill analysis monitoring verbal and interview presentation readiness',
        'Placement status visualization categorizing placed, eligible, and skill-gap cohorts',
        'Dynamic filters allowing slice-and-dice by academic department, graduation year, and score bands',
        'Systematic data cleaning and normalization using Python scripts and Excel formulas',
        'SQL-based data extraction joining multiple student examination and assessment tables',
        'Interactive Power BI visualizations with custom DAX calculations and drill-down capability',
      ],
      impact:
        'Helps placement officers and students identify strengths, skill gaps, and placement trends to support data-driven decision-making.',
      architecture:
        'Raw Student & Assessment Logs ➔ Python/Excel Pre-processing & Cleaning ➔ Relational SQL Queries ➔ Power BI Data Model (Star Schema) ➔ Interactive Drill-Through Visualizations',
      developmentProcess: [
        'Requirement Definition: Identified critical KPIs required by academic placement coordinators (attendance %, aptitude %, coding score, communication rating).',
        'Data Extraction: Authored SQL queries to join student master records, test scores, and interview ratings across semesters.',
        'Data Cleansing & Validation: Used Python and Excel to remove duplicates, standardize numerical ranges, and resolve missing values.',
        'Data Modeling & DAX Measures: Designed relationships in Power BI and wrote DAX measures for readiness scores and cohort percentages.',
        'Dashboard UI Design: Built an intuitive dark-themed analytical layout featuring dynamic slicers, gauge metrics, and comparative bar graphs.',
        'Validation & Testing: Cross-referenced aggregated visual figures against raw SQL extracts to guarantee mathematical integrity.',
      ],
      githubUrl: 'https://github.com/gnanachandrika28',
      liveDemoUrl: '',
    },
    {
      id: 'study-share-hub',
      slug: 'study-share-hub',
      title: 'Study Share Hub',
      shortDescription:
        'A full-stack web application that enables students to upload, organize, and share academic notes and study materials.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      categories: ['Full Stack', 'Web Development', 'Education Technology'],
      accentColor: 'from-cyan-600 to-blue-600',
      problem:
        'In academic environments, course materials, lecture notes, and previous question papers are often scattered across ephemeral messaging apps and unstructured cloud drives, leading to lost resources and inefficient exam preparation.',
      solution:
        'Developed a centralized full-stack web application offering role-based access, organized subject categorization, instant search, and seamless upload/management of academic notes.',
      keyFeatures: [
        'Secure user authentication and personalized student profile management',
        'Role-based access permissions separating general viewers and content contributors',
        'Complete CRUD operations allowing students to create, edit, update, and remove their study resources',
        'Structured study resource management organized by engineering semester, branch, and subject code',
        'Responsive and clean modern user interface crafted with React and intuitive UI patterns',
        'Modular REST APIs built with Express.js for handling note queries, metadata, and user operations',
        'Seamless frontend-backend integration with real-time feedback, loading states, and error handling',
        'MongoDB data management utilizing Mongoose schemas with indexed search capabilities',
      ],
      impact:
        'Provides an accessible, structured knowledge-sharing hub for student cohorts, streamlining exam preparation and peer-to-peer collaboration.',
      architecture:
        'React SPA Frontend (State & Hooks) ➔ Express REST API Server (Routing & Auth Middleware) ➔ MongoDB Database (Users, Notes, Subjects & Metadata)',
      developmentProcess: [
        'Architecture Planning: Defined API contracts, data models (User, Note, Subject, Semester), and component hierarchy.',
        'Backend Development: Built Node.js and Express server with RESTful endpoints (`/api/auth`, `/api/notes`, `/api/categories`).',
        'Database Schema: Configured MongoDB schemas using Mongoose with validation for titles, subject tags, and file links.',
        'Frontend Engineering: Created React component tree featuring searchable feeds, subject filter bars, and modal forms.',
        'Integration: Connected client-side Axios/Fetch calls to backend controllers with graceful loading states and error notifications.',
        'Refinement & Testing: Conducted cross-device testing to ensure seamless performance on mobile, tablet, and desktop screens.',
      ],
      githubUrl: 'https://github.com/gnanachandrika28',
      liveDemoUrl: '',
    },
  ] as ProjectItem[],

  journey: {
    title: 'Software Engineering & Technical Development',
    statusBadge: 'Currently Building • Learning • Improving',
    summary:
      'My journey is focused on mastering core computer science fundamentals, building practical software solutions, and turning data into actionable insights.',
    milestones: [
      {
        period: '2023 – 2024',
        title: 'Core Foundations & Programming Logic',
        focus: 'Computer Science Basics • Python • Algorithmic Thinking',
        description:
          'Enrolled in B.Tech Computer Science & Engineering. Built solid foundations in programming fundamentals, procedural logic, object-oriented concepts, and problem solving using Python and Java.',
        skills: ['Python', 'Java Basics', 'Logic Building', 'Problem Solving'],
      },
      {
        period: '2024 – 2025',
        title: 'Data Systems & Analytical Engineering',
        focus: 'SQL • Power BI • Business Intelligence • Excel',
        description:
          'Deepened skills in relational databases, writing multi-table SQL queries, and data extraction. Discovered data analytics and Power BI, creating comprehensive business intelligence reports and placement readiness models.',
        skills: ['SQL', 'Power BI', 'DAX', 'Excel', 'Data Modeling'],
      },
      {
        period: '2025 – Present',
        title: 'Full-Stack Web Engineering & Project Execution',
        focus: 'React.js • Node.js • Express • MongoDB • Advanced DSA',
        description:
          'Expanded into modern full-stack web engineering, architecting applications like Study Share Hub. Continuously practicing DSA in Python, strengthening backend integration, and learning emerging AI technologies.',
        skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Basic DSA'],
        status: 'Active Focus',
      },
    ] as TimelineMilestone[],
  },

  education: [
    {
      institution: 'Gates Institute of Technology',
      location: 'Gooty, Anantapur District, Andhra Pradesh',
      degree: 'Bachelor of Technology',
      stream: 'Computer Science & Engineering',
      duration: '2023 – 2027',
      highlights: [
        'Core Curriculum: Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Software Engineering',
        'Hands-on laboratory coursework in Python, Java, Database Systems, and Web Technologies',
        'Active participant in technical workshops, peer learning, and practical project builds',
      ],
    },
    {
      institution: 'Narayana Junior College',
      location: 'Guntakal, Andhra Pradesh',
      degree: 'Intermediate',
      stream: 'MPC (Mathematics, Physics, Chemistry)',
      duration: '2021 – 2023',
      highlights: [
        'Strong quantitative, analytical, and mathematical reasoning foundation',
        'Rigorous problem-solving discipline and logical analysis',
      ],
    },
  ] as EducationItem[],

  /**
   * Certifications & Learning
   * NOTE FOR USER: You can easily update this list with your verified certificates,
   * issuing bodies, completion dates, and credential links whenever you receive them!
   */
  certifications: [
    {
      id: 'cert-python',
      name: 'Python Programming & Problem Solving',
      issuer: 'Technical Certification Track',
      date: 'Continuous Practice',
      status: 'In Progress',
      note: 'Foundations of scripting, data structures, and algorithmic solutions in Python.',
    },
    {
      id: 'cert-sql',
      name: 'SQL & Relational Database Management',
      issuer: 'Database Learning Track',
      date: 'Continuous Practice',
      status: 'In Progress',
      note: 'Relational data modeling, complex query joins, aggregations, and data retrieval.',
    },
    {
      id: 'cert-powerbi',
      name: 'Power BI & Business Intelligence',
      issuer: 'Data Analytics Track',
      date: 'Continuous Practice',
      status: 'In Progress',
      note: 'Interactive reporting, DAX calculations, and KPI dashboard architecture.',
    },
    {
      id: 'cert-web',
      name: 'Full-Stack Web Development',
      issuer: 'Web Engineering Track',
      date: 'Continuous Practice',
      status: 'In Progress',
      note: 'Developing scalable web interfaces with React, Node.js, Express, and MongoDB.',
    },
  ] as CertificationItem[],

  achievements: [
    {
      title: 'End-to-End Analytics Dashboard',
      description: 'Engineered a comprehensive Placement Readiness Dashboard consolidating attendance, aptitude, and technical metrics into dynamic Power BI visualizations.',
      tag: 'Data Analytics',
      icon: 'BarChart3',
    },
    {
      title: 'Full-Stack Application Development',
      description: 'Architected and built Study Share Hub, an end-to-end full-stack web application for student academic resource sharing using React, Node.js, and MongoDB.',
      tag: 'Full Stack',
      icon: 'Layers',
    },
    {
      title: 'Practical SQL & Data Modeling',
      description: 'Proficient in writing complex SQL queries involving multi-table joins, aggregations, and subqueries for real-world analytical extraction.',
      tag: 'Database',
      icon: 'Database',
    },
    {
      title: 'Python Algorithmic Problem Solving',
      description: 'Strong foundation in writing clean, modular Python scripts to automate tasks and implement core algorithmic solutions.',
      tag: 'Programming',
      icon: 'Code',
    },
    {
      title: 'Foundational DSA Practice',
      description: 'Consistently strengthening fundamentals in arrays, strings, searching, sorting, and recursion to build efficient software.',
      tag: 'Problem Solving',
      icon: 'Cpu',
    },
    {
      title: 'Modern Responsive Web UI/UX',
      description: 'Experienced in crafting accessible, responsive, and performance-optimized user interfaces with modern React and Tailwind CSS.',
      tag: 'Frontend',
      icon: 'Layout',
    },
  ],

  howIBuild: [
    {
      step: '01',
      title: 'Understand',
      summary: 'Analyze problem requirements',
      description: 'Examine user requirements, identify pain points, define core data inputs, and outline clear project objectives.',
    },
    {
      step: '02',
      title: 'Design',
      summary: 'Plan architecture & schema',
      description: 'Architect data models, plan relational schemas or component hierarchies, and map intuitive user flows.',
    },
    {
      step: '03',
      title: 'Build',
      summary: 'Develop with modern tools',
      description: 'Implement clean, maintainable code using Python, SQL, Power BI, or modern full-stack web frameworks.',
    },
    {
      step: '04',
      title: 'Improve',
      summary: 'Test, optimize & learn',
      description: 'Test edge cases, refine performance, gather feedback, and continuously incorporate new technical insights.',
    },
  ],

  capabilities: [
    {
      title: 'Python Applications',
      description: 'Python-based applications, automated scripts, and problem-solving solutions with clean modular code.',
      icon: 'Terminal',
      tech: 'Python · Automation · Scripting',
    },
    {
      title: 'Data Dashboards',
      description: 'Interactive Power BI dashboards, KPI tracking, and visual analytics that transform complex records into clear insights.',
      icon: 'BarChart3',
      tech: 'Power BI · DAX · Data Viz',
    },
    {
      title: 'SQL & Data Solutions',
      description: 'Data extraction, relational querying, joins, aggregations, transformation, and database management.',
      icon: 'Database',
      tech: 'SQL · MySQL · Data Queries',
    },
    {
      title: 'Full-Stack Web Applications',
      description: 'Responsive, user-focused applications using modern frontend and backend technologies with RESTful APIs.',
      icon: 'Globe',
      tech: 'React · Node.js · Express · MongoDB',
    },
    {
      title: 'Student / Education Platforms',
      description: 'Useful applications designed specifically around academic, placement, and collaborative student requirements.',
      icon: 'GraduationCap',
      tech: 'EdTech · Study Share · Analytics',
    },
  ],

  githubRepos: [
    {
      name: 'Placement-Readiness-Dashboard',
      description: 'Interactive Power BI and SQL dashboard analyzing student placement readiness metrics, attendance, and aptitude scores.',
      language: 'Power BI / DAX',
      tags: ['power-bi', 'sql', 'analytics', 'dashboard'],
      stars: 1,
      forks: 0,
      url: 'https://github.com/gnanachandrika28',
    },
    {
      name: 'Study-Share-Hub',
      description: 'Full-stack MERN web application enabling students to upload, organize, search, and share academic study materials.',
      language: 'JavaScript / React',
      tags: ['react', 'node', 'express', 'mongodb'],
      stars: 1,
      forks: 0,
      url: 'https://github.com/gnanachandrika28',
    },
    {
      name: 'Python-Problem-Solving-and-Scripts',
      description: 'Collection of practical Python scripts, basic DSA implementations, and algorithmic problem-solving exercises.',
      language: 'Python',
      tags: ['python', 'dsa', 'algorithms', 'problem-solving'],
      stars: 1,
      forks: 0,
      url: 'https://github.com/gnanachandrika28',
    },
    {
      name: 'SQL-Data-Analysis-Queries',
      description: 'Relational database queries, multi-table joins, aggregation scripts, and schema setups for data analysis.',
      language: 'SQL',
      tags: ['sql', 'database', 'joins', 'queries'],
      stars: 1,
      forks: 0,
      url: 'https://github.com/gnanachandrika28',
    },
  ],
};
