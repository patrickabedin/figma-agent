export const phoneDisplay = "+30 210 9200 100";
export const phoneHref = "tel:+302109200100";
export const email = "info@avance.gr";
export const longTermEmail = "1monthplus@avance.gr";
export const address = "318 Vouliagmenis Ave., 173 43, Agios Dimitrios, Athens";
export const liveSite = "https://avance.gr";

export const locations = [
  "Athens International Airport",
  "Athens Downtown Koukaki",
  "Athens Marousi",
  "Athens Piraeus Port",
  "Thessaloniki Airport",
  "Thessaloniki Downtown",
  "Thessaloniki Port",
  "Santorini Airport",
  "Santorini Main Station",
  "Mykonos Airport",
  "Mykonos Port",
  "Corfu Airport",
  "Corfu Port",
  "Heraklion Airport",
  "Heraklion Port",
  "Chania Airport",
  "Rhodes Airport",
  "Rhodes Port",
  "Rhodes New Marina",
  "Milos Airport",
  "Milos Port",
  "Naxos Airport",
  "Naxos Port",
  "Paros Airport",
  "Paros Downtown / Port",
  "Kefalonia Airport",
  "Zakynthos Airport",
  "Kos Airport",
  "Kos Downtown",
  "Samos Airport",
  "Kalamata Airport",
  "Kalamata Downtown",
  "Preveza Aktion Airport",
  "Patra Downtown",
  "Patra Araxos Airport",
  "Chios Airport",
  "Lesvos Airport",
  "Lemnos Airport",
  "Syros Airport",
  "Syros Downtown / Port",
  "Tinos Downtown / Port",
  "Andros Gavrio Port",
  "Aegina Main Port",
  "Ithaki Downtown",
  "Patmos Downtown / Port",
  "Karpathos Airport",
  "Lefkada Downtown",
  "Ioannina Airport",
  "Kavala Airport",
  "Alexandroupoli Airport",
] as const;

export const destinations = [
  {
    name: "Corfu",
    place: "Corfu Airport",
    price: "from 7€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/corfu.jpg",
    featured: true,
  },
  {
    name: "Santorini",
    place: "Santorini Airport",
    price: "from 10,40€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/santorini.jpg",
  },
  {
    name: "Mykonos",
    place: "Mykonos Airport",
    price: "from 11,96€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/mykonos.jpg",
  },
  {
    name: "Milos",
    place: "Milos Port",
    price: "from 15,54€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/milos.jpg",
  },
  {
    name: "Tinos",
    place: "Tinos Port",
    price: "from 18,48€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/tinos.jpg",
  },
  {
    name: "Kalamata",
    place: "Kalamata Airport",
    price: "from 9,76€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/kalamata.jpg",
  },
  {
    name: "Syros",
    place: "Syros Port",
    price: "from 24€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/syros.jpg",
  },
  {
    name: "Patmos",
    place: "Patmos Port",
    price: "from 36,23€",
    note: "daily rate / weekly reservation",
    image: "/media/destinations/patmos.jpg",
  },
] as const;

export const fleet = [
  {
    name: "Mini / Economy",
    image: "/media/fleet/mini.jpg",
    field: "gold" as const,
    copy: "Island streets and tight town parking.",
  },
  {
    name: "Compact / Intermediate",
    image: "/media/fleet/compact.jpg",
    field: "wash" as const,
    copy: "Mainland days and family luggage.",
  },
  {
    name: "SUV",
    image: "/media/fleet/suv.jpg",
    field: "navy" as const,
    copy: "Coast roads and longer transfers.",
  },
  {
    name: "Passenger Van",
    image: "/media/fleet/van.jpg",
    field: "ice" as const,
    copy: "Crews, families, hotel groups.",
  },
  {
    name: "Cargo",
    image: "/media/fleet/cargo.jpg",
    field: "sky" as const,
    copy: "Light commercial and one-way loads.",
  },
] as const;

export const faqs = [
  {
    q: "Can I add drivers in Avance Car Rental?",
    a: "You can add up to 3 drivers, either before renting the car or in the middle of the contract, as long as they have a valid driver’s license and comply with age restrictions.",
  },
  {
    q: "Why haven’t I received booking confirmation?",
    a: "Most reservations are confirmed automatically. In some cases, it may take up to 24 hours for the bookings to be confirmed. Feel free to contact the reservations department at +30 210 9200100 or via email at info@avance.gr.",
  },
  {
    q: "Why choose online check-in?",
    a: "Because you can reduce time at the counter, pick your car, and let the fun begin at once. Check-in online before pickup or on the go, and rent a car promptly.",
  },
  {
    q: "How do I book a rental over 30 days?",
    a: "For rentals over 30 days, please contact our reservation department at +30 210 9200100 or by email at 1monthplus@avance.gr.",
  },
];

export const nav = [
  { href: "#destinations", label: "Destinations" },
  { href: "#fleet", label: "Fleet" },
  { href: "#locations", label: "Locations" },
  { href: "#b2b", label: "B2B" },
  { href: "#faq", label: "FAQs" },
];
