import { useState } from "react";
import {
  Truck,
  Phone,
  Mail,
  Search,
  Heart,
  ShoppingCart,
  LayoutGrid,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

interface SiteHeaderProps {
  currentPage?: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { label: "Оптовые цены", key: "wholesale" },
  { label: "Шоурум", key: "showroom" },
  { label: "Дизайнерская бумага", key: "designer-paper" },
  { label: "Индивидуальная резка", key: "custom-cut" },
];

export function SiteHeader({ currentPage, onNavigate }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="w-full font-sans shadow-md">

      {/* ═══════════════════════════════════════════
          УРОВЕНЬ 1 — Топ-бар
      ═══════════════════════════════════════════ */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4">
          {/* Левая часть — бесплатная доставка */}
          <div className="flex items-center gap-2 min-w-0">
            <Truck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">
              Бесплатная доставка до транспортных компаний
            </span>
          </div>

          {/* Правая часть — контакты */}
          <div className="flex items-center gap-5 shrink-0">
            <a
              href="tel:+79101066003"
              className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-indigo-400" />
              <span>+7 (910) 106-60-03</span>
            </a>
            <a
              href="mailto:info@onlook.ru"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
            >
              <Mail className="w-3 h-3 text-indigo-400" />
              <span>info@onlook.ru</span>
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          УРОВЕНЬ 2 — Основная функциональность
      ═══════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center gap-4 md:gap-6">

          {/* Логотип */}
          <button
            onClick={() => onNavigate("wholesale")}
            className="text-2xl font-black tracking-tight text-slate-900 hover:text-indigo-600 transition-colors shrink-0"
          >
            Onlook
          </button>

          {/* Кнопка «Каталог» */}
          <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm shrink-0">
            <LayoutGrid className="w-4 h-4" />
            <span>Каталог</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Поле поиска — растягивается */}
          <div className="flex-1 relative hidden md:block">
            <input
              type="text"
              placeholder="Поиск по ассортименту..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-12 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Правый блок: Избранное + Корзина + Бургер */}
          <div className="flex items-center gap-4 ml-auto md:ml-0 shrink-0">

            {/* Избранное */}
            <button className="hidden sm:flex flex-col items-center gap-0.5 text-slate-500 hover:text-indigo-600 transition-colors group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium leading-none">Избранное</span>
            </button>

            {/* Корзина */}
            <button className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-indigo-600 transition-colors group relative">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount >= 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white px-0.5">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-none hidden sm:block">Корзина</span>
            </button>

            {/* Бургер (только мобайл) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Поиск на мобайле (под основной строкой) */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по ассортименту..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-11 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          УРОВЕНЬ 3 — Навигационные ссылки
      ═══════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center h-11 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className={`
                  relative h-full px-4 text-sm font-medium transition-all whitespace-nowrap
                  after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:transition-all
                  ${
                    currentPage === link.key
                      ? "text-indigo-700 after:bg-indigo-600"
                      : "text-slate-600 hover:text-indigo-600 after:bg-transparent hover:after:bg-indigo-200"
                  }
                `}
              >
                {link.label}
              </button>
            ))}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Payload CMS link */}
            <button
              onClick={() => onNavigate("admin")}
              className="flex items-center gap-1.5 px-3 h-full text-xs text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <span className="w-4 h-4 bg-slate-900 rounded flex items-center justify-center text-[8px] font-black text-white shrink-0">
                P
              </span>
              <span>Payload CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Мобильное меню
      ═══════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => {
                  onNavigate(link.key);
                  setMobileOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${
                    currentPage === link.key
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                  }
                `}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-slate-100 mt-2 pt-2">
              {/* Каталог (mobile) */}
              <button className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors mb-1">
                <LayoutGrid className="w-4 h-4" />
                Каталог
              </button>

              {/* Payload CMS (mobile) */}
              <button
                onClick={() => {
                  onNavigate("admin");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <span className="w-5 h-5 bg-slate-900 rounded flex items-center justify-center text-[9px] font-black text-white">
                  P
                </span>
                Payload CMS
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
