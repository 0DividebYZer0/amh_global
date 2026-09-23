import { Product, CourseModule, IksArticle, ScheduledEvent, UserProgress } from '../types';

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Certified Moringa Seeds (PKM-1)',
    price: 250.00,
    cat: 'Seeds',
    stock: 'In Stock (88%+ Germination)',
    specs: 'High-density bushy spacing: 1m × 1m. Biomass foliage focus.',
    desc: 'Certified PKM-1 annual moringa seeds with 88%+ laboratory verified germination rate. Optimized for rapid biomass leaf yields and dense plantation cycles.',
    img: 'https://images.unsplash.com/photo-1574315042781-a675f284c8d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    title: 'Virgin Cold-Pressed Moringa Oil (1L)',
    price: 1100.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: '100% Virgin. Cold-pressed below 40°C. 72% oleic / behenic acid.',
    desc: 'Pharmaceutical-grade cold-pressed virgin seed oil for clean cosmetics, serums, and culinary formulations. Sub-micron filtered without chemical solvents.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    title: 'Nutritional Leaf Chaff (Animal Feed Grade)',
    price: 450.00,
    cat: 'By-Products',
    stock: 'Feed Grade · 20kg Bag',
    specs: 'Dry Matter: 91%, Crude Protein: 19.5%, Crude Fiber: 24%.',
    desc: 'Fibrous, protein-rich residual chaff from leaf de-stemming. Ideal for livestock ruminant and poultry organic ration enhancement.',
    img: 'https://images.unsplash.com/photo-1585646199341-a185ebc83eb3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    title: 'Cold-Pressed Virgin Oil (25L Commercial Drum)',
    price: 18500.00,
    cat: 'Bulk',
    stock: 'Commercial Freight · MOQ: 1 Drum',
    specs: 'UN-certified food-grade HDPE drum with nitrogen seal. Batch COA included.',
    desc: 'Commercial bulk container for cosmetic formulators, pharmaceutical manufacturers, and wholesale exporters. Direct freight dispatch from Barkly West.',
    img: 'https://images.unsplash.com/photo-1585646199341-a185ebc83eb3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p5',
    title: 'Perennial Moringa Seeds (PKM-2)',
    price: 280.00,
    cat: 'Seeds',
    stock: 'In Stock (86%+ Germination)',
    specs: 'Perennial orchard spacing: 2.5m × 2.5m. Heavy pod & oil yield.',
    desc: 'High-yield perennial cultivar designed for continuous pod production and high-oil extraction. Suitable for permanent orchards and multi-year harvest cycles.',
    img: 'https://images.unsplash.com/photo-1574315042781-a675f284c8d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p6',
    title: 'Facial Restorative Oil (50ml Dropper)',
    price: 150.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Amber glass UV-protective bottle with graduated silicone dropper.',
    desc: 'Pure topical moringa face and skin serum rich in natural behenic acid, zeatin, and plant sterols. Deep cellular hydration without greasy residue.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p7',
    title: 'Pure Organic Leaf Powder (250g Barrier Pouch)',
    price: 180.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Sub-40°C shadow-dried. Superfine 80 mesh. 28% protein.',
    desc: 'Unbleached certified organic leaf powder packed in resealable UV-barrier foil. Packed with essential amino acids, iron, potassium, and vitamins A & C.',
    img: 'https://images.unsplash.com/photo-1615486511484-92e172cb4fc0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p8',
    title: 'De-Oiled Seed Press Cake (Bio-Coagulant & Fertilizer)',
    price: 380.00,
    cat: 'By-Products',
    stock: 'In Stock · 25kg Bag',
    specs: 'Natural water clarification flocculant + high-nitrogen bio-fertilizer.',
    desc: 'De-oiled seed meal cakes used for eco-friendly water treatment coagulation and organic agricultural soil regeneration without synthetic compounds.',
    img: 'https://images.unsplash.com/photo-1585646199341-a185ebc83eb3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p9',
    title: 'AMH Commercial Moringa Agronomy Handbook',
    price: 450.00,
    cat: 'Digital',
    stock: 'Instant PDF Download',
    isDigital: true,
    downloadName: 'AMH_Commercial_Agronomy_Handbook_2026.pdf',
    specs: '128-page comprehensive field manual with high-density spacing tables.',
    desc: 'Authoritative field manual: soil chemistry, drip irrigation cycles, high-density cultivation schedules, botanical pest bio-management, and yield projections.',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p10',
    title: 'Standard Operating Procedures: Cold-Press Facility (SOP)',
    price: 650.00,
    cat: 'Digital',
    stock: 'Instant PDF Download',
    isDigital: true,
    downloadName: 'AMH_SOP_Cold_Press_Facility_Extraction.pdf',
    specs: 'GMP & HACCP-compliant extraction protocols with QA batch checklists.',
    desc: 'Complete operational protocols for hygienic mechanical screw pressing, temperature telemetry (<40°C), batch traceability, filtration, and export compliance.',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p11',
    title: 'Whole Dried Leaf Flakes (25kg Compressed Bale)',
    price: 4500.00,
    cat: 'Bulk',
    stock: 'Commercial Export · MOQ: 25kg',
    specs: 'Vacuum-sealed barrier liner. Moisture < 7.0%. Shadow-dehydrated.',
    desc: 'Premium export bales of whole shadow-dried moringa oleifera leaf for tea blenders, botanical beverage producers, and nutraceutical encapsulate manufacturers.',
    img: 'https://images.unsplash.com/photo-1585646199341-a185ebc83eb3?auto=format&fit=crop&w=600&q=80'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'm1',
    title: 'Moringa Agronomy & Site Selection',
    description: 'Optimal soil pH (6.3-7.0), semi-arid climate tolerance, and spacing models (PKM-1 high-density 1m × 1m vs. PKM-2 perennial seed orchard 2.5m × 2.5m).',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '18 min',
    resource: 'AMH_Agronomy_Site_Selection_Guide.pdf',
    h5p: {
      question: 'What is the recommended soil pH range and spacing configuration for intensive PKM-1 biomass leaf production?',
      choices: [
        'pH 4.5 – 5.5, Spacing 5m × 5m',
        'pH 6.3 – 7.0, Spacing 1m × 1m (High-Density)',
        'pH 8.5 – 9.5, Spacing 0.2m × 0.2m',
        'pH 5.0 – 6.0, Spacing 3m × 3m'
      ],
      correctIndex: 1,
      guidance: 'Review Section 1.2: Moringa thrives in well-drained sandy loam with near-neutral pH (6.3–7.0) and high-density 1m × 1m spacing for frequent coppicing.',
      successFeedback: 'Correct! PKM-1 requires neutral-to-mildly acidic sandy loam and high-density planting to maximize canopy regeneration.'
    }
  },
  {
    id: 'm2',
    title: 'Botanical Harvest & Dew Point Calibration',
    description: 'Precision harvesting protocols at dawn dew point to prevent UV photo-oxidation and preserve thermolabile Vitamin C and antioxidant bio-actives.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '22 min',
    resource: 'AMH_Harvest_Dew_Point_Protocol.pdf',
    h5p: {
      question: 'Why must Moringa oleifera leaves be harvested during early morning dew before direct midday sun?',
      choices: [
        'To reduce leaf moisture content prior to commercial drying',
        'To prevent solar photo-oxidation and preserve heat-sensitive Vitamin C and polyphenol bio-actives',
        'To accelerate chlorophyll degradation for lighter powder coloration',
        'To allow immediate unshaded open-sun baking'
      ],
      correctIndex: 1,
      guidance: 'Review Section 2.4: Dawn harvesting captures peak osmotic turgor and shields sensitive ascorbic acid from midday UV photolysis.',
      successFeedback: 'Spot on! Harvesting before midday heat protects heat-sensitive vitamins and yields vivid green leaf powder.'
    }
  },
  {
    id: 'm3',
    title: 'Cold-Press Extraction & Hydraulic Mechanics',
    description: 'Mechanical screw pressing, hydraulic pressure regulation (30–45 Bar), and strict temperature control maintained below 40°C for true virgin cosmetic oil.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '26 min',
    resource: 'AMH_Hydraulic_Pressing_Specs_2026.pdf',
    h5p: {
      question: 'What hydraulic operating pressure and temperature limit are mandatory for certified virgin cold-pressed moringa oil?',
      choices: [
        '10 – 15 Bar, 80°C extraction',
        '30 – 45 Bar, strictly below 40°C (True Cold-Press)',
        '70 – 90 Bar, 65°C solvent wash',
        '100+ Bar, uncontrolled friction temperature'
      ],
      correctIndex: 1,
      guidance: 'Review Section 3.1: True virgin botanical cold-pressing demands 30–45 Bar of hydraulic pressure without thermal breach over 40°C.',
      successFeedback: 'Excellent! Maintaining extraction below 40°C preserves the natural behenic acid ester profile.'
    }
  },
  {
    id: 'm4',
    title: 'Packaging, Shelf-Life & EU Compliance',
    description: 'Dark amber glass storage, critical moisture limits (< 7.0%), water activity thresholds, and European Cosmetic Regulation (EC No 1223/2009) criteria.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '21 min',
    resource: 'AMH_EU_Compliance_Whitepaper.pdf',
    h5p: {
      question: 'What moisture threshold and packaging standard are required to meet European pharmaceutical and cosmetic compliance?',
      choices: [
        'Moisture < 15%, clear polyethylene bags',
        'Moisture < 7.0%, amber UV-resistant glass or nitrogen-flushed barrier foil',
        'Moisture < 20%, permeable hessian sacks',
        'Moisture 10 – 12%, unsealed plastic drums'
      ],
      correctIndex: 1,
      guidance: 'Review Section 4.3: EU cosmetic mandates require water activity below 0.60 (< 7% moisture) and UV-blocking containers.',
      successFeedback: 'Accurate! Moisture under 7% prevents fungal mycotoxins, while UV barriers stop lipid peroxidation.'
    }
  },
  {
    id: 'm5',
    title: 'Academic Certification & Verification Ledger',
    description: 'Capstone review, digital cryptographic certificate issuance, and verifiable QR code credentialing registered to AMH verification registries.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '15 min',
    resource: 'AMH_Masterclass_Complete_Curriculum.pdf',
    h5p: {
      question: 'How does the AMH Global verification QR code authenticate credential legitimacy?',
      choices: [
        'It links to an editable public Google Docs document',
        'It resolves to an AMH cryptographically signed verification endpoint with unique certificate record',
        'It sends an automated SMS text message to the farmer',
        'It generates a temporary local browser session cookie'
      ],
      correctIndex: 1,
      guidance: 'Review Capstone Registry: The QR code encapsulates a tamper-proof verification endpoint matching database issuance.',
      successFeedback: 'Congratulations! Masterclass Complete! Your verified cryptographic certificate is unlocked.'
    }
  }
];

