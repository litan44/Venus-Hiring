import { useState, useEffect } from "react";

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  category?: string;
  orderIndex?: number;
}

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    q: "How quickly can you present qualified candidates?",
    a: "For most standard and specialized roles, you receive a calibrated shortlist of pre-screened candidates within 5 business days of our initial discovery session. Complex executive or niche technical searches typically take 2 to 3 weeks.",
    category: "Recruitment",
    orderIndex: 0,
  },
  {
    id: "faq-2",
    q: "Do you support international hiring and Canadian work-permit pathways?",
    a: "Yes. We regularly source internationally trained professionals and guide employers through LMIA applications, work-permit transitions, and PR-pathway considerations alongside our domestic Canadian talent pools.",
    category: "Immigration & Legal",
    orderIndex: 1,
  },
  {
    id: "faq-3",
    q: "What placement guarantees do you provide?",
    a: "All permanent placements carry a written replacement guarantee. If a hire does not work out inside the agreed period, we restart the search at zero additional fee.",
    category: "Guarantee",
    orderIndex: 2,
  },
  {
    id: "faq-4",
    q: "Which industries and sectors do you specialize in?",
    a: "We specialize in Finance & Accounting, Technology, Automotive & EV, Aerospace, Advanced Manufacturing, Skilled Trades, and Executive Leadership across Canada and the US Midwest.",
    category: "Sectors",
    orderIndex: 3,
  },
  {
    id: "faq-5",
    q: "Can Venus Consultancy function as our fractional HR department?",
    a: "Our fractional HR and advisory practice provides interim HR leadership for workforce planning, compliance frameworks, policy drafting, and team scaling without adding permanent overhead.",
    category: "Advisory",
    orderIndex: 4,
  },
  {
    id: "faq-6",
    q: "What is the difference between direct placement and SOW project pods?",
    a: "Direct placement focuses on sourcing full-time employees for your internal payroll. SOW (Statement of Work) pods deploy specialized, managed teams committed to specific project deliverables and milestones under a fixed budget.",
    category: "Services",
    orderIndex: 5,
  },
];

const STORAGE_KEY_FAQS = "venus_faqs_data_v1";

export function getStoredFaqs(): FaqItem[] {
  if (typeof window === "undefined") return INITIAL_FAQS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAQS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(INITIAL_FAQS));
      return INITIAL_FAQS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FAQS;
  }
}

export function saveStoredFaqs(faqs: FaqItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(faqs));
  window.dispatchEvent(new Event("venus_faqs_updated"));
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<FaqItem[]>(getStoredFaqs());

  const fetchFromDb = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (data.success && data.faqs && data.faqs.length > 0) {
        const currentJson = JSON.stringify(faqs);
        const newJson = JSON.stringify(data.faqs);
        if (currentJson !== newJson) {
          setFaqs(data.faqs);
          saveStoredFaqs(data.faqs);
        }
      }
    } catch (err) {
      console.warn("[PostgreSQL Sync Notice]: Using cached local storage FAQs.", err);
    }
  };

  useEffect(() => {
    fetchFromDb();

    const handleUpdate = () => {
      setFaqs(getStoredFaqs());
    };

    window.addEventListener("venus_faqs_updated", handleUpdate);
    return () => {
      window.removeEventListener("venus_faqs_updated", handleUpdate);
    };
  }, []);

  const addFaq = async (faq: FaqItem) => {
    const updated = [...faqs, faq];
    setFaqs(updated);
    saveStoredFaqs(updated);

    try {
      await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq),
      });
      fetchFromDb();
    } catch (err) {
      console.error("[PostgreSQL Add FAQ Error]:", err);
    }
  };

  const updateFaq = async (id: string, updatedFields: Partial<FaqItem>) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, ...updatedFields } : f));
    setFaqs(updated);
    saveStoredFaqs(updated);

    try {
      await fetch("/api/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedFields }),
      });
      fetchFromDb();
    } catch (err) {
      console.error("[PostgreSQL Update FAQ Error]:", err);
    }
  };

  const deleteFaq = async (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    saveStoredFaqs(updated);

    try {
      await fetch("/api/faqs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchFromDb();
    } catch (err) {
      console.error("[PostgreSQL Delete FAQ Error]:", err);
    }
  };

  const reorderFaqs = async (newOrder: FaqItem[]) => {
    setFaqs(newOrder);
    saveStoredFaqs(newOrder);

    try {
      await fetch("/api/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderList: newOrder }),
      });
    } catch (err) {
      console.error("[PostgreSQL Reorder FAQs Error]:", err);
    }
  };

  return {
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    reorderFaqs,
  };
}
