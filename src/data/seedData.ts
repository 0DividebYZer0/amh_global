import { Product, CourseModule, IksArticle, ScheduledEvent, UserProgress, AffiliatePartner } from '../types';

export const SEED_PRODUCTS: Product[] = [
  // Core Seed Varieties (PKM-1 and PKM-2)
  {
    id: 'p1',
    title: 'Certified Moringa Seeds (PKM-1)',
    price: 250.00,
    cat: 'Seeds',
    stock: 'In Stock (88%+ Germination)',
    specs: 'Annual Bushy Biomass Strain · 1m × 1m High-Density Spacing · Foliage Focus',
    desc: 'Certified PKM-1 annual moringa seeds with 88%+ laboratory verified germination. Bred for rapid vegetative biomass leaf yields, intense branch coppicing every 35-45 days, and highest protein foliage output.',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p5',
    title: 'Perennial Moringa Seeds (PKM-2)',
    price: 280.00,
    cat: 'Seeds',
    stock: 'In Stock (86%+ Germination)',
    specs: 'Perennial High-Pod & Oil Strain · 2.5m × 2.5m Orchard Spacing · Heavy Seed Yield',
    desc: 'High-yielding perennial cultivar designed for continuous pod production and high-oil extraction (up to 40% lipid content). Long slender pods (1.2m) with 25-30 seeds per pod. Suitable for permanent orchards.',
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
  },

  // Value-Added Retail Products: Cold-Pressed Oil & Varied Leaf Powder Sizes
  {
    id: 'p6',
    title: 'Facial Restorative Moringa Seed Oil (50ml Dropper)',
    price: 150.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Amber glass UV bottle · Precision silicone pipette · 72% Oleic & Behenic Acid',
    desc: 'Sub-40°C virgin cold-pressed facial serum. Rich in natural zeatin, vitamins A, C & E, and behenic acid. Lightweight, non-greasy cellular hydration for dry, aging, or sun-stressed skin.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p6-100',
    title: 'Virgin Cold-Pressed Moringa Oil (100ml Cosmetic Pump)',
    price: 260.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Frosted amber bottle with lockable pump · 100% Raw Virgin Cold-Pressed',
    desc: 'Versatile cosmetic & hair restorative oil. Absorbs instantly into hair cuticles and sensitive skin without synthetic fragrances, preservatives, or chemical solvents.',
    img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p6-500',
    title: 'Virgin Cold-Pressed Moringa Seed Oil (500ml Bottle)',
    price: 620.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Pharmaceutical green UV glass · Cold-pressed below 40°C · High stability',
    desc: 'Half-liter culinary and apothecary grade virgin oil. Ideal for boutique cosmetic formulators, massage therapists, and high-smoke-point antioxidant culinary dressing.',
    img: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    title: 'Virgin Cold-Pressed Moringa Oil (1L Bottle)',
    price: 1100.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: '100% Virgin Food & Cosmetic Grade · Cold-pressed below 40°C · Sub-micron filtered',
    desc: 'Pharmaceutical-grade cold-pressed virgin seed oil for clean cosmetics, clinical serums, and premium culinary formulations. Zero hexane or solvent extraction.',
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p7',
    title: 'Pure Organic Moringa Leaf Powder (250g Barrier Pouch)',
    price: 180.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Sub-40°C Shadow-Dried · Superfine 80 Mesh · 28%+ Bio-Protein',
    desc: 'Certified organic whole leaf powder packed in resealable UV-barrier foil. Packed with 9 essential amino acids, bio-available iron, calcium, and polyphenols.',
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p7-500',
    title: 'Pure Organic Moringa Leaf Powder (500g Family Eco Pouch)',
    price: 320.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Resealable Stand-Up Foil Barrier · Shadow-Dehydrated · Mesh 80',
    desc: 'Eco-sized half-kilogram pack of premium shadow-dried green moringa leaf powder. Ideal for daily family smoothies, herbal infusions, and immune vitality.',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p7-1000',
    title: 'Pure Organic Moringa Leaf Powder (1kg Value Pouch)',
    price: 580.00,
    cat: 'Value-Added',
    stock: 'In Stock',
    specs: 'Commercial 1kg Foil Barrier Pouch · Certified EU/NOP Equivalent Standard',
    desc: 'Full 1kg value pack of superfine unbleached leaf powder. Designed for catering, wellness practitioners, and frequent smoothie bar blenders.',
    img: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80'
  },

  // Agricultural By-Products (Monetized Processing Waste)
  {
    id: 'p8',
    title: 'De-Oiled Moringa Seed Press Cake (25kg Bag)',
    price: 380.00,
    cat: 'By-Products',
    stock: 'In Stock · 25kg Woven Bag',
    specs: 'Natural River Water Coagulant + High-Nitrogen Organic Bio-Fertilizer (5% N)',
    desc: 'De-oiled seed meal cakes from cold mechanical screw pressing. Contains water-soluble cationic proteins for natural water clarification flocculation, plus high organic nitrogen soil revitalization.',
    img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p8-100',
    title: 'De-Oiled Moringa Seed Press Cake (100kg Bulk Sack)',
    price: 1400.00,
    cat: 'By-Products',
    stock: 'In Stock · 4 × 25kg Sacks',
    specs: 'Agricultural Compost Inoculant · Soil Microbial Booster · Zero Synthetic Chemicals',
    desc: 'Centner bulk shipment of de-oiled seed cake. Replaces synthetic aluminum coagulants in farm dam treatment and provides intense slow-release nitrogen for regenerative farming.',
    img: 'https://images.unsplash.com/photo-1615486171448-4e43b1897c8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    title: 'Nutritional Feed-Grade Leaf Chaff (20kg Bag)',
    price: 450.00,
    cat: 'By-Products',
    stock: 'In Stock · 20kg Heavy Poly Bag',
    specs: 'Dry Matter: 91% · Crude Protein: 19.5% · Crude Fiber: 24%',
    desc: 'Fibrous, protein-rich residual chaff from mechanical leaf de-stemming. Ideal supplemental roughage for cattle, goats, sheep, and poultry rations to boost weight gain and milk lactation.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3-100',
    title: 'Nutritional Feed-Grade Leaf Chaff (100kg Commercial Bale)',
    price: 1950.00,
    cat: 'By-Products',
    stock: 'In Stock · Commercial Pallet Bale',
    specs: 'Compressed Bale · Highly Digestible Ruminant Ration · Moisture < 9.5%',
    desc: 'Bulk commercial compressed bale of leaf stem chaff. Laboratory tested for high microbial rumen fermentation and poultry feed mixing.',
    img: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=600&q=80'
  },

  // Commercial Bulk Buying (B2B): 100kg Orders & Bulk Oil Drums
  {
    id: 'b-seed-100',
    title: '100kg Bulk Moringa Seeds (Certified PKM-1 & PKM-2)',
    price: 22000.00,
    cat: 'Bulk',
    stock: 'B2B Wholesale · Palletized 100kg',
    specs: 'Commercial Outgrower Sack · 88%+ Germination · Dual Hub Dispatch (Accra / Barkly West)',
    desc: 'Wholesale seed procurement for commercial plantation expansion and regional outgrower programs across Africa. Direct freight dispatch from Barkly West (SA) and Accra (Ghana) with AfCFTA & phytosanitary clearance.',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-powder-100',
    title: '100kg Bulk Organic Leaf Powder (Superfine 80 Mesh)',
    price: 45000.00,
    cat: 'Bulk',
    stock: 'Commercial Export · 4 × 25kg Cartons',
    specs: 'Double poly-lined export cartons · Vacuum sealed · Sub-40°C dehydrated · Pan-African Stock',
    desc: 'Standard commercial pallet load for nutraceutical encapsulation, superfood blending facilities, and botanical export traders. Batch COA with microbiological testing, dispatched via Tema Port (Ghana) or Durban Port (SA).',
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-whole-100',
    title: '100kg Bulk Whole Dried Leaves (Shadow-Dehydrated)',
    price: 16000.00,
    cat: 'Bulk',
    stock: 'Commercial Export · 4 × 25kg Compressed Bales',
    specs: 'Shadow-dried intact leaves · Moisture < 7% · Vacuum barrier · AfCFTA Certified Origin',
    desc: 'Export-grade intact dehydrated moringa leaves for specialty herbal tea packaging, extraction tinctures, and premium botanical brewing across African and global corridors.',
    img: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-crushed-100',
    title: '100kg Bulk Crushed Leaves (Tea & Extraction Cut)',
    price: 14500.00,
    cat: 'Bulk',
    stock: 'Commercial Export · Sifted Flake Size',
    specs: '2-4mm coarse tea-bag cut · Dust-sifted · High polyphenol bio-activity',
    desc: 'Specifically coarse-crushed and dedusted moringa leaf flakes optimized for high-speed tea bagging machinery and commercial botanical percolation across continental beverage brands.',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    title: 'Cold-Pressed Virgin Oil (25L UN Commercial Drum)',
    price: 18500.00,
    cat: 'Bulk',
    stock: 'Commercial Freight · MOQ: 1 Drum (25L)',
    specs: 'UN-certified food-grade HDPE drum · Nitrogen purged seal · Dual Hub Stock (Ghana & SA)',
    desc: 'Commercial 25-liter drum for cosmetic formulators, pharmaceutical manufacturers, and wholesale exporters. Direct palletized freight dispatch from Barkly West and Accra Central Processing Center.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-oil-200',
    title: 'Cold-Pressed Virgin Oil (200L Industrial Drum)',
    price: 138000.00,
    cat: 'Bulk',
    stock: 'Heavy Industrial Freight · 200 Liters',
    specs: 'Internal epoxy-lined steel / heavy HDPE drum · Nitrogen topped · Full analytical assay',
    desc: 'Standard commercial barrel for large-scale soap, serum, and hair-care manufacturing lines. Significant volume cost advantage with dedicated transport across ECOWAS and SADC trade zones.',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-oil-1000',
    title: 'Cold-Pressed Virgin Oil (1,000L IBC Industrial Tote)',
    price: 650000.00,
    cat: 'Bulk',
    stock: 'Industrial Export · 1,000 Liters Container',
    specs: 'Food-grade Schutz IBC tote · UV-protected outer grid · Nitrogen sealed bottom valve',
    desc: 'Max-volume export tote for multinational cosmetic conglomerates and pharmaceutical producers. Direct road freight and maritime container forwarding via Tema Port (Ghana) and Durban Port (South Africa).',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },

  // Digital Products & Literature: Moringa City Publishing Books
  {
    id: 'mc-book-1',
    title: "The Moringa City Grower's Handbook",
    price: 350.00,
    cat: 'Digital',
    stock: 'Instant PDF Download + License',
    isDigital: true,
    downloadName: 'MoringaCity_Growers_Handbook_Complete.pdf',
    specs: '168-Page Official Publication · Moringa City Publishing · ISBN: 978-0-620-89124-1',
    desc: 'The definitive commercial agronomy textbook by Moringa City. Features PKM-1 vs PKM-2 selection criteria, soil microbiology, nursery prep, drip irrigation, high-density coppicing cycles, and organic pest bio-controls.',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mc-book-2',
    title: 'Moringa City Commercial Agro-Processing & Cold-Press Manual',
    price: 550.00,
    cat: 'Digital',
    stock: 'Instant PDF Download + License',
    isDigital: true,
    downloadName: 'MoringaCity_Commercial_ColdPress_Manual.pdf',
    specs: '210-Page Technical Blueprints · Moringa City Publishing · GMP & HACCP Blueprints',
    desc: 'Industrial processing authority from Moringa City Publishing. Detailed operational protocols for mechanical screw-press calibration (<40°C), micro-filtration, nitrogen drum sealing, batch QA checklists, and EU cosmetic compliance.',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mc-book-3',
    title: 'The Moringa City Superfood Recipe & Natural Health Compendium',
    price: 220.00,
    cat: 'Digital',
    stock: 'Instant PDF Download + License',
    isDigital: true,
    downloadName: 'MoringaCity_Superfood_Compendium.pdf',
    specs: '142-Page Botanical Compendium · Moringa City Publishing · 85+ Tested Recipes',
    desc: 'Published under the Moringa City brand. Blends indigenous African herbal knowledge with modern clinical nutrition: culinary formulations, bio-availability boosters, restorative broths, and skin rejuvenation salves.',
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mc-book-4',
    title: 'Moringa City Water Remediation & Natural Flocculation Field Guide',
    price: 280.00,
    cat: 'Digital',
    stock: 'Instant PDF Download + License',
    isDigital: true,
    downloadName: 'MoringaCity_Water_Clarification_Guide.pdf',
    specs: '96-Page Water Tech Manual · Moringa City Publishing · Field Testing Protocols',
    desc: 'Practical manual from Moringa City Publishing detailing how to utilize de-oiled seed press cake cationic proteins for community water purification, turbidity reduction, and heavy metal adsorption without synthetic aluminum salts.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
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
    id: 'i0',
    title: "The Sacred 'Nebedaye' (The Tree That Never Dies): West African Ethnobotany & Volta River Purification",
    date: '22 Sep 2026',
    author: 'Africa Moringa Hub West Africa Council (Accra, Ghana)',
    category: 'Pan-African Ethnobotany',
    excerpt: "Tracing the indigenous roots of Moringa across West Africa from the Wolof and Akan 'Nebedaye' to traditional water filtration along the Volta river basin.",
    content: `<h3>The West African 'Nebedaye' Heritage</h3>
<p>Across Ghana, Senegal, and the wider Sahel and West African savannah, Moringa oleifera has long been reverently called <em>'Nebedaye'</em>, derived from the English phrase 'never-die' because of its miraculous ability to flourish in parched, nutrient-deficient soils where other crops wither.</p>
<h4>Volta Basin Water Clarification</h4>
<p>Generations of rural families living along Ghana's Volta Lake and inland tributaries have utilized crushed moringa seeds wrapped in woven calico cloths to clarify turbid river water before boiling. The natural cationic proteins bind instantly to suspended clay colloids and microbial pathogens, precipitating impurities within 45 minutes and leaving clean, odorless, potable drinking water.</p>
<h4>Moringa in Ghanaian Daily Nutrition</h4>
<p>Traditional Akan and Ga herbal healers integrate freshly pound moringa leaf paste into palm nut soups, groundnut stews, and herbal broths to restore maternal vitality after childbirth, stimulate rich breastmilk lactation, and combat seasonal child malnutrition.</p>`,
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
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
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
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
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
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
    id: 'evt-0',
    title: 'Africa Moringa Wealth Summit 2026 (Accra & Johannesburg Hybrid)',
    price: 450,
    date: '2026-11-06',
    time: '09:00 GMT / 11:00 SAST',
    durationMinutes: 480,
    seats: 300,
    room: 'Pan-Africa-Main-Plenary',
    platform: 'Hybrid',
    category: 'Industry Summit',
    location: 'Accra International Conference Centre (Ghana) & Sandton Convention Centre (SA) + Global Stream',
    desc: 'The flagship annual gathering of the Africa Moringa Hub uniting delegates from 44 African nations. Featuring keynote panels on AfCFTA duty-free cross-border trade, B2B wholesale off-take contracts, clinical cosmetic formulations, and carbon credit monetization for smallholder outgrowers.',
    published: true,
    ticketTiers: [
      { name: 'Virtual Pan-African Delegate', price: 200, description: 'Live interactive video plenary stream, Q&A chat, digital summit handbook & AfCFTA trade report', availableSeats: 180 },
      { name: 'In-Person Delegate (Accra or JHB)', price: 650, description: 'Floor admission, 3-course networking luncheon, delegate welcome gift (100ml Cold-Pressed Oil + Seed Pack)', availableSeats: 90 },
      { name: 'VIP Executive Trade Pass', price: 1800, description: 'Front-row plenary seating, private B2B buyer matchmaking suite, and dedicated bilateral meetings with AMH leadership', availableSeats: 30 }
    ]
  },
  {
    id: 'evt-1',
    title: 'Live Commercial Cold-Pressing Calibration Masterclass',
    price: 0,
    date: '2026-09-28',
    time: '14:00 SAST / 12:00 GMT',
    durationMinutes: 90,
    seats: 50,
    room: 'AMH-ColdPress-Live-2026',
    platform: 'Jitsi',
    category: 'Live Training',
    location: 'Virtual Broadcast · Barkly West Agro-Processing Facility (SA) & Accra Processing Center (Ghana)',
    desc: 'Live streaming interactive engineering session co-hosted from South Africa and Ghana. Watch real-time hydraulic and screw-press calibration, temperature telemetry monitoring (<40°C), micro-filtration, and Q&A with lead plant engineers.',
    published: true,
    ticketTiers: [
      { name: 'Virtual Pass', price: 0, description: 'Live interactive video stream + QA access across Africa', availableSeats: 35 },
      { name: 'Professional CPD Certificate', price: 250, description: 'Stream access + accredited verifiable CPD certificate & SOP technical pack', availableSeats: 15 }
    ]
  },
  {
    id: 'evt-2',
    title: '3-Day Commercial Moringa Outgrower Practical Bootcamp',
    price: 850,
    date: '2026-10-14',
    time: '08:30 SAST',
    durationMinutes: 4320, // 3 days
    seats: 30,
    room: 'Barkly-West-Camp',
    platform: 'In-person',
    category: 'Bootcamp',
    location: 'AMH Agro-Processing Hub, Barkly West, Northern Cape',
    desc: 'Hands-on practical intensive: field site layout, PKM-1 vs PKM-2 transplanting geometry, automated drip fertigation, high-density coppicing techniques, solar shadow dehydration tunnel construction, and guaranteed off-take contracting.',
    published: true,
    ticketTiers: [
      { name: 'Standard Grower Ticket', price: 850, description: 'Full 3-day field tuition, workbook, nursery seed starter pack (PKM-1 & PKM-2)', availableSeats: 20 },
      { name: 'VIP Outgrower Fast-Track', price: 1850, description: 'Tuition, accommodation assistance, 10kg seed voucher & guaranteed off-take contract review', availableSeats: 10 }
    ]
  },
  {
    id: 'evt-ghana',
    title: 'West Africa Agro-Processing & Dew-Point Field Day',
    price: 350,
    date: '2026-10-26',
    time: '09:00 GMT',
    durationMinutes: 360,
    seats: 60,
    room: 'Moringa-City-Accra',
    platform: 'In-person',
    category: 'Live Training',
    location: 'AMH Central Processing Center & Moringa City, Greater Accra, Ghana',
    desc: 'Specialized West African regional training on high-humidity dawn harvest techniques, shade-tunnel dehydration, screw-press maintenance, and preparing export shipments under ECOWAS and AfCFTA standards.',
    published: true,
    ticketTiers: [
      { name: 'West Africa Farmer Pass', price: 350, description: 'Full day practical field session, nursery seedlings, lunch, and outgrower membership application review', availableSeats: 45 },
      { name: 'Agro-Processor VIP', price: 950, description: 'Field session + private processing line inspection and seed oil wholesale purchasing privileges', availableSeats: 15 }
    ]
  }
];