export const DEFAULT_USER_PROGRESS: UserProgress = {
  courseId: 'e1',
  title: 'Intensive Processing Masterclass',
  completedModules: [0, 1, 2],
  totalModules: 5,
  highestUnlockedIndex: 3,
  progressPercent: 60,
  completed: false,
  certIssued: false,
  certId: null
};

export const SEED_IKS_ARTICLES: IksArticle[] = [
  {
    id: 'i1',
    title: 'Traditional Dawn Hand-Harvesting & Solar Shadow-Drying',
    date: '20 Sep 2026',
    author: 'African Moringa Hub Indigenous Council',
    category: 'Harvesting',
    excerpt: 'Preserving thermolabile ascorbic acid and cellular integrity through dawn collection protocols and natural ventilated shadow-shed drying.',
    content: `<h3>Indigenous Field Principles</h3>
<p>Traditional African botanical wisdom instructs harvesters to gather tender leaves during the early dawn mist when ambient humidity protects delicate cellular vacuoles. Direct midday sunlight triggers rapid chlorophyll degradation and destroys up to 65% of bio-available Vitamin C within three hours of branch severance.</p>
<h4>The Shadow-Drying Method</h4>
<p>Rather than exposing leaves to harsh direct radiation, Indigenous Knowledge Systems (IKS) utilize raised bamboo or mesh drying racks housed beneath ventilated thatch or multi-layer shade netting. Airflow circulating freely at temperatures beneath 38°C allows moisture to evaporate steadily over 72 hours, concentrating the rich amino acid complex while maintaining an emerald-green powder appearance.</p>
<h4>Community Preservation Heritage</h4>
<p>Generations of dryland communities across Southern and Eastern Africa have used dried moringa leaf powder as a seasonal famine hedge, ground in stone mortars and sealed in fired clay vessels with beeswax closures.</p>`,
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'i2',
    title: 'Natural River Water Clarification Using Crushed Seed Cake',
    date: '12 Sep 2026',
    author: 'AMH Agro-Processing & Water Research',
    category: 'Water Remediation',
    excerpt: 'Utilizing dimeric cationic proteins present in Moringa oleifera seed meal as an organic non-toxic coagulant for turbid river water.',
    content: `<h3>Ancient Water Flocculation</h3>
<p>For centuries, riparian communities along the Nile and Zambezi river basins crushed mature moringa seeds into a paste to transform murky floodwaters into potable drinking water. Contemporary biochemical analysis confirms that moringa seed press cake contains water-soluble dimeric cationic proteins with an isoelectric point between 10 and 11.</p>
<h4>Biochemical Coagulation Mechanism</h4>
<p>When crushed seed powder is introduced to turbid water at a concentration of approximately 50 to 150 mg/L, the positively charged protein chains bind electrostatically to negatively charged silt particles, bacteria, and suspended organic colloids. These form dense flocs that settle rapidly within 45 to 60 minutes, removing 90–99% of suspended solids without altering the natural water pH or releasing toxic aluminum residues typical of synthetic chemical coagulants.</p>`,
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'i3',
    title: 'Soil Regeneration & High-Nitrogen Green Manure Practices',
    date: '04 Sep 2026',
    author: 'Vaaloewer Agricultural Collective',
    category: 'Regenerative Agriculture',
    excerpt: 'Combining pruned moringa foliage and root exudates to revive depleted Kalahari sandy soils through microbial fungal activation.',
    content: `<h3>Reversing Soil Depletion in Arid Zones</h3>
<p>Moringa oleifera acts as a powerful ecological pioneer in degraded, semi-arid sandy loam. Its extensive taproot penetrates deep into subsoil layers, mining calcium, iron, and potassium while aerating hardpan compaction.</p>
<h4>Foliar Mulching Dynamics</h4>
<p>Prunings collected during seasonal coppicing contain high levels of zeatin, a naturally occurring plant hormone belonging to the cytokinin group. When incorporated into the top 10cm of soil as green manure, the fast-decomposing biomass stimulates mycorrhizal colonization, increases organic soil carbon by up to 2.4% over 24 months, and reduces irrigation frequency by over 30%.</p>`,
    img: 'https://images.unsplash.com/photo-1615486171448-4e43b1897c8c?auto=format&fit=crop&w=800&q=80'
  }
];

