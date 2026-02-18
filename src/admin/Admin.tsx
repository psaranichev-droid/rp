/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { db, seedAdminData } from "../db";
import type { Product, MediaItem, Category, UserRecord, GlobalSetting } from "../db";
import { PAGE_SLUGS } from "../seedPages";
import {
  LayoutDashboard, FileText, ShoppingBag, Image as ImageIcon, FolderOpen,
  Users, Settings, ChevronRight, Plus, Search, Trash2, Edit3, Eye,
  ArrowLeft, Save, ExternalLink, Menu, CheckCircle2, Clock,
  Package, TrendingUp, BarChart3, Activity, Globe, PanelLeft,
  LogOut, User, Bell, Hash, Tag, DollarSign,
  FileImage, Upload, AlertCircle, Shield, Mail, Layers,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
type AdminView =
  | "dashboard"
  | "pages" | "page-edit"
  | "products" | "product-edit"
  | "media" | "media-detail"
  | "categories" | "category-edit"
  | "users" | "user-edit"
  | "global-site" | "global-header" | "global-footer";

// ─── Main Admin Component ────────────────────────────────
export function PayloadAdmin({ onExit, onEditPage }: { onExit: () => void; onEditPage: (slug: string) => void }) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [editId, setEditId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedAdminData().then(() => setLoading(false));
  }, []);

  const navigate = useCallback((v: AdminView, id?: number) => {
    setView(v);
    setEditId(id ?? null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Загрузка Payload CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-[260px]" : "w-0 overflow-hidden"} bg-[#0c0f1a] text-white flex flex-col shrink-0 transition-all duration-300 fixed inset-y-0 left-0 z-40 lg:relative`}>
        {/* Logo */}
        <div className="px-6 py-5 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#0c0f1a] font-black text-xs">P</span>
          </div>
          <span className="font-bold text-base tracking-tight">Payload</span>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full ml-auto">v3.0</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={view === "dashboard"} onClick={() => navigate("dashboard")} />

          <div className="mt-6 mb-2 px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Collections</div>
          <SidebarItem icon={FileText} label="Pages" count={Object.keys(PAGE_SLUGS).length} active={view === "pages" || view === "page-edit"} onClick={() => navigate("pages")} />
          <SidebarItem icon={ShoppingBag} label="Products" active={view === "products" || view === "product-edit"} onClick={() => navigate("products")} />
          <SidebarItem icon={ImageIcon} label="Media" active={view === "media" || view === "media-detail"} onClick={() => navigate("media")} />
          <SidebarItem icon={FolderOpen} label="Categories" active={view === "categories" || view === "category-edit"} onClick={() => navigate("categories")} />
          <SidebarItem icon={Users} label="Users" active={view === "users" || view === "user-edit"} onClick={() => navigate("users")} />

          <div className="mt-6 mb-2 px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Globals</div>
          <SidebarItem icon={Globe} label="Site Settings" active={view === "global-site"} onClick={() => navigate("global-site")} />
          <SidebarItem icon={PanelLeft} label="Header" active={view === "global-header"} onClick={() => navigate("global-header")} />
          <SidebarItem icon={Layers} label="Footer" active={view === "global-footer"} onClick={() => navigate("global-footer")} />
        </nav>

        {/* User */}
        <div className="border-t border-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">admin@onlook.ru</div>
              <div className="text-[10px] text-slate-500">Администратор</div>
            </div>
            <button onClick={onExit} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors" title="Выйти">
              <LogOut className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <Breadcrumbs view={view} editId={editId} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onExit} className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">На сайт</span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white ml-1">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {view === "dashboard" && <Dashboard navigate={navigate} />}
          {view === "pages" && <PagesList navigate={navigate} onEditPage={onEditPage} />}
          {view === "products" && <ProductsList navigate={navigate} />}
          {view === "product-edit" && <ProductEdit id={editId} onBack={() => navigate("products")} />}
          {view === "media" && <MediaList navigate={navigate} />}
          {view === "categories" && <CategoriesList navigate={navigate} />}
          {view === "category-edit" && <CategoryEdit id={editId} onBack={() => navigate("categories")} />}
          {view === "users" && <UsersList navigate={navigate} />}
          {view === "user-edit" && <UserEdit id={editId} onBack={() => navigate("users")} />}
          {view === "global-site" && <GlobalEdit settingsKey="site-settings" title="Site Settings" />}
          {view === "global-header" && <GlobalEdit settingsKey="header-settings" title="Header" />}
          {view === "global-footer" && <GlobalEdit settingsKey="footer-settings" title="Footer" />}
        </main>
      </div>
    </div>
  );
}