export const SEED_AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'aff-gh-01',
    name: 'Kofi Mensah',
    email: 'kofi@moringacitygh.com',
    entityName: 'Moringa City Distribution Hub (Accra, Ghana)',
    partnerName: 'Moringa City Distribution Hub',
    contactPerson: 'Kofi Mensah',
    region: 'Accra & Greater West Africa, Ghana',
    referralCode: 'MORINGACITY-GH',
    tier: 'Tier 3: Gold Distributor',
    commissionRatePct: 22,
    commissionRate: 22,
    totalClicks: 1280,
    conversions: 84,
    totalSalesValueR: 198000,
    totalSalesZar: 198000,
    earnedCommissionR: 43560,
    commissionEarnedZar: 43560,
    tier2OverrideCommissionR: 7400,
    activeSubAffiliates: 6,
    availableBalanceR: 50960,
    payoutMethod: 'MTN Mobile Money / Direct Bank',
    bankDetails: 'GCB Bank Accra · Acc: 1041129384729 · SWIFT: GCBGGHAC',
    status: 'Active'
  },
  {
    id: 'aff-01',
    name: 'Francois Joubert',
    email: 'francois@agritechnc.co.za',
    entityName: 'AgriTech Solutions Northern Cape',
    partnerName: 'AgriTech Solutions Northern Cape',
    contactPerson: 'Francois Joubert',
    region: 'Northern Cape & Free State, SA',
    referralCode: 'AGRITECH-NC',
    tier: 'Tier 2: Silver Reseller',
    commissionRatePct: 15,
    commissionRate: 15,
    totalClicks: 642,
    conversions: 38,
    totalSalesValueR: 94500,
    totalSalesZar: 94500,
    earnedCommissionR: 14175,
    commissionEarnedZar: 14175,
    tier2OverrideCommissionR: 1680,
    activeSubAffiliates: 2,
    availableBalanceR: 15855,
    payoutMethod: 'EFT Transfer',
    bankDetails: 'First National Bank · Acc: 62819401928 · Branch: 250655',
    status: 'Active'
  },
  {
    id: 'aff-02',
    name: 'Helena Van Der Merwe',
    email: 'helena@ecofarmscape.co.za',
    entityName: 'EcoFarms Cape Distribution',
    partnerName: 'EcoFarms Cape Distribution',
    contactPerson: 'Helena Van Der Merwe',
    region: 'Western Cape, SA',
    referralCode: 'ECOFARMS-CPT',
    tier: 'Tier 1: Promoter',
    commissionRatePct: 10,
    commissionRate: 10,
    parentAffiliateId: 'aff-01',
    totalClicks: 418,
    conversions: 24,
    totalSalesValueR: 56000,
    totalSalesZar: 56000,
    earnedCommissionR: 5600,
    commissionEarnedZar: 5600,
    tier2OverrideCommissionR: 0,
    activeSubAffiliates: 0,
    availableBalanceR: 5600,
    payoutMethod: 'EFT Transfer',
    bankDetails: 'Standard Bank · Acc: 1019283746 · Branch: 051001',
    status: 'Active'
  },
  {
    id: 'aff-ng-01',
    name: 'Amina Babatunde',
    email: 'amina@lagosbotanicals.ng',
    entityName: 'Lagos Botanical Formulations (Nigeria)',
    partnerName: 'Lagos Botanical Formulations',
    contactPerson: 'Amina Babatunde',
    region: 'Lagos & Abuja, Nigeria',
    referralCode: 'LAGOS-AGRO',
    tier: 'Tier 2: Silver Reseller',
    commissionRatePct: 15,
    commissionRate: 15,
    totalClicks: 520,
    conversions: 31,
    totalSalesValueR: 78500,
    totalSalesZar: 78500,
    earnedCommissionR: 11775,
    commissionEarnedZar: 11775,
    tier2OverrideCommissionR: 950,
    activeSubAffiliates: 1,
    availableBalanceR: 12725,
    payoutMethod: 'Direct Wire / PayFast',
    bankDetails: 'Zenith Bank Nigeria · Acc: 2081928371',
    status: 'Active'
  }
];