export const SEED_SCHEDULED_EVENTS: ScheduledEvent[] = [
  {
    id: 'evt-1',
    title: 'Live Commercial Cold-Pressing Calibration Masterclass',
    price: 0,
    date: '2026-09-28',
    time: '14:00 SAST',
    durationMinutes: 90,
    seats: 40,
    room: 'AMH-ColdPress-Live-2026',
    platform: 'Jitsi',
    desc: 'Live streaming interactive session from our Barkly West processing facility. Watch real-time screw-press calibration, pressure monitoring, and ask agronomists questions via live video chat.',
    published: true
  },
  {
    id: 'evt-2',
    title: 'Outgrower Onboarding & Harvest Yield Standards Seminar',
    price: 0,
    date: '2026-10-05',
    time: '10:00 SAST',
    durationMinutes: 60,
    seats: 75,
    room: 'AMH-Outgrower-Seminar',
    platform: 'Jitsi',
    desc: 'Mandatory session for prospective farming partners. Covers quality grading, moisture testing procedures (<7%), off-take contract terms, and collection logistics.',
    published: true
  }
];

export const SEED_AFFILIATES = [
  { name: 'AgriTech Solutions Northern Cape', region: 'Kimberley & Barkly West', type: 'Certified Agro-Hub & Nursery' },
  { name: 'EcoFarms Cape Distribution', region: 'Western Cape (Paarl & Stellenbosch)', type: 'Bulk Cold-Press Oil Buyer' },
  { name: 'Green Leaf Organics Gauteng', region: 'Johannesburg & Pretoria', type: 'Nutraceutical Formulations Partner' },
  { name: 'Zululand Botanical Collective', region: 'KwaZulu-Natal (Empangeni)', type: 'Outgrower Aggregator' }
];

