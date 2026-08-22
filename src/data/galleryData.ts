export interface GalleryItem {
  id: number;
  image: string;
  eventName: string;
  location: string;
  description: string;
  attendees: string;
  orientation: "landscape" | "portrait";
  category?: string;
}

const BASE_REMOTE_URL = "https://www.venushiring.ca/gallery";

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: `${BASE_REMOTE_URL}/At%20Canadian%20Embassy%20Washington%20DC.jpg`,
    eventName: "At Canadian Embassy Washington DC",
    location: "Ottawa, Canada",
    description:
      "Important diplomatic meeting to discuss talent mobility and business relations across Canada, supporting Canadian businesses with strategic talent solutions.",
    attendees: "Venus Consultancy team at diplomatic meeting",
    orientation: "landscape",
    category: "Diplomatic & Government",
  },
  {
    id: 2,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20With%20the%2022nd%20Prime%20Minister%20of%20Canada%20Stephen%20Harper.jpg`,
    eventName: "With Stephen Harper - 22nd Prime Minister of Canada",
    location: "Canada",
    description:
      "Prestigious meeting with the 22nd Prime Minister of Canada, Stephen Harper, to discuss talent solutions and business development opportunities.",
    attendees: "Venus Consultancy team met with Stephen Harper, 22nd Prime Minister of Canada",
    orientation: "landscape",
    category: "Executive Leadership",
  },
  {
    id: 3,
    image: `${BASE_REMOTE_URL}/Great%20meeting%20with%20the%20Governor%20of%20the%20Bank%20of%20Canada,%20Tiff%20Macklem.jpg`,
    eventName: "With Tiff Macklem - Governor of the Bank of Canada",
    location: "Canada",
    description:
      "Strategic meeting with Governor Tiff Macklem of the Bank of Canada to discuss economic trends and talent needs in the financial sector.",
    attendees: "Venus Consultancy team met with Tiff Macklem, Governor of the Bank of Canada",
    orientation: "landscape",
    category: "Executive Leadership",
  },
  {
    id: 4,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20the%20President%20%26%20CEO%20of%20BDC%20bank,%20Isabelle%20Hudon.jpg`,
    eventName: "With Isabelle Hudon - President & CEO of BDC Bank",
    location: "Canada",
    description:
      "Productive meeting with Isabelle Hudon, President & CEO of BDC Bank, to explore talent solutions for business development and entrepreneurship.",
    attendees: "Venus Consultancy team met with Isabelle Hudon, President & CEO of BDC Bank",
    orientation: "landscape",
    category: "Executive Leadership",
  },
  {
    id: 5,
    image: `${BASE_REMOTE_URL}/Ontario%20Business%20Network%20Event%20with%20Venus%20Consultancy%20and%20Venus%20Global%20tech.jpg`,
    eventName: "Ontario Business Network Event",
    location: "Ontario, Canada",
    description:
      "Active participation in the Ontario Business Network Event, showcasing Venus Consultancy and Venus Global Tech's commitment to business networking and talent solutions.",
    attendees: "Venus Consultancy and Venus Global Tech team at Ontario Business Network Event",
    orientation: "landscape",
    category: "Industry Events",
  },
  {
    id: 6,
    image: `${BASE_REMOTE_URL}/Ontario%20Network%20Event%20with%20Venus%20Consultancy%20and%20Venus%20Global%20tech.jpg`,
    eventName: "Ontario Network Event",
    location: "Ontario, Canada",
    description:
      "Engaging with business leaders at the Ontario Network Event, promoting talent acquisition and business development initiatives.",
    attendees: "Venus Consultancy and Venus Global Tech team at Ontario Network Event",
    orientation: "landscape",
    category: "Industry Events",
  },
  {
    id: 7,
    image: `${BASE_REMOTE_URL}/Panel%20Discussion%20with%20teh%20TD%20Bank,%20Scotia%20Bank.jpg`,
    eventName: "Panel Discussion with TD Bank and Scotia Bank",
    location: "Canada",
    description:
      "Participating in a panel discussion with TD Bank and Scotia Bank, sharing insights on talent management and recruitment strategies in the banking sector.",
    attendees: "Venus Consultancy team at panel discussion with TD Bank and Scotia Bank",
    orientation: "landscape",
    category: "Industry Events",
  },
  {
    id: 8,
    image: `${BASE_REMOTE_URL}/Sharing%20the%20Pizza%20with%20Team.jpg`,
    eventName: "Team Building Event",
    location: "Canada",
    description:
      "Team building and celebration event, fostering collaboration and strengthening relationships within the Venus Consultancy team.",
    attendees: "Venus Consultancy team at team building event",
    orientation: "landscape",
    category: "Team & Culture",
  },
  {
    id: 9,
    image: `${BASE_REMOTE_URL}/Team%20venus%20at%20Stellantis%20Headquarter%20Michigan.jpg`,
    eventName: "Team Venus at Stellantis Headquarters",
    location: "Ontario, Canada",
    description:
      "Strategic visit to Stellantis headquarters, discussing talent solutions and supplier diversity initiatives with automotive industry leaders across Canada.",
    attendees: "Team Venus Consultancy at Stellantis headquarters",
    orientation: "landscape",
    category: "Industry Events",
  },
  {
    id: 10,
    image: `${BASE_REMOTE_URL}/Team%20Venus%20at%20US%20thanks%20giving%20dinner%20at%20AMCHAM%20Gala%20Event.jpg`,
    eventName: "Team Venus at Business Gala Event",
    location: "Toronto, Canada",
    description:
      "Celebrating at a prestigious business gala event, networking with Canadian business leaders and strengthening relationships across the Canadian market.",
    attendees: "Team Venus Consultancy at business gala event",
    orientation: "landscape",
    category: "Industry Events",
  },
  {
    id: 11,
    image: `${BASE_REMOTE_URL}/Team%20Venus%20helping%20at%20Community%20Job%20fair.jpg`,
    eventName: "Team Venus at Community Job Fair",
    location: "Canada",
    description:
      "Team Venus actively supporting community job fairs across Canada, helping connect talented individuals with career opportunities and providing recruitment guidance to Canadian job seekers.",
    attendees: "Team Venus Consultancy at community job fair",
    orientation: "landscape",
    category: "Community & Recruitment",
  },
  {
    id: 12,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20HRPA.jpg`,
    eventName: "Venus Consultancy at HRPA",
    location: "Canada",
    description:
      "Participating in the Human Resources Professionals Association event, engaging with HR leaders and showcasing talent acquisition solutions.",
    attendees: "Venus Consultancy team at HRPA event",
    orientation: "landscape",
    category: "Industry Events",
  },
  {
    id: 13,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20Job-fair%20event.jpg`,
    eventName: "Venus Consultancy at Job Fair Event",
    location: "Canada",
    description:
      "Connecting Canadian job seekers with opportunities at community job fairs across Canada, showcasing our commitment to talent placement and career development nationwide.",
    attendees: "Venus Consultancy team at job fair event",
    orientation: "landscape",
    category: "Community & Recruitment",
  },
  {
    id: 14,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20Toronto%20Police%20Booth.jpg`,
    eventName: "Venus Consultancy at Toronto Police Booth",
    location: "Toronto, Canada",
    description:
      "Engaging with the Toronto Police Service, discussing talent recruitment and career opportunities in law enforcement and public service.",
    attendees: "Venus Consultancy team at Toronto Police booth",
    orientation: "landscape",
    category: "Community & Recruitment",
  },
  {
    id: 15,
    image: `${BASE_REMOTE_URL}/With%20The%20Minister%20of%20Energy%20Ontario%20Province,%20Todd%20Smith.jpg`,
    eventName: "With Todd Smith - Minister of Energy Ontario Province",
    location: "Ontario, Canada",
    description:
      "Important meeting with Todd Smith, Minister of Energy for Ontario Province, to discuss talent needs in the energy sector and business development opportunities.",
    attendees: "Venus Consultancy team met with Todd Smith, Minister of Energy Ontario Province",
    orientation: "landscape",
    category: "Diplomatic & Government",
  },
];
