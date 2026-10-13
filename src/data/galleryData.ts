export interface GalleryItem {
  id: number;
  image: string;
  eventName: string;
  location: string;
  description: string;
  attendees: string;
  orientation: "landscape" | "portrait";
  category?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
}

const BASE_REMOTE_URL = "/Gallery";

// US / International gallery items (preserved for reference & venushiring.com)
export const US_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 5,
    image: `${BASE_REMOTE_URL}/With%20Consulate%20General%20of%20US.jpg`,
    eventName: "With Consulate General of the U.S.",
    location: "United States",
    description:
      "Important diplomatic meeting with the U.S. Consulate General to discuss talent mobility and business relations.",
    attendees: "Venus Consultancy team met with the Consulate General of the U.S.",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-top",
  },
  {
    id: 6,
    image: `${BASE_REMOTE_URL}/With%20The%20U.S%20Ambassador%20David%20Cohen.jpg`,
    eventName: "With David Cohen - U.S. Ambassador",
    location: "United States",
    description:
      "Prestigious meeting with U.S. Ambassador David Cohen to discuss international talent solutions and diplomatic partnerships.",
    attendees: "Venus Consultancy team met with David Cohen, U.S. Ambassador",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 9,
    image: `${BASE_REMOTE_URL}/Meeting%20with%20Governor%20of%20Michigan%20Gretchen%20Whitmer.jpg`,
    eventName: "With Gretchen Whitmer - Governor of Michigan",
    location: "Michigan, USA",
    description:
      "Important meeting with Governor Gretchen Whitmer to discuss talent solutions for Michigan's growing economy and business development initiatives.",
    attendees: "Venus Consultancy team met with Gretchen Whitmer, Governor of Michigan",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-top",
  },
  {
    id: 10,
    image: `${BASE_REMOTE_URL}/Great%20meeting%20with%20Governor%20of%20Arizona,%20Katie%20Hobbs.jpg`,
    eventName: "With Katie Hobbs - Governor of Arizona",
    location: "Arizona, USA",
    description:
      "Productive meeting with Governor Katie Hobbs to explore talent acquisition strategies for Arizona's expanding business landscape.",
    attendees: "Venus Consultancy team met with Katie Hobbs, Governor of Arizona",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 11,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20Governor%20of%20Indiana,%20Eric%20Holcomb.jpg`,
    eventName: "With Eric Holcomb - Governor of Indiana",
    location: "Indiana, USA",
    description:
      "Strategic discussion with Governor Eric Holcomb about supporting Indiana's workforce development and talent recruitment initiatives.",
    attendees: "Venus Consultancy team met with Eric Holcomb, Governor of Indiana",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_8%]",
  },
  {
    id: 12,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20Governor%20of%20Maryland%20Wes%20Moore.jpg`,
    eventName: "With Wes Moore - Governor of Maryland",
    location: "Maryland, USA",
    description:
      "Engaging meeting with Governor Wes Moore to discuss innovative talent solutions for Maryland's diverse business ecosystem.",
    attendees: "Venus Consultancy team met with Wes Moore, Governor of Maryland",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_10%]",
  },
  {
    id: 13,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20Governor%20of%20Nevada%20Lombardo.jpg`,
    eventName: "With Joe Lombardo - Governor of Nevada",
    location: "Nevada, USA",
    description:
      "Strategic meeting with Governor Joe Lombardo to explore talent acquisition opportunities in Nevada's dynamic economy.",
    attendees: "Venus Consultancy team met with Joe Lombardo, Governor of Nevada",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-top",
  },
  {
    id: 14,
    image: `${BASE_REMOTE_URL}/Great%20meeting%20with%20President%20Ying%20McGuire%20of%20NMSDC%20at%20Baltimore.jpg`,
    eventName: "With Ying McGuire - President of NMSDC",
    location: "Baltimore, Maryland, USA",
    description:
      "Significant meeting with President Ying McGuire of the National Minority Supplier Development Council to discuss supplier diversity and talent inclusion initiatives.",
    attendees: "Venus Consultancy team met with Ying McGuire, President of NMSDC",
    orientation: "landscape",
    category: "Executive Leadership",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 15,
    image: `${BASE_REMOTE_URL}/Conference%20at%20Harvard%20Business%20School.jpg`,
    eventName: "Conference at Harvard Business School",
    location: "Cambridge, Massachusetts, USA",
    description:
      "Participating in a prestigious conference at Harvard Business School, engaging with thought leaders and industry experts on talent management strategies.",
    attendees: "Venus Consultancy team at Harvard Business School Conference",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 16,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20the%20entrepreneaurs%20at%20Harvard%20Business%20School.jpg`,
    eventName: "With Entrepreneurs at Harvard Business School",
    location: "Cambridge, Massachusetts, USA",
    description:
      "Networking and collaboration with innovative entrepreneurs at Harvard Business School, exploring talent solutions for startups and growing businesses.",
    attendees: "Venus Consultancy team met with entrepreneurs at Harvard Business School",
    orientation: "landscape",
    category: "Executive Leadership",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 17,
    image: `${BASE_REMOTE_URL}/Venus%20consultancy%20at%20CES%20Las%20Vegas%20Nevada.jpg`,
    eventName: "Venus Consultancy at CES Las Vegas",
    location: "Las Vegas, Nevada, USA",
    description:
      "Active participation at CES Las Vegas, engaging with technology leaders and exploring talent needs in the consumer electronics industry.",
    attendees: "Venus Consultancy team at CES Las Vegas",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 19,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20Baltimore%20US%20for%20NMSDC%20Conference.jpg`,
    eventName: "Venus Consultancy at NMSDC Conference in Baltimore",
    location: "Baltimore, Maryland, USA",
    description:
      "Participating in the National Minority Supplier Development Council Conference, promoting diversity and inclusion in talent acquisition.",
    attendees: "Venus Consultancy team at NMSDC Conference in Baltimore",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-center",
  },
  {
    id: 20,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20Sponsor%20at%20SELECT%20USA.jpg`,
    eventName: "Venus Consultancy Sponsor at SelectUSA",
    location: "United States",
    description:
      "Proud sponsorship of SelectUSA, supporting international business investment and connecting global talent with U.S. opportunities.",
    attendees: "Venus Consultancy as sponsor at SelectUSA event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 22,
    image: `${BASE_REMOTE_URL}/Supplier%20Diversity%20event%20at%20Stellantis.jpg`,
    eventName: "Supplier Diversity Event at Stellantis",
    location: "United States",
    description:
      "Participating in Stellantis' Supplier Diversity event, promoting inclusive talent solutions and supporting diverse supplier networks.",
    attendees: "Venus Consultancy team at Stellantis Supplier Diversity event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-top",
  },
  {
    id: 23,
    image: `${BASE_REMOTE_URL}/Supplier%20Diversity%20event%20at%20Stellantis'%20headquarters%20in%20Auburn%20Hills,%20Michigan.jpg`,
    eventName: "Supplier Diversity Event at Stellantis Headquarters",
    location: "Auburn Hills, Michigan, USA",
    description:
      "Engaging with Stellantis at their headquarters in Auburn Hills, discussing supplier diversity initiatives and talent acquisition partnerships.",
    attendees: "Venus Consultancy team at Stellantis headquarters in Auburn Hills, Michigan",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 24,
    image: `${BASE_REMOTE_URL}/Hero%20of%20the%20Day%20-%20Venus%20Consultancy%20at%20Supplier%20Diversity%20event%20of%20Toyota.jpg`,
    eventName: "Venus Consultancy at Toyota Supplier Diversity Event",
    location: "United States",
    description:
      "Recognized as Hero of the Day at Toyota's Supplier Diversity event, celebrating excellence in diverse talent solutions and supplier partnerships.",
    attendees: "Venus Consultancy team honored at Toyota Supplier Diversity event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-top",
  },
  {
    id: 25,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20MMSDC%20Michigan.jpg`,
    eventName: "Venus Consultancy at MMSDC Michigan",
    location: "Michigan, USA",
    description:
      "Active participation in the Michigan Minority Supplier Development Council event, promoting diversity and inclusion in talent acquisition.",
    attendees: "Venus Consultancy team at MMSDC Michigan event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 26,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20Job-fair%20event.jpg`,
    eventName: "Venus Consultancy at Job Fair Event",
    location: "United States",
    description:
      "Connecting job seekers with opportunities at a community job fair, showcasing our commitment to talent placement and career development.",
    attendees: "Venus Consultancy team at job fair event",
    orientation: "landscape",
    category: "Community & Recruitment",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 27,
    image: `${BASE_REMOTE_URL}/Team%20Venus%20helping%20at%20Community%20Job%20fair.jpg`,
    eventName: "Team Venus at Community Job Fair",
    location: "United States",
    description:
      "Team Venus actively supporting the community job fair, helping connect talented individuals with career opportunities and providing recruitment guidance.",
    attendees: "Team Venus Consultancy at community job fair",
    orientation: "landscape",
    category: "Community & Recruitment",
    objectPosition: "object-top",
  },
  {
    id: 28,
    image: `${BASE_REMOTE_URL}/Team%20Venus%20at%20US%20thanks%20giving%20dinner%20at%20AMCHAM%20Gala%20Event.jpg`,
    eventName: "Team Venus at AMCHAM Gala Event",
    location: "United States",
    description:
      "Celebrating at the American Chamber of Commerce Gala Event, networking with business leaders and strengthening international business relationships.",
    attendees: "Team Venus Consultancy at AMCHAM Thanksgiving Gala",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_10%]",
  },
];