// ─── Sidebar Item ─────────────────────────────────────────
function SidebarItem({ icon: Icon, label, active, onClick, count }: { icon: any; label: string; active: boolean; onClick: () => void; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
        active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{count}</span>}
    </button>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────
function Breadcrumbs({ view, editId }: { view: AdminView; editId: number | null }) {
  const labels: Record<string, string> = {
    dashboard: "Dashboard", pages: "Pages", "page-edit": "Edit Page",
    products: "Products", "product-edit": editId ? "Edit Product" : "Create Product",
    media: "Media", "media-detail": "Media Detail",
    categories: "Categories", "category-edit": editId ? "Edit Category" : "Create Category",
    users: "Users", "user-edit": editId ? "Edit User" : "Create User",
    "global-site": "Site Settings", "global-header": "Header", "global-footer": "Footer",
  };
  const parts = [labels[view] || view];
  const parent = view.includes("-edit") || view.includes("-detail")
    ? view.replace("-edit", "").replace("-detail", "")
    : null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-400">Payload</span>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      {parent && (
        <>
          <span className="text-slate-400 capitalize">{parent}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        </>
      )}
      <span className="text-slate-900 font-medium">{parts[0]}</span>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────
function Dashboard({ navigate }: { navigate: (v: AdminView) => void }) {
  const [stats, setStats] = useState({ pages: 0, products: 0, media: 0, categories: 0, users: 0, published: 0, drafts: 0 });

  useEffect(() => {
    Promise.all([
      db.pages.count(),
      db.products.count(),
      db.media.count(),
      db.categories.count(),
      db.users.count(),
      db.products.where("status").equals("published").count(),
      db.products.where("status").equals("draft").count(),
    ]).then(([pages, products, media, categories, users, published, drafts]) => {
      setStats({ pages, products, media, categories, users, published, drafts });
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Обзор контента и активности</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="Pages" value={stats.pages} color="bg-blue-500" onClick={() => navigate("pages")} />
        <StatCard icon={ShoppingBag} label="Products" value={stats.products} color="bg-emerald-500" onClick={() => navigate("products")} />
        <StatCard icon={ImageIcon} label="Media" value={stats.media} color="bg-purple-500" onClick={() => navigate("media")} />
        <StatCard icon={Users} label="Users" value={stats.users} color="bg-amber-500" onClick={() => navigate("users")} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Products</h2>
            <button onClick={() => navigate("products")} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View all →</button>
          </div>
          <RecentProductsTable navigate={navigate} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            <QuickAction icon={Plus} label="Create Product" onClick={() => navigate("product-edit")} />
            <QuickAction icon={Upload} label="Upload Media" onClick={() => navigate("media")} />
            <QuickAction icon={FolderOpen} label="Manage Categories" onClick={() => navigate("categories")} />
            <QuickAction icon={Settings} label="Site Settings" onClick={() => navigate("global-site")} />
            <QuickAction icon={FileText} label="Edit Pages (Puck)" onClick={() => navigate("pages")} />
          </div>

          {/* Status summary */}
          <div className="px-6 py-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Product Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-sm text-slate-600">Published</span></div>
                <span className="text-sm font-semibold text-slate-900">{stats.published}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="text-sm text-slate-600">Draft</span></div>
                <span className="text-sm font-semibold text-slate-900">{stats.drafts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, onClick }: { icon: any; label: string; value: number; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md transition-all text-left w-full group">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
      <div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-slate-500 transition-colors" />
    </button>
  );
}

function QuickAction({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors text-left group">
      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-50 transition-colors"><Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" /></div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-slate-500" />
    </button>
  );
}

function RecentProductsTable({ navigate }: { navigate: (v: AdminView, id?: number) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { db.products.orderBy("updatedAt").reverse().limit(5).toArray().then(setProducts); }, []);

  return (
    <table className="w-full">
      <thead><tr className="text-xs text-slate-400 uppercase tracking-wider"><th className="text-left px-6 py-3 font-medium">Title</th><th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Category</th><th className="text-left px-6 py-3 font-medium">Status</th><th className="text-right px-6 py-3 font-medium">Price</th></tr></thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id} onClick={() => navigate("product-edit", p.id)} className="border-t border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
            <td className="px-6 py-3.5 text-sm font-medium text-slate-900">{p.title}</td>
            <td className="px-6 py-3.5 text-sm text-slate-500 hidden sm:table-cell">{p.category}</td>
            <td className="px-6 py-3.5"><StatusBadge status={p.status} /></td>
            <td className="px-6 py-3.5 text-sm text-slate-900 font-medium text-right">{p.price} ₽</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Status Badge ─────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const s = status === "published" || status === "active"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === "published" || status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
    {status === "published" ? "Published" : status === "active" ? "Active" : status === "draft" ? "Draft" : "Inactive"}
  </span>;
}

// ─── Pages List ───────────────────────────────────────────
function PagesList({ navigate: _nav, onEditPage }: { navigate: (v: AdminView, id?: number) => void; onEditPage: (slug: string) => void }) {
  const [pages, setPages] = useState<{ name: string; updatedAt: number }[]>([]);
  useEffect(() => { db.pages.toArray().then(p => setPages(p.map(x => ({ name: x.name, updatedAt: x.updatedAt })))); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
          <p className="text-slate-500 text-sm mt-1">Управление страницами сайта через Puck Editor</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Slug</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Updated</th><th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th></tr></thead>
          <tbody>
            {Object.entries(PAGE_SLUGS).map(([slug, label]) => {
              const page = pages.find(p => p.name === slug);
              return (
                <tr key={slug} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /><span className="text-sm font-medium text-slate-900">{label}</span></div></td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell font-mono">/{slug}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{page ? new Date(page.updatedAt).toLocaleDateString("ru") : "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <a href={`#${slug}`} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Просмотр"><Eye className="w-4 h-4 text-slate-400" /></a>
                      <button onClick={() => onEditPage(slug)} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"><Edit3 className="w-3.5 h-3.5" />Puck Editor</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Products List ────────────────────────────────────────
function ProductsList({ navigate }: { navigate: (v: AdminView, id?: number) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const load = useCallback(() => { db.products.orderBy("updatedAt").reverse().toArray().then(setProducts); }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: number) => {
    if (confirm("Удалить товар?")) {
      await db.products.delete(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm mt-1">{products.length} товаров</p>
        </div>
        <button onClick={() => navigate("product-edit")} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />Create New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 mb-4 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Поиск товаров..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
          <option value="all">Все статусы</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">SKU</th>
            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
            <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-20"></th>
          </tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-3.5 cursor-pointer" onClick={() => navigate("product-edit", p.id)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0"><Package className="w-5 h-5 text-slate-400" /></div>
                    <div><div className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{p.title}</div><div className="text-xs text-slate-400 mt-0.5">ID: {p.id}</div></div>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-slate-500 font-mono hidden md:table-cell">{p.sku}</td>
                <td className="px-6 py-3.5 text-sm text-slate-500 hidden sm:table-cell">{p.category}</td>
                <td className="px-6 py-3.5"><StatusBadge status={p.status} /></td>
                <td className="px-6 py-3.5 text-sm text-slate-900 font-semibold text-right">{p.price} ₽</td>
                <td className="px-6 py-3.5 text-right">
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate("product-edit", p.id)} className="p-1.5 hover:bg-slate-100 rounded transition-colors"><Edit3 className="w-4 h-4 text-slate-400" /></button>
                    <button onClick={() => handleDelete(p.id!)} className="p-1.5 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">Товары не найдены</td></tr>
            )}
          </tbody>
        </table>
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filtered.length} of {products.length} results</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

// ─── Product Edit ─────────────────────────────────────────
function ProductEdit({ id, onBack }: { id: number | null; onBack: () => void }) {
  const [form, setForm] = useState<Partial<Product>>({
    title: "", slug: "", description: "", price: 0, category: "", status: "draft", sku: "", stock: 0, image: "",
  });
  const [cats, setCats] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    db.categories.toArray().then(setCats);
    if (id) { db.products.get(id).then(p => { if (p) setForm(p); }); }
  }, [id]);

  const save = async () => {
    setSaving(true);
    const now = Date.now();
    if (id) {
      await db.products.update(id, { ...form, updatedAt: now });
    } else {
      await db.products.add({ ...form, createdAt: now, updatedAt: now } as Product);
    }
    setSaving(false);
    onBack();
  };

  const upd = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /><span>Back to Products</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{id ? "Edit Product" : "Create Product"}</h1>
        <div className="flex items-center gap-3">
          <StatusBadge status={form.status || "draft"} />
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <FieldCard title="General">
            <Field label="Title *" icon={Tag}><input type="text" value={form.title || ""} onChange={e => upd("title", e.target.value)} className="payload-input" placeholder="Product title" /></Field>
            <Field label="Slug" icon={Hash}><input type="text" value={form.slug || ""} onChange={e => upd("slug", e.target.value)} className="payload-input font-mono" placeholder="product-slug" /></Field>
            <Field label="Description" icon={FileText}><textarea rows={4} value={form.description || ""} onChange={e => upd("description", e.target.value)} className="payload-input resize-none" placeholder="Product description..." /></Field>
          </FieldCard>

          <FieldCard title="Pricing & Inventory">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Price (₽)" icon={DollarSign}><input type="number" value={form.price || 0} onChange={e => upd("price", Number(e.target.value))} className="payload-input" /></Field>
              <Field label="SKU" icon={Hash}><input type="text" value={form.sku || ""} onChange={e => upd("sku", e.target.value)} className="payload-input font-mono" /></Field>
              <Field label="Stock" icon={Package}><input type="number" value={form.stock || 0} onChange={e => upd("stock", Number(e.target.value))} className="payload-input" /></Field>
            </div>
          </FieldCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <FieldCard title="Status">
            <Field label="Publication Status" icon={Activity}>
              <select value={form.status || "draft"} onChange={e => upd("status", e.target.value)} className="payload-input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </FieldCard>

          <FieldCard title="Organization">
            <Field label="Category" icon={FolderOpen}>
              <select value={form.category || ""} onChange={e => upd("category", e.target.value)} className="payload-input">
                <option value="">Select category</option>
                {cats.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
              </select>
            </Field>
          </FieldCard>

          <FieldCard title="Media">
            <Field label="Featured Image" icon={FileImage}>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Click to upload or drag and drop</p>
              </div>
            </Field>
          </FieldCard>

          {id && (
            <FieldCard title="Meta">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">ID</span><span className="text-slate-900 font-mono">{id}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Created</span><span className="text-slate-600">{form.createdAt ? new Date(form.createdAt).toLocaleDateString("ru") : "—"}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Updated</span><span className="text-slate-600">{form.updatedAt ? new Date(form.updatedAt).toLocaleDateString("ru") : "—"}</span></div>
              </div>
            </FieldCard>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Media List ───────────────────────────────────────────
function MediaList({ navigate: _nav }: { navigate: (v: AdminView, id?: number) => void }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const load = useCallback(() => { db.media.orderBy("createdAt").reverse().toArray().then(setItems); }, []);
  useEffect(() => { load(); }, [load]);

  const handleAdd = async () => {
    const name = prompt("Имя файла (например, photo.jpg):");
    if (!name) return;
    await db.media.add({
      filename: name, alt: name.split(".")[0], url: "", mimeType: name.endsWith(".png") ? "image/png" : name.endsWith(".svg") ? "image/svg+xml" : "image/jpeg",
      filesize: Math.floor(Math.random() * 500000) + 10000, width: 1200, height: 800, createdAt: Date.now(),
    });
    load();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Удалить файл?")) { await db.media.delete(id); load(); }
  };

  const formatSize = (bytes: number) => bytes < 1024 ? bytes + " B" : bytes < 1048576 ? (bytes / 1024).toFixed(1) + " KB" : (bytes / 1048576).toFixed(1) + " MB";
  const getIcon = (mime: string) => mime.includes("svg") ? "SVG" : mime.includes("png") ? "PNG" : "JPG";
  const getColor = (mime: string) => mime.includes("svg") ? "bg-purple-100 text-purple-600" : mime.includes("png") ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900">Media</h1><p className="text-slate-500 text-sm mt-1">{items.length} файлов</p></div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"><Plus className="w-4 h-4" />Upload</button>
      </div>

      {/* Upload zone */}
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center mb-6 hover:border-indigo-300 transition-colors cursor-pointer" onClick={handleAdd}>
        <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-600 mb-1">Drag & drop files here, or click to browse</p>
        <p className="text-xs text-slate-400">SVG, PNG, JPG (max 10MB)</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
            <div className="aspect-square bg-slate-50 flex items-center justify-center relative">
              <div className={`w-12 h-12 rounded-xl ${getColor(item.mimeType)} flex items-center justify-center font-bold text-sm`}>{getIcon(item.mimeType)}</div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleDelete(item.id!)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"><Trash2 className="w-4 h-4 text-white" /></button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-slate-900 truncate">{item.filename}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{formatSize(item.filesize)} • {item.width}×{item.height}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Categories List ──────────────────────────────────────
function CategoriesList({ navigate }: { navigate: (v: AdminView, id?: number) => void }) {
  const [cats, setCats] = useState<Category[]>([]);
  const load = useCallback(() => { db.categories.toArray().then(setCats); }, []);
  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (confirm("Удалить категорию?")) { await db.categories.delete(id); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900">Categories</h1><p className="text-slate-500 text-sm mt-1">{cats.length} категорий</p></div>
        <button onClick={() => navigate("category-edit")} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"><Plus className="w-4 h-4" />Create New</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Slug</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Description</th><th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-20"></th></tr></thead>
          <tbody>
            {cats.map(c => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-3.5 cursor-pointer" onClick={() => navigate("category-edit", c.id)}>
                  <div className="flex items-center gap-3"><FolderOpen className="w-5 h-5 text-slate-400" /><span className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{c.title}</span></div>
                </td>
                <td className="px-6 py-3.5 text-sm text-slate-500 font-mono hidden sm:table-cell">{c.slug}</td>
                <td className="px-6 py-3.5 text-sm text-slate-500 hidden md:table-cell truncate max-w-[200px]">{c.description}</td>
                <td className="px-6 py-3.5 text-right">
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate("category-edit", c.id)} className="p-1.5 hover:bg-slate-100 rounded"><Edit3 className="w-4 h-4 text-slate-400" /></button>
                    <button onClick={() => handleDelete(c.id!)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Category Edit ────────────────────────────────────────
function CategoryEdit({ id, onBack }: { id: number | null; onBack: () => void }) {
  const [form, setForm] = useState({ title: "", slug: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (id) { db.categories.get(id).then(c => { if (c) setForm({ title: c.title, slug: c.slug, description: c.description }); }); } }, [id]);

  const save = async () => {
    setSaving(true);
    const now = Date.now();
    if (id) { await db.categories.update(id, { ...form, updatedAt: now }); }
    else { await db.categories.add({ ...form, createdAt: now, updatedAt: now }); }
    setSaving(false); onBack();
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4"><ArrowLeft className="w-4 h-4" />Back to Categories</button>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{id ? "Edit Category" : "Create Category"}</h1>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "Saving..." : "Save"}</button>
      </div>
      <div className="max-w-2xl">
        <FieldCard title="Category Details">
          <Field label="Title *" icon={Tag}><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="payload-input" placeholder="Category name" /></Field>
          <Field label="Slug" icon={Hash}><input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="payload-input font-mono" placeholder="category-slug" /></Field>
          <Field label="Description" icon={FileText}><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="payload-input resize-none" placeholder="Category description" /></Field>
        </FieldCard>
      </div>
    </div>
  );
}

// ─── Users List ───────────────────────────────────────────
function UsersList({ navigate }: { navigate: (v: AdminView, id?: number) => void }) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const load = useCallback(() => { db.users.toArray().then(setUsers); }, []);
  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (confirm("Удалить пользователя?")) { await db.users.delete(id); load(); }
  };

  const roleIcon: Record<string, any> = { admin: Shield, editor: Edit3, user: User };
  const roleColor: Record<string, string> = { admin: "bg-red-50 text-red-600 border-red-200", editor: "bg-blue-50 text-blue-600 border-blue-200", user: "bg-slate-50 text-slate-600 border-slate-200" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900">Users</h1><p className="text-slate-500 text-sm mt-1">{users.length} пользователей</p></div>
        <button onClick={() => navigate("user-edit")} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"><Plus className="w-4 h-4" />Create New</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Email</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th><th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th><th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-20"></th></tr></thead>
          <tbody>
            {users.map(u => {
              const RoleIcon = roleIcon[u.role] || User;
              return (
                <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-3.5 cursor-pointer" onClick={() => navigate("user-edit", u.id)}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">{u.name[0]}</div>
                      <span className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-500 hidden sm:table-cell">{u.email}</td>
                  <td className="px-6 py-3.5"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${roleColor[u.role]}`}><RoleIcon className="w-3 h-3" />{u.role}</span></td>
                  <td className="px-6 py-3.5"><StatusBadge status={u.status} /></td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate("user-edit", u.id)} className="p-1.5 hover:bg-slate-100 rounded"><Edit3 className="w-4 h-4 text-slate-400" /></button>
                      <button onClick={() => handleDelete(u.id!)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── User Edit ────────────────────────────────────────────
function UserEdit({ id, onBack }: { id: number | null; onBack: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", role: "user" as string, status: "active" as string });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (id) { db.users.get(id).then(u => { if (u) setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); }); } }, [id]);

  const save = async () => {
    setSaving(true);
    const now = Date.now();
    if (id) { await db.users.update(id, { ...form, updatedAt: now } as any); }
    else { await db.users.add({ ...form, createdAt: now, updatedAt: now } as UserRecord); }
    setSaving(false); onBack();
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4"><ArrowLeft className="w-4 h-4" />Back to Users</button>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{id ? "Edit User" : "Create User"}</h1>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "Saving..." : "Save"}</button>
      </div>
      <div className="max-w-2xl grid gap-6">
        <FieldCard title="User Details">
          <Field label="Name *" icon={User}><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="payload-input" placeholder="Full name" /></Field>
          <Field label="Email *" icon={Mail}><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="payload-input" placeholder="email@example.com" /></Field>
        </FieldCard>
        <FieldCard title="Permissions">
          <Field label="Role" icon={Shield}>
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="payload-input">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </Field>
          <Field label="Status" icon={Activity}>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="payload-input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
        </FieldCard>
      </div>
    </div>
  );
}

// ─── Global Settings Edit ─────────────────────────────────
function GlobalEdit({ settingsKey, title }: { settingsKey: string; title: string }) {
  const [setting, setSetting] = useState<GlobalSetting | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    db.globals.where("key").equals(settingsKey).first().then(s => {
      if (s) { setSetting(s); setForm(s.value || {}); }
    });
  }, [settingsKey]);

  const save = async () => {
    setSaving(true);
    if (setting?.id) {
      await db.globals.update(setting.id, { value: form, updatedAt: Date.now() });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const upd = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }));

  // Field configs for each global
  const fields: Record<string, { label: string; key: string; type: string; icon: any }[]> = {
    "site-settings": [
      { label: "Site Name", key: "siteName", type: "text", icon: Globe },
      { label: "Site Description", key: "siteDescription", type: "text", icon: FileText },
      { label: "Site URL", key: "siteUrl", type: "text", icon: ExternalLink },
      { label: "Contact Email", key: "contactEmail", type: "text", icon: Mail },
      { label: "Contact Phone", key: "contactPhone", type: "text", icon: AlertCircle },
      { label: "Address", key: "address", type: "text", icon: BarChart3 },
      { label: "Working Hours", key: "workingHours", type: "text", icon: Clock },
      { label: "VK Link", key: "socialVk", type: "text", icon: Globe },
      { label: "Telegram Link", key: "socialTelegram", type: "text", icon: Globe },
      { label: "WhatsApp Link", key: "socialWhatsapp", type: "text", icon: Globe },
    ],
    "header-settings": [
      { label: "Top Bar Text", key: "topBarText", type: "text", icon: PanelLeft },
      { label: "Show Top Bar", key: "showTopBar", type: "toggle", icon: Eye },
      { label: "Logo Text", key: "logoText", type: "text", icon: Tag },
      { label: "Show Search", key: "showSearch", type: "toggle", icon: Search },
      { label: "Show Cart", key: "showCart", type: "toggle", icon: ShoppingBag },
      { label: "Show Favorites", key: "showFavorites", type: "toggle", icon: TrendingUp },
    ],
    "footer-settings": [
      { label: "Show Newsletter", key: "showNewsletter", type: "toggle", icon: Mail },
      { label: "Newsletter Title", key: "newsletterTitle", type: "text", icon: Tag },
      { label: "Copyright Text", key: "copyrightText", type: "text", icon: FileText },
      { label: "Show Social Links", key: "showSocialLinks", type: "toggle", icon: Globe },
    ],
  };

  const currentFields = fields[settingsKey] || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1"><span>Globals</span><ChevronRight className="w-3.5 h-3.5" /><span className="text-slate-900">{title}</span></div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="flex items-center gap-1.5 text-sm text-emerald-600"><CheckCircle2 className="w-4 h-4" />Saved!</span>}
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>

      <div className="max-w-2xl">
        <FieldCard title={title}>
          {currentFields.map(f => (
            <Field key={f.key} label={f.label} icon={f.icon}>
              {f.type === "toggle" ? (
                <button
                  onClick={() => upd(f.key, !form[f.key])}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${form[f.key] ? "bg-indigo-600" : "bg-slate-200"}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${form[f.key] ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              ) : (
                <input type="text" value={form[f.key] || ""} onChange={e => upd(f.key, e.target.value)} className="payload-input" />
              )}
            </Field>
          ))}
        </FieldCard>

        {setting && (
          <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Meta</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Key</span><span className="text-slate-900 font-mono">{settingsKey}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Last Updated</span><span className="text-slate-600">{setting.updatedAt ? new Date(setting.updatedAt).toLocaleString("ru") : "—"}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared UI Components ─────────────────────────────────
function FieldCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon?: any; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        {label}
      </label>
      {children}
    </div>
  );
}