export const SEED_SUPPLIERS = [
  {
    id: 's1',
    date: '2026-09-18',
    farmName: 'Vaal River Agro Estates',
    representative: 'David Van Zyl',
    email: 'grower@vaalriver.co.za',
    phone: '+27 83 234 5678',
    province: 'Northern Cape',
    hectares: 12,
    crop: 'PKM-1 Certified Seed & Leaf Biomass',
    capacityNotes: 'Center pivot & drip irrigation from Vaal River. Organic transition in progress.',
    status: 'KYC Verification Pending' as const
  },
  {
    id: 's2',
    date: '2026-09-10',
    farmName: 'Kalahari Green Canopy',
    representative: 'Anna Venter',
    email: 'anna@kalaharicanopy.co.za',
    phone: '+27 82 998 1234',
    province: 'Free State',
    hectares: 5,
    crop: 'Whole Shadow-Dried Leaf Flakes',
    capacityNotes: 'Sub-40°C solar tunnel dryers installed with solar borehole irrigation.',
    status: 'Approved' as const
  }
];

export const SEED_RFQS = [
  {
    id: 'rfq-101',
    date: '2026-09-21',
    productTitle: 'Cold-Pressed Virgin Oil (25L Commercial Drum)',
    volume: '4 × 25L UN Drums (100 Liters)',
    company: 'Cape Botanical Formulations Pty',
    contact: 'Marcelle Du Plessis',
    email: 'marcelle@capebotanicals.co.za',
    phone: '+27 21 880 1200',
    destination: 'Stellenbosch Techno Park, Western Cape',
    notes: 'Require batch COA testing fatty acid profile and heavy metal assay for cosmetic export.',
    status: 'Pending Quotation'
  }
];

