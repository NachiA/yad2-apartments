export type ContactStatus =
  | "new"
  | "contacted"
  | "meeting_scheduled"
  | "rejected"
  | "closed";

export type Apartment = {
  id: string;
  url: string;
  title: string;
  price: number;
  neighborhood: string;
  rooms: number;
  size_m2: number;
  has_safe_room: boolean;
  has_private_parking: boolean;
  has_elevator: boolean;
  notes: string;
  contact_status: ContactStatus;
};

export type ApartmentInput = Omit<Apartment, "id">;

let apartments: Apartment[] = [
  {
    id: "apt-1",
    url: "https://www.yad2.co.il/item/demo-1",
    title: "דירת 3 חדרים מוארת",
    price: 6200,
    neighborhood: "פלורנטין",
    rooms: 3,
    size_m2: 72,
    has_safe_room: true,
    has_private_parking: false,
    has_elevator: true,
    notes: "קרובה לתחבורה ציבורית. מרפסת משותפת.",
    contact_status: "new",
  },
  {
    id: "apt-2",
    url: "https://www.yad2.co.il/item/demo-2",
    title: "דירת 4 חדרים שקטה",
    price: 7100,
    neighborhood: "בורוכוב",
    rooms: 4,
    size_m2: 88,
    has_safe_room: false,
    has_private_parking: true,
    has_elevator: true,
    notes: "במצב טוב. יכולה להתאים טוב לשני שותפים.",
    contact_status: "contacted",
  },
];

export function listApartments() {
  return [...apartments];
}

export function addApartment(input: ApartmentInput) {
  const apartment: Apartment = {
    id: `apt-${crypto.randomUUID()}`,
    ...input,
  };

  apartments = [apartment, ...apartments];
  return apartment;
}

export function updateApartment(id: string, input: ApartmentInput) {
  apartments = apartments.map((apartment) =>
    apartment.id === id ? { ...apartment, ...input } : apartment,
  );
}

export function deleteApartment(id: string) {
  apartments = apartments.filter((apartment) => apartment.id !== id);
}
