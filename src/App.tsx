import { useState, useEffect, useCallback, useRef } from "react";
import { Render } from "@puckeditor/core";
import { config } from "./config";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { db } from "./db";
import { seedPages, PAGE_SLUGS } from "./seedPages";
import { PageEditor } from "./Editor";
import { PayloadAdmin } from "./admin/Admin";
import { cn } from "./utils/cn";

type Page = "wholesale" | "showroom" | "designer-paper" | "custom-cut" | "editor" | "admin";

function getPageFromHash(): Page {
  const hash = window.location.hash.replace("#", "");
  if (hash === "admin" || hash.startsWith("admin")) return "admin";
  const valid: Page[] = ["wholesale", "showroom", "designer-paper", "custom-cut", "editor"];
  if (valid.includes(hash as Page)) return hash as Page;
  return "wholesale";
}

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [pageData, setPageData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [dataVersion, setDataVersion] = useState(0);

  // Header show-on-scroll-up behavior
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Seed pages on first load
  useEffect(() => {
    seedPages().then(() => setLoading(false));
  }, []);

  // Measure header height
  useEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;
    const measure = () => setHeaderHeight(el.offsetHeight || 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [currentPage]);

  // Listen for hash changes
  useEffect(() => {
    const handler = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      if (page !== "editor") setEditSlug(null);
      // Reset scroll state when page changes
      setHeaderVisible(true);
      lastScrollY.current = 0;
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  // Scroll logic: Hide on down, Show on up
  useEffect(() => {
    const isSitePage = currentPage !== "editor" && currentPage !== "admin";
    if (!isSitePage) return;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const prev = lastScrollY.current;
      const goingDown = y > prev;
      
      // Always show at the top or if scrolling up
      if (y < headerHeight || !goingDown) {
        setHeaderVisible(true);
      } else if (goingDown && y > headerHeight) {
        setHeaderVisible(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPage, headerHeight]);

  // Load page data from DB
  useEffect(() => {
    if (loading || currentPage === "editor" || currentPage === "admin") return;

    let cancelled = false;
    async function loadPage() {
      const pages = await db.pages.toArray();
      const page = pages.find(p => p.name === currentPage);
      if (cancelled) return;
      setPageData(page ? page.data : null);
    }
    loadPage();
    return () => { cancelled = true; };
  }, [currentPage, loading, dataVersion]);

  const navigate = useCallback((page: string) => {
    window.location.hash = page;
    setCurrentPage(page as Page);
    setEditSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Document title
  const pageTitles: Record<string, string> = {
    wholesale: "Оптовые цены — Onlook",
    showroom: "Шоурум — Onlook",
    "designer-paper": "Дизайнерская бумага — Onlook",
    "custom-cut": "Индивидуальная резка — Onlook",
    editor: "Редактор — Onlook",
    admin: "Payload CMS — Onlook",
  };
  document.title = pageTitles[currentPage] || "Onlook";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Editing a specific page via Puck
  if (editSlug) {
    return (
      <PageEditor
        slug={editSlug}
        onBack={() => {
          setEditSlug(null);
          setDataVersion(v => v + 1);
        }}
      />
    );
  }

  // Payload CMS Admin Panel
  if (currentPage === "admin") {
    return (
      <PayloadAdmin
        onExit={() => navigate("wholesale")}
        onEditPage={(slug) => setEditSlug(slug)}
      />
    );
  }

  // Editor dashboard (legacy)
  if (currentPage === "editor") {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate("wholesale")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2">
            ← Вернуться на сайт
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("admin")} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              🔧 Payload CMS
            </button>
            <span className="text-sm text-slate-500">Редактор страниц</span>
          </div>
        </div>
        <EditorDashboard onEdit={(slug) => setEditSlug(slug)} />
      </div>
    );
  }

  // Render site pages
  return (
    <div className="min-h-screen bg-white">
      {/* Header: Sticky, hides on scroll down */}
      <div
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out will-change-transform shadow-sm",
          !headerVisible && "-translate-y-full pointer-events-none"
        )}
      >
        <SiteHeader currentPage={currentPage} onNavigate={navigate} />
      </div>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={() => navigate("admin")}
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 text-xs"
        >
          <span className="w-5 h-5 bg-white rounded flex items-center justify-center text-[10px] font-black text-slate-900">P</span>
          Payload CMS
        </button>
        <button
          onClick={() => setEditSlug(currentPage)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 text-sm"
        >
          ✏️ Редактировать
        </button>
      </div>

      <main>
        {pageData ? (
          <Render config={config} data={pageData as Parameters<typeof Render>[0]["data"]} />
        ) : (
          <div className="py-20 text-center text-slate-400">Страница не найдена</div>
        )}
      </main>

      <SiteFooter onNavigate={navigate} />
    </div>
  );
}

// Editor Dashboard
function EditorDashboard({ onEdit }: { onEdit: (slug: string) => void }) {
  const [pages, setPages] = useState<{ name: string; updatedAt: number }[]>([]);

  useEffect(() => {
    db.pages.toArray().then(p => setPages(p.map(x => ({ name: x.name, updatedAt: x.updatedAt }))));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">📄 Управление страницами</h1>
        <p className="text-slate-500">Нажмите «Редактировать» чтобы открыть визуальный конструктор Puck</p>
      </div>

      <div className="grid gap-4">
        {Object.entries(PAGE_SLUGS).map(([slug, label]) => {
          const page = pages.find(p => p.name === slug);
          return (
            <div key={slug} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{label}</h3>
                <p className="text-sm text-slate-400">
                  Slug: #{slug} {page ? `• Обновлено: ${new Date(page.updatedAt).toLocaleString("ru")}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a href={`#${slug}`} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  👁️ Просмотр
                </a>
                <button onClick={() => onEdit(slug)} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm">
                  ✏️ Редактировать
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