// Clean export aliases
export const SEED_MODULES = COURSE_MODULES;
export const SEED_EVENTS = SEED_SCHEDULED_EVENTS;
export const SEED_ARTICLES = SEED_IKS_ARTICLES;

export const DEMO_ACCOUNTS = [
  {
    role: 'farmer' as const,
    name: 'David Van Zyl',
    email: 'farmer@amhglobal.com',
    pass: 'Farmer2026',
    roleLabel: 'Outgrower Farmer',
    organization: 'Vaal River Agro Estates (12 Ha)',
    description: 'Outgrower farmer logging harvest yields for truck pickup, tracking payments, and viewing guaranteed off-take prices.'
  },
  {
    role: 'manufacturer' as const,
    name: 'Marcelle Du Plessis',
    email: 'buyer@capebotanicals.co.za',
    pass: 'Buyer2026',
    roleLabel: 'B2B Wholesale Manufacturer',
    organization: 'Cape Botanical Formulations (Pty) Ltd',
    description: 'Bulk wholesale buyer ordering 25L drums, downloading lab COA certificates, and requesting freight quotes.'
  },
  {
    role: 'community' as const,
    name: 'Elder M. Sithole',
    email: 'elder@community.org',
    pass: 'Elder2026',
    roleLabel: 'Community Elder (IKS)',
    organization: 'Limpopo Valley Indigenous Council',
    description: 'Traditional knowledge steward with audio read-aloud guides, plant wisdom submissions, and seed bank requests.'
  },
  {
    role: 'student' as const,
    name: 'Thabo Mokoena',
    email: 'student@gmail.com',
    pass: 'Student2026',
    roleLabel: 'Academy Student',
    organization: 'AMH Agro-Processing Masterclass',
    description: 'Enrolled learner completing interactive lessons, video simulations, and downloading cryptographic certificates.'
  },
  {
    role: 'admin' as const,
    name: 'AMH Operations Team',
    email: 'admin@amhglobal.com',
    pass: 'Admin2026',
    roleLabel: 'Facility Administrator',
    organization: 'AMH Global Traders Head Office',
    description: 'Full administrative control over product catalog, outgrower KYC, farmer yield approval, orders, and RFQ quotes.'
  }
];

export const SEED_BATCH_COAS = [
  {
    id: 'coa-2026-b4',
    lotNumber: 'AMH-OIL-2026-B4',
    productName: 'Virgin Cold-Pressed Moringa Oil',
    pressDate: '14 Sep 2026',
    releaseDate: '18 Sep 2026',
    lab: 'Central Agro-Analytical Testing Lab, Kimberley',
    params: {
      oleicAcid: '72.4%',
      behenicAcid: '6.8%',
      peroxideValue: '1.2 meq O2/kg (Max: 5.0)',
      freeFattyAcids: '0.42% (Max: 1.0%)',
      moisture: '0.04% (Max: 0.1%)',
      color: 'Golden Emerald Clear',
      heavyMetals: 'ND (< 0.01 mg/kg - Passed)',
      microbialCount: '< 10 CFU/g - Passed'
    },
    technician: 'Dr. Kobus Malan, PhD Analytical Chemist',
    signed: true
  },
  {
    id: 'coa-2026-s1',
    lotNumber: 'AMH-SEED-2026-PKM1-98',
    productName: 'Certified PKM-1 Seed Germination Batch',
    pressDate: '02 Sep 2026',
    releaseDate: '08 Sep 2026',
    lab: 'SANSOR Accredited Seed Testing Station',
    params: {
      germinationRate: '89.4% (Standard: 85%)',
      purity: '99.8%',
      inertMatter: '0.2%',
      seedMoisture: '6.4% (Safe Storage Band)',
      thousandSeedWeight: '284 grams',
      vigorIndex: 'High Field Emergence'
    },
    technician: 'Lindiwe Ndlovu, Senior Seed Analyst',
    signed: true
  }
];