export const SEED_AFFILIATES = [
  { name: 'Moringa City Distribution Hub (Accra)', region: 'Greater Accra & Volta Basin, Ghana', type: 'West Africa Central Outgrower Hub' },
  { name: 'AgriTech Solutions Northern Cape', region: 'Kimberley & Barkly West, SA', type: 'Certified Agro-Hub & Nursery' },
  { name: 'EcoFarms Cape Distribution', region: 'Western Cape (Paarl & Stellenbosch)', type: 'Bulk Cold-Press Oil Buyer' },
  { name: 'Lagos Botanical Formulations', region: 'Lagos & Abuja, Nigeria', type: 'Nutraceutical Formulations Partner' },
  { name: 'Nairobi Herbal Supply', region: 'Nairobi & Rift Valley, Kenya', type: 'East Africa Distribution Node' },
  { name: 'Green Leaf Organics Gauteng', region: 'Johannesburg & Pretoria, SA', type: 'Nutraceutical Formulations Partner' }
];

export const SEED_SUPPLIERS = [
  {
    id: 's-gh-1',
    date: '2026-09-21',
    farmName: 'Volta Basin Moringa Cooperative',
    representative: 'Emmanuel Darko',
    email: 'edarko@voltamoringa.org',
    phone: '+233 24 456 7890',
    province: 'Volta Region, Ghana',
    hectares: 25,
    crop: 'PKM-1 Certified Seed & Shade-Dried Leaf Flakes',
    capacityNotes: '50 smallholder farm families aggregated. Organic certified shadow-drying sheds. Direct off-take connection with Accra Processing Center.',
    status: 'Approved' as const
  },
  {
    id: 's1',
    date: '2026-09-18',
    farmName: 'Vaal River Agro Estates',
    representative: 'David Van Zyl',
    email: 'grower@vaalriver.co.za',
    phone: '+27 83 234 5678',
    province: 'Northern Cape, South Africa',
    hectares: 12,
    crop: 'PKM-1 Certified Seed & Leaf Biomass',
    capacityNotes: 'Center pivot & drip irrigation from Vaal River. Organic transition in progress.',
    status: 'Approved' as const
  },
  {
    id: 's2',
    date: '2026-09-10',
    farmName: 'Kalahari Green Canopy',
    representative: 'Anna Venter',
    email: 'anna@kalaharicanopy.co.za',
    phone: '+27 82 998 1234',
    province: 'Free State, South Africa',
    hectares: 5,
    crop: 'Whole Shadow-Dried Leaf Flakes',
    capacityNotes: 'Sub-40°C solar tunnel dryers installed with solar borehole irrigation.',
    status: 'Approved' as const
  },
  {
    id: 's-gh-2',
    date: '2026-09-02',
    farmName: 'Moringa City Outgrowers Network',
    representative: 'Akosua Adom',
    email: 'outgrowers@moringacitygh.com',
    phone: '+233 20 123 4567',
    province: 'Greater Accra, Ghana',
    hectares: 40,
    crop: 'Cold-Press Grade Moringa Seeds (PKM-1 & PKM-2)',
    capacityNotes: 'Supplying centralized screw-press processing in Accra. Over 150 community growers.',
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
