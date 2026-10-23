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
  // ── COMPLETED PROJECTS (Profile v8 & Revision Guide: Finished work is primary proof) ──
  {
    name: 'Thyssenkrupp Aerospace India Pvt Ltd',
    client: 'Crownstone Constructions Pvt Ltd',
    location: 'KIADB Industrial Area, Budigere, Devanahalli, Bengaluru',
    type: 'Industrial',
    status: 'Completed',
    progress: 100,
    value: '₹2.1 Cr',
    capacity: '500 kVA',
    powerCapacity: '500 kVA',
    workAwarded: 'Temporary power connection, HT/LT power connection, supply & installation, CEIG approval',
    duration: '8 months',
    description: 'Temporary power, HT/LT power connection, supply and installation, with CEIG approval secured.',
    scope: [
      'Temporary Power Connection & Substation Coordination',
      'HT/LT Power Connection & Statutory CEIG Approvals',
      'Main LT Panel Room, PCC & ACB Panels',
      'Transformer Yard, Cable Line-up & Testing'
    ],
    image: '/images/projects/thyssenkrupp/tk-1.jpg',
    gallery: [
      '/images/projects/thyssenkrupp/tk-1.jpg',
      '/images/projects/thyssenkrupp/tk-2.jpg',
      '/images/projects/thyssenkrupp/tk-3.jpg',
      '/images/projects/thyssenkrupp/tk-4.jpg',
      '/images/projects/thyssenkrupp/tk-5.jpg',
      '/images/projects/thyssenkrupp/tk-6.jpg',
      '/images/projects/thyssenkrupp/tk-7.jpg',
      '/images/projects/thyssenkrupp/tk-8.jpg',
      '/images/projects/thyssenkrupp/tk-9.jpg',
      '/images/projects/thyssenkrupp/tk-10.jpg',
      '/images/projects/thyssenkrupp/tk-11.jpg',
      '/images/projects/thyssenkrupp/tk-12.jpg',
    ]
  },
  {
    name: 'SFS Group India Pvt Ltd',
    client: 'Scon Projects, Pune',
    location: 'Kanagala Industrial Area, Belagavi',
    type: 'Industrial',
    status: 'Completed',
    progress: 100,
    value: '₹1.7 Cr',
    capacity: '5 MVA',
    powerCapacity: '5 MVA',
    workAwarded: 'HT/LT supply & installation',
    duration: '8 months',
    description: 'HT/LT supply and installation for an industrial facility, including HT yard, DP structure, transformer and LT panel room.',
    scope: [
      'HT Yard & DP Structure Construction',
      'Transformer Yard & Substation Enclosure',
      'Industrial HT/LT Distribution Panels & Switchgear',
      'Cable Tray Installation & Heavy Armored Cabling',
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
  {
    name: 'Sterling Tech Mobility Ltd',
    client: 'Sterling Tech Mobility Ltd',
    location: 'KIADB Industrial Area, Arebannimangala, Bengaluru – 562149',
    type: 'Industrial',
    status: 'Completed',
    progress: 100,
    value: '₹1.2 Cr',
    capacity: '1,000 kVA (1 MVA)',
    powerCapacity: '1000 KVA',
    workAwarded: 'LT-side supply & installation',
    duration: '8 months',
    description: 'LT-side supply and installation for an EV manufacturing facility, including DG set, UPS and battery bank, LT panels and lighting.',
    scope: [
      'LT Side Power Supply, Panels & Cable Bus Integration',
      'DG Set Installation & Transformer Yard Hookups',
      'Dedicated UPS & Battery Bank Systems',
      'Sub-Distribution Boards & Plant Lighting'
    ],
    image: '/images/projects/sterling-tech/sterling-1.jpg',
    gallery: [
      '/images/projects/sterling-tech/sterling-1.jpg',
      '/images/projects/sterling-tech/sterling-2.jpg',
      '/images/projects/sterling-tech/sterling-3.jpg',
      '/images/projects/sterling-tech/sterling-4.jpg',
      '/images/projects/sterling-tech/sterling-5.jpg',
      '/images/projects/sterling-tech/sterling-6.jpg',
      '/images/projects/sterling-tech/sterling-7.jpg',
      '/images/projects/sterling-tech/sterling-8.jpg',
      '/images/projects/sterling-tech/sterling-9.jpg',
      '/images/projects/sterling-tech/sterling-10.jpg',
      '/images/projects/sterling-tech/sterling-11.jpg',
      '/images/projects/sterling-tech/sterling-12.jpg',
    ]
  },
  {
    name: 'Phase-II Indus Altum International School – DP & Hostel Blocks',
    client: 'Crownstone Constructions Pvt Ltd',
    location: 'Near Rani Channamma University, Belagavi',
    type: 'Institutional (School)',
    status: 'Completed',
    progress: 100,
    value: '₹1 Cr',
    capacity: '500 kVA',
    powerCapacity: '500 kVA',
    workAwarded: 'LT works – supply & installation',
    duration: '6 months',
    description: 'LT supply and installation for the school\'s DP and hostel blocks.',
    scope: [
      'School DP & Hostel Blocks Electrification',
      'Main LT Panels & Sub-Distribution Units',
      'Wall Panels, Cable Risers & Campus Lighting',
      'Testing, Safety Grounding & Certification'
    ],
    image: '/images/projects/indus-altum/indus-1.jpg',
    gallery: [
      '/images/projects/indus-altum/indus-1.jpg',
      '/images/projects/indus-altum/indus-2.jpg',
      '/images/projects/indus-altum/indus-3.jpg',
      '/images/projects/indus-altum/indus-4.jpg',
      '/images/projects/indus-altum/indus-5.jpg',
      '/images/projects/indus-altum/indus-6.jpg',
    ]
  },
  {
    name: 'Cold Storage & Office Area',
    client: 'SATS Food Solutions India Pvt Ltd',
    location: 'Bengaluru, Karnataka',
    type: 'Food Tech & Cold Chain',
    status: 'Completed',
    progress: 100,
    value: '₹45 Lakh',
    capacity: '750 kVA',
    powerCapacity: '750 KVA',
    workAwarded: 'Refrigeration & Office Electrification',
    duration: '5 months',
    description: 'Power distribution for temperature-controlled cold rooms and the office area.',
    scope: [
      'Cold Room Refrigeration Compressor Power Hookups',
      'IP65 Rated Moisture-Proof Electrical Switchgear',
      'Corporate Office Wing Lighting & Power Distribution',
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
    value: '₹30 Lakh',
    capacity: '1.5 MVA',
    powerCapacity: '1.5 MVA',
    workAwarded: 'Heavy Forge Press Power Supply',
    duration: '4 months',
    description: 'Heavy forge press power supply, power factor correction capacitor banks, vibration-resistant cable trays, and industrial switchgear.',
    scope: [
      'Heavy Duty Motor Control Centers (MCC)',
      'Power Factor Correction (APFC) Panel Integration',
      'Transformer Yard Earthing & Safety Interlocks'
    ],
    image: '/images/projects/comp-5.png',
    gallery: [
      '/images/projects/comp-5.png',
    ]
  },
  {
    name: 'Commercial Corporate Space',
    client: 'White Oaks',
    location: 'Bengaluru, Karnataka',
    type: 'Commercial Infrastructure',
    status: 'Completed',
    progress: 100,
    value: '₹28 Lakh',
    capacity: '350 kVA',
    powerCapacity: '350 KVA',
    workAwarded: 'Corporate Office Fit-Out',
    duration: '3 months',
    description: 'Corporate office floor electrification, server room clean UPS power, emergency exit signage, and fire-safe electrical conduit networks.',
    scope: [
      'Multi-Floor Commercial Power Distribution',
      'Server Room Dedicated UPS & Precision Earthing',
      'Energy-Efficient Dimmable Architectural Lighting'
    ],
    image: '/images/projects/comp-7.png',
    gallery: [
      '/images/projects/comp-7.png',
    ]
  },
  {
    name: 'Warehousing & Logistics Hub',
    client: 'Menzis Aviation Bengaluru Pvt Ltd',
    location: 'Bengaluru Airport SEZ, Karnataka',
    type: 'Logistics Infrastructure',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: '800 kVA',
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
    location: 'Belagavi, Karnataka',
    type: 'Commercial Interiors',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: '250 kVA',
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
    location: 'Belagavi, Karnataka',
    type: 'Commercial Interiors',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: '200 kVA',
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
    location: 'Bengaluru, Karnataka',
    type: 'Industrial Automation',
    status: 'Completed',
    progress: 100,
    value: 'Class I Handover',
    capacity: '1.2 MVA',
    powerCapacity: '1.2 MVA',
    workAwarded: 'Manufacturing Power Drops & Panels',
    duration: '5 months',
    description: 'Specialized manufacturing facility for automotive and electronic components power infrastructure and clean bus systems.',
    scope: ['Clean Assembly Power Drops', 'Stabilized Voltage Regulators', 'Main Electrical Panel Work'],
    image: '/images/projects/comp-6.png',
    gallery: ['/images/projects/comp-6.png']
  },

  // ── ONGOING PROJECTS (Profile v8 Slide 9 & Revision Guide Page 8) ──────
  {
    name: 'Unit-4, Aequs HDC',
    client: 'Crownstone Constructions Pvt Ltd',
    location: 'Aequs HDC, Itigatti, Hubballi – 580114',
    type: 'Industrial',
    status: 'In Progress',
    progress: 85,
    value: '₹2.2 Cr',
    capacity: '10 MVA',
    powerCapacity: '10 MVA',
    workAwarded: 'HT/LT supply & installation',
    duration: '6 months',
    description: 'HT/LT supply and installation, including HT panels, compact substation, transformer and outdoor LT panels.',
    scope: [
      'Heavy Industrial HT/LT Power Distribution & Sub-Panels',
      'Overhead Crane Power Rails & Busbar System',
      'Compact Substation & Transformer Hookups',
      'Earthing Grid & Lightning Protection Network'
    ],
    image: '/images/projects/unit-4/unit4-7.jpg',
    gallery: [
      '/images/projects/unit-4/unit4-7.jpg',
      '/images/projects/unit-4/unit4-8.jpg',
      '/images/projects/unit-4/unit4-9.jpg',
      '/images/projects/unit-4/unit4-10.jpg',
      '/images/projects/unit-4/unit4-11.jpg',
      '/images/projects/unit-4/unit4-12.jpg',
    ]
  },
  {
    name: 'Axana Estate LLP – A03 (Foxconn)',
    client: 'Scon Projects, Pune',
    location: 'Oragadam, Walajabad Taluk, Tamil Nadu – 631604',
    type: 'Industrial',
    status: 'In Progress',
    progress: 80,
    value: '₹2 Cr',
    capacity: '10 MVA',
    powerCapacity: '10 MVA',
    workAwarded: 'HT/LT installation',
    duration: '6 months',
    description: 'HT/LT installation for a large electronics manufacturing facility.',
    scope: [
      '10 MVA HT/LT Substation & Transformer Installation',
      'High-Capacity Busbar Trunking System (BBT)',
      'Substation Interconnections & High-Voltage Termination',
      'Main Switchboards & Distributed Floor Panels'
    ],
    image: '/images/projects/foxconn/foxconn-1.jpg',
    gallery: [
      '/images/projects/foxconn/foxconn-1.jpg',
      '/images/projects/foxconn/foxconn-2.jpg',
      '/images/projects/foxconn/foxconn-3.jpg',
      '/images/projects/foxconn/foxconn-4.jpg',
      '/images/projects/foxconn/foxconn-5.jpg',
      '/images/projects/foxconn/foxconn-6.jpg',
    ]
  },
  {
    name: 'Axana Estate LLP – B05 (Foxconn)',
    client: 'Scon Projects, Pune',
    location: 'Oragadam, Walajabad Taluk, Tamil Nadu – 631604',
    type: 'Industrial',
    status: 'In Progress',
    progress: 75,
    value: '₹2 Cr',
    capacity: '10 MVA',
    powerCapacity: '10 MVA',
    workAwarded: 'HT/LT installation, including ACB incomer, LT panels and cable tray routing',
    duration: '6 months',
    description: 'HT/LT installation, including ACB incomer, LT panels and cable tray routing.',
    scope: [
      'ACB Incomer Panel Installation & Commissioning',
      'Cable Trays & Heavy Armored LT Panels Line-up',
      'LT Panel Room & Sub-Distribution System',
      'Panels & Cable Risers Integration'
    ],
    image: '/images/projects/foxconn-b05/b05-1.jpg',
    gallery: [
      '/images/projects/foxconn-b05/b05-1.jpg',
      '/images/projects/foxconn-b05/b05-2.jpg',
      '/images/projects/foxconn-b05/b05-3.jpg',
      '/images/projects/foxconn-b05/b05-4.jpg',
      '/images/projects/foxconn-b05/b05-5.jpg',
      '/images/projects/foxconn-b05/b05-6.jpg',
    ]
  },
  {
    name: 'Inovit Aerospace Solutions Pvt Ltd (IASPL)',
    client: 'Crownstone Constructions Pvt Ltd',
    location: 'Aerospace Park, Devanahalli, Bengaluru, Karnataka',
    type: 'Industrial',
    status: 'In Progress',
    progress: 70,
    value: '₹1.5 Cr',
    capacity: '500 kVA',
    powerCapacity: '500 kVA',
    workAwarded: 'HT/LT power connection, supply and installation with CEIG approval',
    duration: '6 months',
    description: 'HT/LT power connection, supply & installation for aerospace facility, with CEIG approval secured.',
    scope: [
      'Temporary Power & Substation Infrastructure',
      'HT/LT Power Connection & Statutory CEIG Approvals',
      'Precision Clean-Room Compliant Power Networks',
      'Comprehensive Load Testing & Commissioning Handover'
    ],
    image: '/images/hero/hero-real-1.jpg',
    gallery: [
      '/images/hero/hero-real-1.jpg'
    ]
  },
  {
    name: 'Farmhouse',
    client: 'Crownstone Constructions Pvt Ltd',
    location: 'Belagavi, Karnataka',
    type: 'Residential',
    status: 'In Progress',
    progress: 60,
    value: '₹50 Lakh',
    capacity: '500 kVA',
    powerCapacity: '500 kVA',
    workAwarded: 'LT supply & installation',
    duration: '2 years',
    description: 'LT supply and installation for a large private residence estate.',
    scope: [
      'Private Estate LT Power Supply & Distribution',
      'Architectural & Grounds Lighting Networks',
      'Sub-Distribution Boards & Safety Grounding Grid'
    ],
    image: '/images/projects/farmhouse/farmhouse-coming-soon.jpg',
    gallery: [
      '/images/projects/farmhouse/farmhouse-coming-soon.jpg',
      '/images/projects/farmhouse/farmhouse-in-progress.jpg',
    ]
  }
];

export const BACKUP_AI_IMAGES = [
  '/images/hero/panel-1.jpg',
  '/images/hero/workers/worker-1.png',
  '/images/projects/comp-1.png',
  '/images/projects/comp-2.png',
  '/images/projects/comp-3.png',
  '/images/projects/comp-4.png',
  '/images/projects/comp-5.png',
  '/images/projects/comp-6.png',
  '/images/projects/comp-7.png',
];