const CANADA_BASE_URL = "/Gallery/Canada";

// Canadian Gallery Items: Restored from verified source operational photographs
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 101,
    image: `${CANADA_BASE_URL}/Great%20Meeting%20with%20the%20President%20and%20CEO%20of%20BDC%20bank,%20Isabelle%20Hudon.jpg`,
    eventName: "With Isabelle Hudon - President & CEO of BDC Bank",
    location: "Montreal, Quebec, Canada",
    description:
      "Strategic discussion with Isabelle Hudon, President and CEO of BDC Bank, on expanding Canadian business financing, diversity initiatives, and talent solutions.",
    attendees: "Venus Consultancy team met with Isabelle Hudon, President & CEO of BDC Bank",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 102,
    image: `${CANADA_BASE_URL}/Ontario%20Network%20Event%20with%20Venus%20Consultancy%20and%20Venus%20Global%20tech.jpg`,
    eventName: "Ontario Network Event",
    location: "Ontario, Canada",
    description:
      "Engaging with Ontario business leaders, entrepreneurs, and industry partners to discuss technological advancement and executive talent acquisition.",
    attendees: "Venus Consultancy and Venus Global Technology teams at Ontario Network Event",
    orientation: "landscape",
    category: "Networking & Community",
    objectPosition: "object-center",
  },
  {
    id: 103,
    image: `${CANADA_BASE_URL}/Panel%20Discussion%20with%20teh%20TD%20Bank,%20Scotia%20Bank.jpg`,
    eventName: "Panel Discussion with TD Bank and Scotiabank",
    location: "Toronto, Ontario, Canada",
    description:
      "Participating in an executive panel discussion with representatives from TD Bank and Scotiabank, focusing on financial sector innovation and workforce mobility.",
    attendees: "Venus Consultancy participating in panel discussion with TD Bank and Scotiabank representatives",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-center",
  },
  {
    id: 104,
    image: `${CANADA_BASE_URL}/Sharing%20the%20Pizza%20with%20Team.jpg`,
    eventName: "Team Building Event",
    location: "Ontario, Canada",
    description:
      "Fostering teamwork, camaraderie, and company culture during a team building gathering.",
    attendees: "Venus Consultancy core recruitment and operations team",
    orientation: "landscape",
    category: "Team & Culture",
    objectPosition: "object-center",
  },
  {
    id: 105,
    image: `${CANADA_BASE_URL}/Team%20venus%20at%20Stellantis%20Headquarter%20Michigan.jpg`,
    eventName: "Team Venus at Stellantis Headquarters",
    location: "Stellantis Headquarters",
    description:
      "Venus Consultancy team visiting Stellantis headquarters to explore collaborative workforce initiatives and specialized talent acquisition.",
    attendees: "Team Venus at Stellantis Headquarters",
    orientation: "landscape",
    category: "Corporate Partnerships",
    objectPosition: "object-center",
  },
  {
    id: 106,
    image: `${CANADA_BASE_URL}/Venus%20Consultancy%20at%20Job-fair%20event.jpg`,
    eventName: "Team Venus at Community Job Fair",
    location: "Ontario, Canada",
    description:
      "Connecting job seekers with career opportunities, offering resume advice, and engaging with the local community at a regional job fair.",
    attendees: "Team Venus Consultancy at community job fair",
    orientation: "portrait",
    category: "Community & Recruitment",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 107,
    image: `${CANADA_BASE_URL}/Venus%20Consultancy%20at%20HRPA.jpg`,
    eventName: "Venus Consultancy at HRPA",
    location: "Toronto, Ontario, Canada",
    description:
      "Attending the Human Resources Professionals Association (HRPA) Annual Conference to network with HR leaders and discuss emerging talent management strategies.",
    attendees: "Venus Consultancy at Human Resources Professionals Association (HRPA)",
    orientation: "landscape",
    category: "HR & Industry Conferences",
    objectPosition: "object-center",
  },
  {
    id: 108,
    image: `${CANADA_BASE_URL}/With%20The%20Minister%20of%20Energy%20Ontario%20Province,%20Todd%20Smith.jpg`,
    eventName: "With Todd Smith - Minister of Energy Ontario Province",
    location: "Ontario, Canada",
    description:
      "Productive meeting with the Ontario Minister of Energy, Todd Smith, discussing energy sector growth, clean technology initiatives, and skilled labour demand.",
    attendees: "Venus Consultancy leadership met with Todd Smith, Ontario Minister of Energy",
    orientation: "portrait",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 109,
    image: `${CANADA_BASE_URL}/At%20Canadian%20Embassy%20Washington%20DC.jpg`,
    eventName: "At Canadian Embassy Washington DC",
    location: "Washington, D.C.",
    description:
      "Representing Canadian recruitment and technology enterprise at the Embassy of Canada in Washington, D.C., supporting bilateral trade and workforce relations.",
    attendees: "Venus Consultancy leadership at Embassy of Canada in Washington, D.C.",
    orientation: "portrait",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_10%]",
  },
  {
    id: 110,
    image: `${CANADA_BASE_URL}/Great%20Meeting%20With%20the%2022nd%20Prime%20Minister%20of%20Canada%20Stephen%20Harper.jpg`,
    eventName: "With Stephen Harper - 22nd Prime Minister of Canada",
    location: "Canada",
    description:
      "High-level meeting with the 22nd Prime Minister of Canada, Stephen Harper, discussing international business, trade policy, and economic competitiveness.",
    attendees: "Venus Consultancy leadership met with Stephen Harper, 22nd Prime Minister of Canada",
    orientation: "portrait",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 111,
    image: `${CANADA_BASE_URL}/Great%20meeting%20with%20the%20Governor%20of%20the%20Bank%20of%20Canada,%20Tiff%20Macklem.jpg`,
    eventName: "With Tiff Macklem - Governor of the Bank of Canada",
    location: "Canada",
    description:
      "Distinguished meeting with Tiff Macklem, Governor of the Bank of Canada, discussing economic trends, labor market conditions, and financial stability.",
    attendees: "Venus Consultancy leadership met with Tiff Macklem, Governor of the Bank of Canada",
    orientation: "portrait",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 112,
    image: `${CANADA_BASE_URL}/Ontario%20Business%20Network%20Event%20with%20Venus%20Consultancy%20and%20Venus%20Global%20tech.jpg`,
    eventName: "Ontario Business Network Event",
    location: "Ontario, Canada",
    description:
      "Presenting recognitions and engaging with entrepreneurs, executives, and technology innovators at the Ontario Business Network Event.",
    attendees: "Venus Consultancy and Venus Global Technology at Ontario Business Network Event",
    orientation: "portrait",
    category: "Networking & Community",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 113,
    image: `${CANADA_BASE_URL}/Team%20Venus%20at%20US%20thanks%20giving%20dinner%20at%20AMCHAM%20Gala%20Event.jpg`,
    eventName: "Team Venus at AMCHAM Gala Event",
    location: "Canada / United States",
    description:
      "Celebrating at the American Chamber of Commerce Gala Event, networking with cross-border business leaders and industry partners.",
    attendees: "Team Venus Consultancy at AMCHAM Thanksgiving Gala",
    orientation: "portrait",
    category: "Industry Events",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 114,
    image: `${CANADA_BASE_URL}/Team%20Venus%20helping%20at%20Community%20Job%20fair.jpg`,
    eventName: "Team Venus Helping at Community Job Fair",
    location: "Ontario, Canada",
    description:
      "Team Venus actively supporting the community job fair, helping connect talented individuals with career opportunities and providing recruitment guidance.",
    attendees: "Team Venus Consultancy at community job fair",
    orientation: "landscape",
    category: "Community & Recruitment",
    objectPosition: "object-top",
  },
  {
    id: 115,
    image: `${CANADA_BASE_URL}/Venus%20Consultancy%20at%20Toronto%20Police%20Booth.jpg`,
    eventName: "Venus Consultancy at Toronto Police Booth",
    location: "Toronto, Ontario, Canada",
    description:
      "Engaging with the Toronto Police Service community outreach booth, strengthening community partnerships and supporting public safety employment initiatives.",
    attendees: "Venus Consultancy with Toronto Police Service community outreach",
    orientation: "portrait",
    category: "Community & Partnerships",
    objectPosition: "object-[center_15%]",
  },
];
