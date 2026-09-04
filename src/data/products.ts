export interface Product {
  id: string;
  name: string;
  category: 'Agro-Commodities' | 'Timber' | 'Imports';
  tagline: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  specs: {
    label: string;
    value: string;
  }[];
  origins?: string[];
  grades?: string[];
  packaging?: string[];
  containerLoading?: string[];
  season?: string;
  moq?: string;
  seoTags: string[];
  highlights: string[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'rcn',
    name: 'RAW CASHEW NUTS (RCN)',
    category: 'Agro-Commodities',
    tagline: 'Superior Nut Count & High Kernel Recovery',
    image: '/images/raw_cashews.jpg',
    shortDesc: 'Known for superior nut count, high kernel recovery, and consistent moisture levels — preferred by global processors in India and Vietnam.',
    fullDesc: 'We source the finest Tanzanian Raw Cashew Nuts (RCN) known for their superior nut count, high kernel recovery, and consistent moisture levels — preferred by global processors in India and Vietnam. Lush Trade Corp Tanzania Limited is the best raw cashew nuts (RCN) exporter, producer and supplier in Tanzania operating from the roots to the end processors on a long-term basis.',
    specs: [
      { label: 'Outturn', value: '50–55 LBS+' },
      { label: 'Nut Count', value: '160–180 (+/-10) per KG' },
      { label: 'Moisture Level', value: 'Approx. 10%' },
      { label: 'Packaging', value: '80 kg Jute Bags' },
      { label: '40ft HC Container Loading', value: '27–28 MT' },
      { label: 'MOQ (Minimum Order Qty)', value: '2 × 40ft FCL' },
    ],
    origins: ['Masasi', 'Newala', 'Mtwara', 'Tandahimba'],
    containerLoading: ['40ft HC Container: 27–28 MT'],
    moq: '2 × 40ft FCL',
    seoTags: ['Tanzania RCN export', 'Raw Cashew Nuts Tanzania', 'RCN supplier Africa'],
    highlights: [
      'Direct farm-gate sourcing from Masasi, Newala, Mtwara, and Tandahimba',
      'Tested for high outturn (50-55 LBS+) and low defect rates',
      'Export ready in heavy-duty 80 kg jute bags',
    ],
  },
  {
    id: 'cashew-kernels',
    name: 'CASHEW NUT KERNELS',
    category: 'Agro-Commodities',
    tagline: 'Vacuum-Packed Whole & Broken Kernels for Retail & Industrial Use',
    image: '/images/cashew_kernels.jpg',
    shortDesc: 'Processed and vacuum-packed to retain natural flavor, color, and crunch — ready for retail or industrial use worldwide.',
    fullDesc: 'Our kernels are carefully processed and vacuum-packed to retain natural flavor, color, and crunch — ready for retail or industrial use worldwide. Lush Trade Corp Tanzania Limited is the best cashew nut exporter, producer and supplier in Tanzania operating from the roots to the end processors on a long-term basis.',
    specs: [
      { label: 'Export Grades', value: 'W180, W240, W320, W450, SW, LWP' },
      { label: 'Moisture Level', value: 'Max 7%' },
      { label: 'Crop Season', value: 'Oct – April' },
      { label: 'Packaging Options', value: '22.68 kg (50 lbs) vacuum cartons, or 2 × 10 kg vacuum packs/carton' },
      { label: '20ft Container Loading', value: '~660 boxes (~15 MT)' },
      { label: '40ft Container Loading', value: '~1100 boxes (~25 MT)' },
    ],
    grades: ['W180', 'W240', 'W320', 'W450', 'SW', 'LWP'],
    season: 'Oct – April',
    packaging: [
      '22.68 kg (50 lbs) vacuum-sealed cartons',
      '2 × 10 kg vacuum packs per carton',
    ],
    containerLoading: [
      '20ft Container Loading: ~660 boxes (~15 MT)',
      '40ft Container Loading: ~1100 boxes (~25 MT)',
    ],
    seoTags: ['Cashew kernel Tanzania', 'W320 supplier', 'African cashew exporter', 'premium cashew nuts'],
    highlights: [
      'Harvest & Processing Season: October to April',
      'Vacuum-sealed with inert nitrogen flush to ensure zero oxidation',
      'Compliant with international food safety and kernel classification standards',
    ],
  },
  {
    id: 'pulses',
    name: 'PULSES (Chickpeas, Pigeon Peas, Kidney Beans, Green Mung Beans)',
    category: 'Agro-Commodities',
    tagline: '98%+ Purity Cleaned & Graded Tanzanian Legumes',
    image: '/images/pulses.jpg',
    shortDesc: 'Cleaned and graded pulses rich in protein and taste, ideal for food industries and bulk buyers globally.',
    fullDesc: 'Tanzania\'s fertile soil produces export-quality pulses rich in protein and taste. We supply cleaned and graded pulses ideal for food industries and bulk buyers globally. Lush Trade Corp Tanzania Limited is the best pulses exporter, producer and supplier in Tanzania operating from the roots to the end processors on a long-term basis.',
    specs: [
      { label: 'Purity Level', value: '98%+' },
      { label: 'Moisture Level', value: '10–14%' },
      { label: 'Packaging', value: '50 kg PP Bags' },
      { label: '20ft Container Loading', value: '24 MT in 20ft Container' },
      { label: 'Crop Season', value: 'May – Dec' },
      { label: 'Crop Origins', value: 'Arusha / Mtwara / Dodoma' },
    ],
    origins: ['Arusha', 'Mtwara', 'Dodoma'],
    season: 'May – Dec',
    grades: ['Chickpeas', 'Pigeon Peas (Red/Toor)', 'Kidney Beans', 'Green Mung Beans'],
    packaging: ['50 kg PP Bags'],
    containerLoading: ['20ft Container Loading: 24 MT'],
    seoTags: ['Tanzania pulses export', 'chickpeas exporter', 'pigeon peas supplier Africa', 'mung beans Tanzania'],
    highlights: [
      'Crop Origins: Arusha, Mtwara, and Dodoma fertile belts',
      'Harvest Season: May to December',
      'Machine cleaned and gravity separated for 98%+ purity',
    ],
  },
  {
    id: 'coffee',
    name: 'COFFEE (Arabica & Robusta)',
    category: 'Agro-Commodities',
    tagline: 'High-Altitude Tanzanian Arabica & Robusta Green Beans',
    image: '/images/coffee.jpg',
    shortDesc: 'Arabica and Robusta coffee with rich aroma, uniform beans, and international certifications for global roasters.',
    fullDesc: 'We export Tanzanian Arabica and Robusta coffee with rich aroma, uniform beans, and international certifications. Ideal for roasters and distributors looking for consistent flavor profiles. Lush Trade Corp Tanzania Limited is the best coffee exporter, producer and supplier in Tanzania operating from the roots to the end processors on a long-term basis.',
    specs: [
      { label: 'Arabica Grades', value: 'AAA, AA, A Grades' },
      { label: 'Robusta Grades', value: 'FAQ 12, FAQ 14, FAQ 16, FAQ 18' },
      { label: 'Origins', value: 'Kilimanjaro, Mbeya, and Bukoba Regions' },
      { label: 'Crop Season', value: 'May – Oct' },
      { label: 'Packaging', value: '60 kg Jute Bags with PE liner' },
      { label: '20ft Container Loading', value: '9.8 MT (164 Bags)' },
      { label: '40ft Container Loading', value: '19.2 MT (320 Bags)' },
    ],
    origins: ['Kilimanjaro Region', 'Mbeya Region', 'Bukoba Region'],
    season: 'May – Oct',
    grades: ['Arabica AAA', 'Arabica AA', 'Arabica A', 'Robusta FAQ 12', 'Robusta FAQ 14', 'Robusta FAQ 16', 'Robusta FAQ 18'],
    packaging: ['60 kg Jute Bags with PE liner'],
    containerLoading: [
      '20ft Container Loading: 9.8 MT (164 Bags)',
      '40ft Container Loading: 19.2 MT (320 Bags)',
    ],
    seoTags: ['Tanzania coffee beans export', 'Arabica Robusta supplier', 'green coffee Tanzania', 'Africa coffee exporter'],
    highlights: [
      'High altitude volcanic soil cultivation in Kilimanjaro, Mbeya & Bukoba',
      'PE lined 60kg jute bags to retain moisture stability during sea freight',
      'Certified flavor profile with uniform bean grading',
    ],
  },
  {
    id: 'timber',
    name: 'TIMBER (Teak Wood & Pine Wood)',
    category: 'Timber',
    tagline: 'Kiln-Dried Hardwood & Softwood Export-Ready Timber',
    image: '/images/timber.jpg',
    shortDesc: 'Premium Tanzanian hardwood and softwood timber, kiln-dried and export-ready for furniture and construction.',
    fullDesc: 'We supply premium Tanzanian hardwood and softwood timber, kiln-dried and export-ready for furniture, construction, and industrial applications. Lush Trade Corp Tanzania Limited is the best timber exporter, producer and supplier in Tanzania operating from the roots to the end processors on a long-term basis.',
    specs: [
      { label: 'Wood Types', value: 'Teak Wood, Pine Wood' },
      { label: 'Origins', value: 'Mafinga, Iringa, Morogoro' },
      { label: '20ft Container Loading', value: '23 MT / 25 CBM' },
      { label: '40ft Container Loading', value: '27 MT / 27 CBM' },
      { label: 'MOQ (Minimum Order Qty)', value: '5 × 40ft FCL' },
      { label: 'Condition', value: 'Kiln-Dried & Export Ready' },
    ],
    origins: ['Mafinga', 'Iringa', 'Morogoro'],
    moq: '5 × 40ft FCL',
    containerLoading: [
      '20ft Container Loading: 23 MT / 25 CBM',
      '40ft Container Loading: 27 MT / 27 CBM',
    ],
    seoTags: ['Tanzania timber export', 'teak wood Africa', 'pine wood Tanzania', 'African timber supplier'],
    highlights: [
      'Harvest Origins: Mafinga, Iringa, and Morogoro forestry concessions',
      'Kiln-dried to international construction and joinery moisture standards',
      'Containerized stuffed shipments with full phytosanitary clearance',
    ],
  },
  {
    id: 'liquor-ethanol',
    name: 'LIQUOR & ETHANOL IMPORTS',
    category: 'Imports',
    tagline: 'High-Grade Industrial Ethanol & Premium Imported Liquor',
    image: '/images/hero.jpg',
    shortDesc: 'Specializing in importing high-grade and premium liquor from India and Mauritius for East Africa.',
    fullDesc: 'Lush Trade Corp also specializes in importing high-grade and premium liquor from India and Mauritius, catering to bulk, wholesale and retail demands across East Africa.',
    specs: [
      { label: 'Specialization', value: 'Importing High-Grade Ethanol & Premium Liquor' },
      { label: 'Source Countries', value: 'India and Mauritius' },
      { label: 'Target Demand', value: 'Bulk, Wholesale & Retail across East Africa' },
      { label: 'Quality Standard', value: 'Certified High-Grade Ethyl Alcohol & Spirits' },
    ],
    origins: ['India', 'Mauritius'],
    seoTags: ['Ethanol import Tanzania', 'liquor supplier East Africa', 'industrial ethanol'],
    highlights: [
      'Established trade bridges with leading distilleries in India & Mauritius',
      'Catering to commercial, industrial, and beverage distributors in East Africa',
      'Streamlined customs clearance and tax compliance in Dar es Salaam',
    ],
  },
];

