export interface ProjectItem {
  id?: string;
  name: string;
  client: string;
  location: string;
  type: string;
  status: 'In Progress' | 'Completed';
  progress: number;
  value?: string;
  capacity?: string;
  powerCapacity?: string;
  workAwarded?: string;
  duration?: string;
  description: string;
  scope: string[];
  image: string;
  gallery: string[];
}

export const projects: ProjectItem[] = [
  // ── ONGOING PROJECTS (as per Company Profile PDF) ──────────────────────
  {
    name: 'Unit-4',
    client: 'Crownstone Constructions Pvt Ltd',
    location: 'Aequs HDC Itigatti , Hubli 580114',
    type: 'Industrial',
    status: 'In Progress',
    progress: 85,
    value: '2.2 Cr',
    capacity: '₹2.20 Crore',
    powerCapacity: '10 MVA',
    workAwarded: 'HT/LT Supply & Installation',
    duration: '6 months',
    description: 'Turnkey industrial electrical execution, high-capacity 10 MVA power distribution, HT/LT supply & installation, overhead crane electrification, transformer hookups, and plant lighting.',
    scope: [
      'Heavy Industrial HT/LT Power Distribution & Sub-Panels',
      'Overhead Crane Power Rails & Busbar System',
      'Factory Bay High-Lumen LED System',
      'Earthing Grid & Lightning Protection Network',
      'Final Load Testing & Class I Commissioning'
    ],
    image: '/images/projects/unit-4/unit4-1.png',
    gallery: [
      '/images/projects/unit-4/unit4-1.png',
      '/images/projects/unit-4/unit4-2.png',
      '/images/projects/unit-4/unit4-3.png',
      '/images/projects/unit-4/unit4-4.png',
      '/images/projects/unit-4/unit4-5.png',
      '/images/projects/unit-4/unit4-6.png',
    ]
  },
  {
    name: 'Axana Estate LLP - A03 (Foxconn Project)',
    client: 'Scon Projects, Pune',
    location: 'Walajabad Taluk, Orgadum, Tamil Nadu - 631604',
    type: 'Industrial',
    status: 'In Progress',
    progress: 80,
    value: '2 Cr',
    capacity: '₹2.00 Crore',
    powerCapacity: '10 MVA',
    workAwarded: 'HT/LT Installation',
    duration: '6 months',
    description: 'Mega-scale electronics manufacturing infrastructure for Foxconn facility, 10 MVA high-voltage substation interconnections, heavy-load busbar trunking, and high-density assembly lines.',
    scope: [
      '10 MVA HT/LT Substation & Transformer Installation',
      'High-Capacity Busbar Trunking System (BBT)',
      'Substation Interconnections & High-Voltage Termination',
      'Main Switchboards & Distributed Floor Panels',
      'High-Density Assembly Line Power Distribution'
    ],
    image: '/images/projects/foxconn/foxconn-1.png',
    gallery: [
      '/images/projects/foxconn/foxconn-1.png',
      '/images/projects/foxconn/foxconn-2.png',
      '/images/projects/foxconn/foxconn-3.png',
      '/images/projects/foxconn/foxconn-4.png',
      '/images/projects/foxconn/foxconn-5.png',
      '/images/projects/foxconn/foxconn-6.png',
    ]
  },
  {
    name: 'Thyssenkrupp Aerospace India Pvt Ltd',
    client: 'Crownstone Construction Pvt. Ltd.',
    location: 'KIADB, Industrial Area Budigere, Devanahalli, Bangalore',
    type: 'Industrial Project',
    status: 'In Progress',
    progress: 90,
    value: '2.1 Cr',
    capacity: '₹2.10 Crore',
    powerCapacity: '500 KVA',
    workAwarded: 'Temporary Power Connection - HT/LT Power Connection - CEIG - Supply & Installation',
    duration: '8 months',
    description: 'High-precision aerospace manufacturing facility electrical fit-out, temporary power connection, HT/LT power connection, CEIG approvals, clean-room power networks, and certified grounding.',
    scope: [
      'Temporary Power Connection & Substation Coordination',
      'HT/LT Power Connection & Statutory CEIG Approvals',
      'Clean-Room Compliant Power Distribution Networks',
      'Precision Machinery & CNC Unit Electrical Hookups',
      'Comprehensive Load Testing & Commissioning Handover'
    ],
    image: '/images/projects/thyssenkrupp/tk-1.jpg',
    gallery: [
      '/images/projects/thyssenkrupp/tk-1.jpg',
      '/images/projects/thyssenkrupp/tk-2.png',
      '/images/projects/thyssenkrupp/tk-3.png',
      '/images/projects/thyssenkrupp/tk-4.png',
      '/images/projects/thyssenkrupp/tk-5.png',
      '/images/projects/thyssenkrupp/tk-6.png',
    ]
  },
  {
    name: 'SFS Group India Pvt Ltd',
    client: 'Scon Projects, Pune',
    location: 'Kanagala Industrial Area, Belagavi',
    type: 'Industrial',
    status: 'In Progress',
    progress: 85,
    value: '1.7 Cr',
    capacity: '₹1.70 Crore',
    powerCapacity: '5 MVA',
    workAwarded: 'HT/LT Supply & Installation',
    duration: '8 months',
    description: 'Turnkey industrial electrical engineering, high-capacity 5 MVA power distribution, HT/LT supply and installation, bus duct integration, transformer hookups, and factory automation.',
    scope: [
      'Industrial HT/LT Distribution Panels & Switchgear',
      'Cable Tray Installation & Heavy Armored Cabling',
      'Plant Machinery Power Hookup & Synchronization',
      'Factory High-Bay Lighting & Earthing Grid',
      'Testing, Megger Checks, & Statutory Commissioning'
    ],
    image: '/images/projects/sfs/sfs-1.jpg',
    gallery: [
      '/images/projects/sfs/sfs-1.jpg',
      '/images/projects/sfs/sfs-2.jpg',
      '/images/projects/sfs/sfs-3.jpg',
      '/images/projects/sfs/sfs-4.jpg',
      '/images/projects/sfs/sfs-5.jpg',
      '/images/projects/sfs/sfs-6.jpg',
    ]
  },

  // ── COMPLETED PROJECTS ────────────────────────────────────────────────
  {
    name: 'Sterling Tech Project',
    client: 'Sterling Tech Mobility Limited',
    location: 'KIADB Industrial Area, Arebannimangala, Bangalore - 562149',
    type: 'Industrial Project',
    status: 'Completed',
    progress: 100,
    value: '1.2 Cr',
    capacity: '₹1.20 Crore',
    powerCapacity: '1000 KVA',
    workAwarded: 'LT Side Supply & Installation',
    duration: '8 months',
    description: 'EV component manufacturing facility electrification, 1000 KVA LT side supply & installation, automated testing bay power feeds, power monitoring panels, and energy-efficient infrastructure.',
    scope: [
      'LT Side Power Supply, Panels & Cable Bus Integration',
      'Automated Assembly Line Power Supply & Drops',
      'Dedicated Clean Power For Testing & Validation Bays',
      'Sub-Distribution Boards & Energy Management Meters',
      'Comprehensive Earth Pit Testing & Class I Certification'
    ],
    image: '/images/projects/sterling-tech/sterling-1.jpg',
    gallery: [
      '/images/projects/sterling-tech/sterling-1.jpg',
      '/images/projects/sterling-tech/sterling-2.jpg',
      '/images/projects/sterling-tech/sterling-3.jpg',
    ]
  },

  // ── CORPORATE CLIENT PORTFOLIO (PDF Page 3 Clients Served) ─────────────
  {
    name: 'Cold Storage & Office Area',
    client: 'SATS Food Solutions India Pvt Ltd',
    location: 'Bangalore, Karnataka',
    type: 'Food Tech & Cold Chain',
    status: 'Completed',
    progress: 100,
    value: '45 Lakhs',
    capacity: '₹45 Lakhs',
    powerCapacity: '750 KVA',
    workAwarded: 'Refrigeration & Office Electrification',
    duration: '5 months',
    description: 'Temperature-controlled cold room power distribution, clean-power electrical panels, and emergency freezer backup systems.',
    scope: [
      'Cold Room Refrigeration Compressor Power Hookups',
      'IP65 Rated Moisture-Proof Electrical Switchgear',
      'Corporate Office Wing Lighting & Power Distribution',
      'Uninterrupted DG Auto-Transfer Switching',
      'Statutory Inspection & Commissioning'
    ],
    image: '/images/projects/comp-1.png',
    gallery: [
      '/images/projects/comp-1.png',
    ]
  },
  {
    name: 'Heavy Industrial Manufacturing Facility',
    client: 'Jinabakul Forge Pvt Ltd',
    location: 'Kanagala Industrial Area, Belagavi',
    type: 'Heavy Industrial Engineering',
    status: 'Completed',
    progress: 100,
    value: '30 Lakhs',
    capacity: '₹30 Lakhs',
    powerCapacity: '1.5 MVA',
    workAwarded: 'Heavy Forge Press Power Supply',
    duration: '4 months',
    description: 'Heavy forge press power supply, power factor correction capacitor banks, vibration-resistant cable trays, and industrial switchgear.',
    scope: [
      'Heavy Duty Motor Control Centers (MCC)',
      'Power Factor Correction (APFC) Panel Integration',
      'Vibration-Resistant Heavy Gauge Cabling',
      'Transformer Yard Earthing & Safety Interlocks',
      'Annual Maintenance & Safety Audit Compliance'
    ],
    image: '/images/projects/comp-5.png',
    gallery: [
      '/images/projects/comp-5.png',
    ]
  },
  {
    name: 'Commercial Corporate Space',
    client: 'White Oaks',
    location: 'Bangalore, Karnataka',
    type: 'Commercial Infrastructure',
    status: 'Completed',
    progress: 100,
    value: '28 Lakhs',
    capacity: '₹28 Lakhs',
    powerCapacity: '350 KVA',
    workAwarded: 'Corporate Office Fit-Out',
    duration: '3 months',
    description: 'Corporate office floor electrification, server room clean UPS power, emergency exit signage, and fire-safe electrical conduit networks.',
    scope: [
      'Multi-Floor Commercial Power Distribution',
      'Server Room Dedicated UPS & Precision Earthing',
      'Energy-Efficient Dimmable Architectural Lighting',
      'Fire-Rated Low-Smoke Zero-Halogen (FRLS) Cabling',
      'Final Energization & As-Built Documentation'
    ],
    image: '/images/projects/comp-7.png',
    gallery: [
      '/images/projects/comp-7.png',
    ]
  },
  {
    name: 'Warehousing & Logistics Hub',
    client: 'Menzis Aviation Bengaluru Pvt Ltd',
    location: 'Bangalore Airport SEZ, Karnataka',
    type: 'Logistics Infrastructure',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: 'Class I Verified',
    powerCapacity: '800 KVA',
    workAwarded: 'High-Bay Lighting & Power Grid',
    duration: '6 months',
    description: 'High-bay warehouse electrical infrastructure, high mast lighting, and logistics cargo power distribution. Contractor: SPC. Consultant: Turner & Townsend.',
    scope: ['High-Bay Warehouse Lighting', 'Logistics Hub Power Distribution', 'Emergency Lighting & Signage'],
    image: '/images/projects/comp-4.png',
    gallery: ['/images/projects/comp-4.png']
  },
  {
    name: 'Office Space - A & D',
    client: 'Crownstone Construction Pvt.Ltd',
    location: 'Belgaum, Karnataka',
    type: 'Commercial Interiors',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: 'Class I Verified',
    powerCapacity: '250 KVA',
    workAwarded: 'Interior Electrification',
    duration: '3 months',
    description: 'Corporate office space complete electrical fit-out, workstations power drops, and server rack clean power systems.',
    scope: ['Corporate Interior Electrification', 'Modular Workstation Power Drops', 'Low-Voltage Distribution'],
    image: '/images/projects/comp-2.png',
    gallery: ['/images/projects/comp-2.png']
  },
  {
    name: 'Office Space - Savance',
    client: 'Crownstone Construction Pvt.Ltd',
    location: 'Belgaum, Karnataka',
    type: 'Commercial Interiors',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: 'Class I Verified',
    powerCapacity: '200 KVA',
    workAwarded: 'Office Interior Lighting & Power',
    duration: '3 months',
    description: 'Premium modern office space electrification, conference room AV/power integration, and energy-efficient LED layouts.',
    scope: ['Modern Interior Lighting', 'Conference Power & AV Conduit', 'Energy-Efficient LED Layout'],
    image: '/images/projects/comp-3.png',
    gallery: ['/images/projects/comp-3.png']
  },
  {
    name: 'Electronic Component Manufacturing',
    client: 'Sterling Mobility India',
    location: 'Bangalore, Karnataka',
    type: 'Industrial Automation',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: 'Class I Verified',
    powerCapacity: '1.2 MVA',
    workAwarded: 'Manufacturing Power Drops & Panels',
    duration: '5 months',
    description: 'Specialized manufacturing facility for automotive and electronic components power infrastructure and clean bus systems.',
    scope: ['Clean Assembly Power Drops', 'Stabilized Voltage Regulators', 'Main Electrical Panel Work'],
    image: '/images/projects/comp-6.png',
    gallery: ['/images/projects/comp-6.png']
  }
];

// Fallback image array preserved for backward compatibility
export const BACKUP_AI_IMAGES = [
  '/images/hero/panel-1.jpg',
  '/images/hero/workers/worker-1.png',
  '/images/hero/workers/worker-2.png',
  '/images/hero/workers/worker-3.png',
  '/images/hero/workers/worker-4.png',
  '/images/hero/workers/worker-5.png',
  '/images/projects/comp-1.png',
  '/images/projects/comp-2.png',
  '/images/projects/comp-3.png',
  '/images/projects/comp-4.png',
  '/images/projects/comp-5.png',
  '/images/projects/comp-6.png',
  '/images/projects/comp-7.png',
];
