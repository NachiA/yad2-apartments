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
    id: "apt-3jdhzy73",
    url: "https://www.yad2.co.il/realestate/item/jerusalem-area/3jdhzy73",
    title: "דירה, חוזה סן מרטין 23, קטמונים, ירושלים",
    price: 4000000,
    neighborhood: "קטמונים",
    rooms: 4.5,
    size_m2: 110,
    has_safe_room: true,
    has_private_parking: true,
    has_elevator: true,
    notes:
      "קומה 4 מתוך 10 | מצב: חדש (גרו בנכס) | 1 מרפסת | 1 חניה | כניסה: 23/12/2025\n4.5 חדרים\nקומה 4\nיפה, מוארת, גדולה\nעם נוף לארנה, טדי , מלחה \nחנייה במרתף - 2\nמעוצבת אדריכלית\nמחסן קרוב לחנייה\nבניין יוקרתי",
    contact_status: "new",
  },
  {
    id: "apt-0cojt1fd",
    url: "https://www.yad2.co.il/realestate/item/jerusalem-area/0cojt1fd",
    title: "גג/ פנטהאוז, חוזה סן מרטין 32, קטמונים, ירושלים",
    price: 3780000,
    neighborhood: "קטמונים",
    rooms: 4,
    size_m2: 150,
    has_safe_room: true,
    has_private_parking: true,
    has_elevator: true,
    notes:
      'קומה 7 מתוך 7 | מצב: חדש (גרו בנכס) | 1 מרפסת | 1 חניה | כניסה: 30/12/2025\nמאפייני פנים:\n4 חדרים | מואר מאוד | משופץ ברמה גבוהה | אופציה להרחבה + אופציות נוספות | מתוכנן היטב | יחידת הורים | חדר רחצה + 2 שירותים | 2 מרפסות סוכה 82 מ"ר | הכנה למטבח חוץ | נוף פתוח ויפה | 3 כיווני אויר | חימום תת ריצפתי | יונקרס | ממ"ד | חניה פרטית | מעלית + מעלית שבת | נגישות מלאה',
    contact_status: "new",
  },
  {
    id: "apt-e9lthyr3",
    url: "https://www.yad2.co.il/realestate/item/jerusalem-area/e9lthyr3",
    title: "דירה, דרך בית לחם, תלפיות תעשיה ומסחר, ירושלים",
    price: 3350000,
    neighborhood: "תלפיות תעשיה ומסחר",
    rooms: 4,
    size_m2: 110,
    has_safe_room: true,
    has_private_parking: true,
    has_elevator: true,
    notes:
      'קומה 2 מתוך 12 | מצב: משופץ | 1 מרפסת | 1 חניה | מחסן | כניסה: 15/02/2026\nחייב חייב חייב למכור\nדירת 4 חדרים מסודרת היטב \nמטבח גדול ומושקעת \nמרפסת 13 מטר \nקומה 2\nמעלית שבת \nמזגן מני מרכזי אם שליטה על כל חדר\nיחדת הורים \n2 שירותים \nיונקרס,בוילר\nמחסן\nחניה\nמחיר מצחיק!!',
    contact_status: "new",
  },
  {
    id: "apt-h3jvjklt",
    url: "https://www.yad2.co.il/realestate/item/jerusalem-area/h3jvjklt",
    title: "דירה, השופט חיים כהן, ארנונה, ירושלים",
    price: 3690000,
    neighborhood: "ארנונה",
    rooms: 4,
    size_m2: 112,
    has_safe_room: true,
    has_private_parking: true,
    has_elevator: true,
    notes:
      'קומה 8 מתוך 15 | מצב: משופץ | 1 מרפסת | 1 חניה | מחסן | כניסה: 24/02/2026\nברחוב השופט חיים כהן מוצעת למכירה דירת 4 חדרים גדולה ומרווחת עם מרפסת מקסימה שחלקה סוכה, מיזוג מרכזי, חימום  דירתי, 3 חדרי שירותים ו2 חדרי רחצה (מקלחת+ אמבטיה) ממ"ד, חניה ומחסן. בקרבה לפארק, מרכזי קניות, תחבורה ציבורית, קו הרכבת הקלה (כחול), בתי כנסת ועוד... \nלפרטים נוספים והתרשמות מהנכס מוזמנים לפנות למיכאל',
    contact_status: "new",
  },
  {
    id: "apt-dugy43gg",
    url: "https://www.yad2.co.il/realestate/item/jerusalem-area/dugy43gg",
    title: "דירה, דוד אלרואי, קטמון הישנה, ירושלים",
    price: 3900000,
    neighborhood: "קטמון הישנה",
    rooms: 4,
    size_m2: 100,
    has_safe_room: true,
    has_private_parking: true,
    has_elevator: true,
    notes:
      "קומה 6 מתוך 12 | מצב: דרוש שיפוץ | 2 חניות | כניסה מיידית\nבקטמון הישנה מרחק הליכה לתיאטרון ירושלים והמושבה הגרמנית - עמק רפאים,\n דירת 4 חדרים, 2 אמבטיות, מיזוג, מעלית גם שבת, חניה, נגישות מלאה, נוף פתוח\nלכניסה מיידית!!",
    contact_status: "new",
  },
  {
    id: "apt-8xcpkjaj",
    url: "https://www.yad2.co.il/realestate/item/jerusalem-area/8xcpkjaj",
    title: "גג/ פנטהאוז, הנרייטה סולד 7, קרית היובל, ירושלים",
    price: 3800000,
    neighborhood: "קרית היובל",
    rooms: 4,
    size_m2: 124,
    has_safe_room: true,
    has_private_parking: true,
    has_elevator: true,
    notes:
      'קומה 18 מתוך 22 | מצב: חדש (גרו בנכס) | 1 מרפסת | 1 חניה | מחסן | כניסה מיידית\nדירה אטרקטיבית במגדל חדש | קומה 18 | נוף פתוח | מעלית שבת\n\n 4 חדרים גדולה, מרווחת ומוארת\n107 מ"ר + מרפסת 14 מ"ר \nמחסן ענק 12 מ"ר (יכול לשמש כחדר עבודה או השכרה בנפרד)\nקומה 18 עם נוף פתוח ושקט\nבמגדל חדש בן שנתיים,\n4 מעליות בבניין, כולל מעלית שבת\nדירה מוארת מאוד, תכנון מצוין\n\nמרכז קניות חדיש ופארקים מתחת לבית, לובי מטופח, סביבת מגורים איכותית\nחדר כושר במתחם חינם, צמוד לבריכה העירונית. \n\nכניסה מיידית',
    contact_status: "new",
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