export const ENTERPRISE_INFO = {
  name: 'Lush Trade Corp Tanzania Limited',
  website: 'www.lushtradecorptz.com',
  tagline: 'Africa’s Most Trusted Sourcing and Export Partner',
  headOffice: {
    address: 'Plot No. 658, near Nangwanda Stadium',
    poBox: 'P.O. Box 444',
    city: 'Mtwara',
    country: 'Tanzania',
  },
  commercialPresence: ['Dar es Salaam', 'Mtwara'],
  partnerships: ['Masasi', 'Mtwara', 'Newala', 'Dodoma', 'Iringa', 'Arusha'],
  email: 'lushtradecorp@gmail.com',
  phone: '+255 639 354 286',
  vision: 'To become Africa\'s most trusted sourcing and export partner for agro and natural products.',
  mission: 'To connect Africa\'s agricultural strength to the world through integrity, innovation, and impactful partnerships.',
  keywords: [
    'Tanzania exports',
    'agro commodities',
    'African sourcing',
    'export company Dar es Salaam',
    'Tanzania cashew exporter',
    'Lush Trade Corp',
  ],
};

export const BLOG_POSTS = [
  {
    id: 'cashew-season-2025',
    title: 'Tanzania\'s Cashew Season 2025 – What Buyers Should Know',
    category: 'Market Insights',
    date: 'August 2025',
    readTime: '4 min read',
    summary: 'Key outturn forecasts, moisture benchmarks (50–55 LBS+), and harvesting updates from southern Tanzania cashew belts.',
    hashtags: ['#CashewExports', '#TanzaniaExports', '#LushTradeCorp'],
    content: 'As the 2025 cashew harvesting season kicks off across Mtwara, Masasi, Newala, and Tandahimba, international buyers in India and Vietnam are closely watching nut counts and kernel recovery rates. Lush Trade Corp Tanzania Limited maintains on-ground inspection teams at primary aggregation centers to guarantee 50–55 LBS+ outturn and 160–180 nut count per KG.',
  },
  {
    id: 'tanzanian-coffee-global',
    title: 'Why Tanzanian Coffee is Winning Global Hearts',
    category: 'Commodity Focus',
    date: 'July 2025',
    readTime: '5 min read',
    summary: 'Exploring the volcanic altitude profile of Kilimanjaro Arabica AAA and Bukoba Robusta FAQ grades.',
    hashtags: ['#AfricanTrade', '#AgroExports', '#TanzaniaExports'],
    content: 'Grown on the rich volcanic slopes of Mount Kilimanjaro, Mbeya high plateaus, and Bukoba shores, Tanzanian coffee delivers distinct bright acidity and rich aroma. Lush Trade Corp exports 60 kg PE-lined jute bags ensuring maximum flavor preservation during transit to European and Asian specialty roasters.',
  },
  {
    id: 'reasons-source-africa',
    title: '5 Reasons to Source Agro Commodities from Africa',
    category: 'Trade Strategy',
    date: 'June 2025',
    readTime: '6 min read',
    summary: 'From organic soil fertility to strategic port access at Mtwara and Dar es Salaam, learn why African sourcing is accelerating.',
    hashtags: ['#SourcingFromAfrica', '#AfricanTrade', '#AgroExports'],
    content: '1. Organic Soil Richness: High natural yield without heavy chemical intervention.\n2. Competitive Pricing: Direct farm-gate procurement.\n3. Strategic Maritime Ports: Fast vessel turnaround from Mtwara Port to Asian and European destinations.\n4. Verified Quality Standards: 98%+ purity in pulses and strict RCN outturn controls.\n5. Ethical Partnerships: Empowering smallholder agricultural communities.',
  },
  {
    id: 'sustainable-trade-networks',
    title: 'How Lush Trade Corp Builds Sustainable Trade Networks',
    category: 'Enterprise News',
    date: 'May 2025',
    readTime: '5 min read',
    summary: 'Bridging African farming producers with global buyers through integrity, innovation, and impactful partnerships.',
    hashtags: ['#LushTradeCorp', '#AfricanSourcing', '#ExportCompanyTanzania'],
    content: 'Lush Trade Corp Tanzania Limited bridges local Tanzanian farming cooperatives in Masasi, Dodoma, Arusha, and Iringa with international commodity traders. By managing 360° logistics, quality control, and phytosanitary documentation, we deliver unmatched trade security.',
  },
];
