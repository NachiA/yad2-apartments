import Link from "next/link";
import { refresh } from "next/cache";

import {
  addApartment,
  deleteApartment,
  listApartments,
  type ApartmentInput,
  type ContactStatus,
  updateApartment,
} from "./_lib/apartments-store";

export const dynamic = "force-dynamic";

const contactStatuses: ContactStatus[] = [
  "new",
  "contacted",
  "meeting_scheduled",
  "rejected",
  "closed",
];

const contactStatusLabels: Record<ContactStatus, string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  meeting_scheduled: "נקבעה פגישה",
  rejected: "ירד מהפרק",
  closed: "נסגר",
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getApartmentInput(formData: FormData): ApartmentInput {
  const contactStatus = getString(formData, "contact_status") as ContactStatus;

  return {
    url: getString(formData, "url"),
    title: getString(formData, "title"),
    price: getNumber(formData, "price"),
    neighborhood: getString(formData, "neighborhood"),
    rooms: getNumber(formData, "rooms"),
    size_m2: getNumber(formData, "size_m2"),
    has_safe_room: getBoolean(formData, "has_safe_room"),
    has_private_parking: getBoolean(formData, "has_private_parking"),
    has_elevator: getBoolean(formData, "has_elevator"),
    notes: getString(formData, "notes"),
    contact_status: contactStatuses.includes(contactStatus)
      ? contactStatus
      : "new",
  };
}

function formatListingCount(count: number) {
  return `${count} ${count === 1 ? "מודעה" : "מודעות"}`;
}

function TabLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
        isActive
          ? "bg-stone-200 text-stone-900 shadow-sm"
          : "bg-white text-stone-600 hover:bg-stone-100"
      }`}
      href={href}
    >
      {label}
    </Link>
  );
}

function CheckboxField({
  label,
  name,
  defaultChecked = false,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700">
      <input
        className="h-4 w-4 accent-stone-900"
        defaultChecked={defaultChecked}
        name={name}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  step,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: "text" | "url" | "number";
  required?: boolean;
  step?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
      <span>{label}</span>
      <input
        className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none ring-0 transition focus:border-stone-500"
        defaultValue={defaultValue}
        name={name}
        required={required}
        step={step}
        type={type}
      />
    </label>
  );
}

export default async function Home(props: PageProps<"/">) {
  async function createApartment(formData: FormData) {
    "use server";

    addApartment(getApartmentInput(formData));
    refresh();
  }

  async function saveApartment(formData: FormData) {
    "use server";

    const id = getString(formData, "id");
    if (!id) {
      return;
    }

    updateApartment(id, getApartmentInput(formData));
    refresh();
  }

  async function removeApartment(formData: FormData) {
    "use server";

    const id = getString(formData, "id");
    if (!id) {
      return;
    }

    deleteApartment(id);
    refresh();
  }

  const apartments = listApartments();
  const searchParams = await props.searchParams;
  const activeTab = searchParams.tab === "list" ? "list" : "new";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff_0%,_#f7f4ee_55%,_#efe7d8_100%)] px-4 py-8 text-stone-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
            מעקב דירות משותף
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            אבא ואימא עוברים לירושלים
          </h1>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-stone-50 p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <TabLink href="/?tab=new" isActive={activeTab === "new"} label="הוספת דירה" />
            <TabLink
              href="/?tab=list"
              isActive={activeTab === "list"}
              label={`רשימת דירות (${apartments.length})`}
            />
          </div>
        </section>

        {activeTab === "new" ? (
          <section className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">הוספת דירה</h2>
              <p className="mt-1 text-sm text-stone-600">
                טופס קצר להוספת מודעה חדשה בירושלים.
              </p>
            </div>

            <form action={createApartment} className="grid gap-4 md:grid-cols-2">
              <Field label="קישור" name="url" required type="url" />
              <Field label="כותרת" name="title" required />
              <Field label="מחיר" name="price" required step="1" type="number" />
              <Field label="שכונה" name="neighborhood" required />
              <Field label="חדרים" name="rooms" required step="0.5" type="number" />
              <Field label='גודל (מ"ר)' name="size_m2" required step="1" type="number" />
              <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
                <CheckboxField label='ממ"ד' name="has_safe_room" />
                <CheckboxField label="חניה פרטית" name="has_private_parking" />
                <CheckboxField label="מעלית" name="has_elevator" />
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                <span>סטטוס פנייה</span>
                <select
                  className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                  defaultValue="new"
                  name="contact_status"
                >
                  {contactStatuses.map((status) => (
                    <option key={status} value={status}>
                      {contactStatusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-stone-700">
                <span>הערות</span>
                <textarea
                  className="min-h-28 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                  name="notes"
                />
              </label>

              <button
                className="inline-flex w-fit items-center justify-center rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
                type="submit"
              >
                הוספת דירה
              </button>
            </form>
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">דירות שהתווספו</h2>
              <p className="text-sm text-stone-600">
                {formatListingCount(apartments.length)}
              </p>
            </div>

            {apartments.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-stone-300 bg-white/70 p-8 text-center text-sm text-stone-600">
                עדיין אין דירות. עברו ללשונית ההוספה כדי להזין את הדירה הראשונה.
              </div>
            ) : (
              <div className="grid gap-4">
                {apartments.map((apartment) => (
                  <article
                    key={apartment.id}
                    className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold">{apartment.title}</h3>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
                        {contactStatusLabels[apartment.contact_status]}
                      </span>
                      <a
                        className="text-sm font-medium text-stone-600 underline-offset-4 hover:underline"
                        href={apartment.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        פתיחת מודעה
                      </a>
                    </div>

                    <form action={saveApartment} className="grid gap-4 md:grid-cols-2">
                      <input name="id" type="hidden" value={apartment.id} />

                      <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                        <span>קישור</span>
                        <input
                          className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none ring-0 transition focus:border-stone-500"
                          defaultValue={apartment.url}
                          name="url"
                          required
                          type="url"
                        />
                        <a
                          className="w-fit text-xs text-stone-600 underline underline-offset-4 hover:text-stone-900"
                          href={apartment.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          לפתיחת הקישור
                        </a>
                      </label>
                      <Field
                        defaultValue={apartment.title}
                        label="כותרת"
                        name="title"
                        required
                      />
                      <Field
                        defaultValue={apartment.price}
                        label="מחיר"
                        name="price"
                        required
                        step="1"
                        type="number"
                      />
                      <Field
                        defaultValue={apartment.neighborhood}
                        label="שכונה"
                        name="neighborhood"
                        required
                      />
                      <Field
                        defaultValue={apartment.rooms}
                        label="חדרים"
                        name="rooms"
                        required
                        step="0.5"
                        type="number"
                      />
                      <Field
                        defaultValue={apartment.size_m2}
                        label='גודל (מ"ר)'
                        name="size_m2"
                        required
                        step="1"
                        type="number"
                      />
                      <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
                        <CheckboxField
                          defaultChecked={apartment.has_safe_room}
                          label='ממ"ד'
                          name="has_safe_room"
                        />
                        <CheckboxField
                          defaultChecked={apartment.has_private_parking}
                          label="חניה פרטית"
                          name="has_private_parking"
                        />
                        <CheckboxField
                          defaultChecked={apartment.has_elevator}
                          label="מעלית"
                          name="has_elevator"
                        />
                      </div>

                      <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                        <span>סטטוס פנייה</span>
                        <select
                          className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                          defaultValue={apartment.contact_status}
                          name="contact_status"
                        >
                          {contactStatuses.map((status) => (
                            <option key={status} value={status}>
                              {contactStatusLabels[status]}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-stone-700">
                        <span>הערות</span>
                        <textarea
                          className="min-h-28 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                          defaultValue={apartment.notes}
                          name="notes"
                        />
                      </label>

                      <div className="flex flex-wrap gap-3">
                        <button
                          className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
                          type="submit"
                        >
                          שמירת שינויים
                        </button>
                      </div>
                    </form>

                    <form action={removeApartment} className="mt-3">
                      <input name="id" type="hidden" value={apartment.id} />
                      <button
                        className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                        type="submit"
                      >
                        מחיקת דירה
                      </button>
                    </form>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
