/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "@puckeditor/core";
import { DropZone } from "@puckeditor/core";
import {
  Rocket, CheckCircle2, Star, Users, ShieldCheck, Zap, ArrowRight, Code, Globe, Lock,
  MessageSquare, Smile, Truck, Wifi, ZapOff, Search, Settings, Share2, Shield,
  Smartphone, Sparkles, Target, ThumbsUp, Wrench, TrendingUp, Award, Bell, Box,
  Briefcase, Camera, Clock, Cloud, Coffee, Database, Eye as EyeIcon, Heart,
  Image as ImageIcon, Layers, Layout as LayoutIcon, LifeBuoy, Mail, Map, Moon,
  Music, Paperclip, PieChart, Play, Printer, RefreshCw, Send, ShoppingBag, Sun,
  Tv, User, Video, Volume2, Phone, Grid, ShoppingCart, ChevronDown, Menu, MapPin,
  CreditCard, Scissors, Package, FileText, Palette, Lightbulb, Car, Train, Ruler,
  AlertTriangle,
} from "lucide-react";
import { cn } from "./utils/cn";
import { useState } from "react";

const iconMap: Record<string, any> = {
  Rocket, CheckCircle2, Star, Users, ShieldCheck, Zap, Code, Globe, Lock,
  MessageSquare, Smile, Truck, Wifi, ZapOff, Search, Settings, Share2, Shield,
  Smartphone, Sparkles, Target, ThumbsUp, Wrench, TrendingUp, Award, Bell, Box,
  Briefcase, Camera, Clock, Cloud, Coffee, Database, EyeIcon, Heart, ImageIcon,
  Layers, LayoutIcon, LifeBuoy, Mail, Map, Moon, Music, Paperclip, PieChart,
  Play, Printer, RefreshCw, Send, ShoppingBag, Sun, Tv, User, Video, Volume2,
  MapPin, CreditCard, Scissors, Package, FileText, Palette, Lightbulb, Car,
  Train, Ruler, Phone, AlertTriangle,
};

const iconOptions = Object.keys(iconMap).map(k => ({ label: k, value: k }));

// Extracted ContactForm as a proper React component so useState works correctly
function ContactFormInner(p: any) {
  const [sent, setSent] = useState(false);
  return (
    <section className="bg-gradient-to-br from-slate-900 to-indigo-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Заявка</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{p.title || "Оставьте заявку"}</h2>
            <p className="text-slate-300 leading-relaxed mb-8">{p.subtitle || ""}</p>
            <div className="space-y-4">
              {(p.features || []).map((f: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">{f.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Среднее время ответа: 15 минут</span>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center text-white">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{p.successTitle || "Заявка принята!"}</h3>
                <p className="text-slate-300">{p.successMessage || "Мы свяжемся с вами"}</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Имя</label>
                    <input type="text" placeholder="Ваше имя" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Задача</label>
                    <textarea rows={3} placeholder="Формат, тираж..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                  </div>
                  <button onClick={() => setSent(true)} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />Отправить
                  </button>
                  <p className="text-xs text-slate-400 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const config: Config = {
  root: {
    fields: {
      seoTitle: { type: "text", label: "SEO: Заголовок страницы" },
      seoDescription: { type: "textarea", label: "SEO: Описание" },
      seoKeywords: { type: "text", label: "SEO: Ключевые слова" },
      ogTitle: { type: "text", label: "OG: Заголовок" },
      ogDescription: { type: "textarea", label: "OG: Описание" },
      ogImage: { type: "text", label: "OG: Изображение URL" },
    },
    defaultProps: {
      seoTitle: "", seoDescription: "", seoKeywords: "",
      ogTitle: "", ogDescription: "", ogImage: "",
    },
    render: ({ children, puck }: any) => (
      <div className="font-sans text-slate-900 selection:bg-indigo-100">
        {puck?.isEditing && (
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs text-slate-500 text-center">
            🔧 Режим редактирования — перетащите компоненты из левой панели
          </div>
        )}
        <main>{children}</main>
      </div>
    ),
  },
  components: {
    EcommerceHeader: {
      label: "🏪 Шапка магазина",
      fields: {
        topBarText: { type: "text", label: "Текст верхней полосы" },
        phone: { type: "text", label: "Телефон" },
        email: { type: "text", label: "Email" },
        logoText: { type: "text", label: "Логотип (текст)" },
        cartCount: { type: "number", label: "Товаров в корзине" },
        link1: { type: "text", label: "Ссылка 1" },
        link2: { type: "text", label: "Ссылка 2" },
        link3: { type: "text", label: "Ссылка 3" },
        link4: { type: "text", label: "Ссылка 4" },
      },
      defaultProps: {
        topBarText: "Бесплатная доставка до транспортных компаний",
        phone: "+7 (910) 106-60-03", email: "info@onlook.ru", logoText: "Onlook", cartCount: 0,
        link1: "Оптовые цены", link2: "Шоурум", link3: "Дизайнерская бумага", link4: "Индивидуальная резка",
      },
      render: (p: any) => (
        <header className="w-full font-sans">
          <div className="bg-slate-900 text-slate-300 py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs border-b border-slate-800 gap-1 md:gap-0">
            <div className="flex items-center gap-2"><Truck className="w-3.5 h-3.5 text-indigo-400" /><span>{p.topBarText}</span></div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-indigo-400" />{p.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-indigo-400" />{p.email}</span>
            </div>
          </div>
          <div className="bg-white border-b border-slate-100 py-3 px-4 md:px-8 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 md:gap-6">
              <div className="text-2xl font-black tracking-tight text-slate-900 shrink-0">{p.logoText}</div>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"><Grid className="w-4 h-4" /><span>Каталог</span></button>
              <div className="flex-1 min-w-[200px] relative order-last md:order-none w-full md:w-auto">
                <input type="text" placeholder="Поиск товаров..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                <button className="absolute right-1 top-1 bottom-1 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"><Search className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center gap-0.5 text-slate-500"><Heart className="w-5 h-5" /><span className="text-[10px] font-medium hidden sm:block">Избранное</span></div>
                <div className="flex flex-col items-center gap-0.5 text-slate-500 relative">
                  <div className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">{p.cartCount || 0}</span></div>
                  <span className="text-[10px] font-medium hidden sm:block">Корзина</span>
                </div>
                <div className="md:hidden text-slate-600"><Menu className="w-6 h-6" /></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm border-b border-slate-100 overflow-x-auto no-scrollbar">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex gap-1">
              {[p.link1, p.link2, p.link3, p.link4].filter(Boolean).map((label: string, idx: number) => (
                <span key={idx} className="text-sm font-medium px-4 py-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer">
                  {label}{idx === 2 && <ChevronDown className="w-3 h-3 opacity-50" />}
                </span>
              ))}
            </div>
          </div>
        </header>
      ),
    },

    HeroBanner: {
      label: "🚀 Герой-баннер",
      fields: {
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        badge: { type: "text", label: "Бейдж" },
        ctaText: { type: "text", label: "Кнопка основная" },
        ctaSecondaryText: { type: "text", label: "Кнопка вторичная" },
        variant: { type: "select", label: "Тема", options: [
          { label: "Индиго градиент", value: "indigo" }, { label: "Тёмный", value: "dark" },
          { label: "Фиолетовый", value: "purple" }, { label: "Изумрудный", value: "emerald" }, { label: "Белый", value: "white" },
        ]},
        align: { type: "select", label: "Выравнивание", options: [{ label: "Слева", value: "left" }, { label: "По центру", value: "center" }] },
      },
      defaultProps: { title: "Заголовок", subtitle: "Описание", badge: "", ctaText: "Подробнее", ctaSecondaryText: "Связаться", variant: "indigo", align: "left" },
      render: (p: any) => {
        const bg: Record<string, string> = { indigo: "bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900", dark: "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950", purple: "bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950", emerald: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950", white: "bg-white" };
        const isLight = p.variant === "white";
        return (
          <section className={cn("relative overflow-hidden", bg[p.variant] || bg.indigo)}>
            <div className="absolute inset-0 opacity-20"><div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" /><div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" /></div>
            <div className={cn("max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10", p.align === "center" && "text-center")}>
              <div className={cn(p.align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl")}>
                {p.badge && <div className={cn("inline-flex items-center gap-2 backdrop-blur-md border rounded-full px-4 py-1.5 text-sm mb-8", isLight ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white/10 border-white/20 text-white")}><span>{p.badge}</span></div>}
                <h1 className={cn("text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight", isLight ? "text-slate-900" : "text-white")}>{p.title}</h1>
                <p className={cn("text-lg md:text-xl leading-relaxed mb-10", isLight ? "text-slate-600" : "text-indigo-200")}>{p.subtitle}</p>
                <div className={cn("flex flex-wrap gap-4", p.align === "center" ? "justify-center" : "")}>
                  {p.ctaText && <button className={cn("px-8 py-4 rounded-xl font-bold transition-all shadow-xl flex items-center gap-2", isLight ? "bg-indigo-600 text-white" : "bg-white text-indigo-900 hover:bg-indigo-50")}>{p.ctaText}<ArrowRight className="w-5 h-5" /></button>}
                  {p.ctaSecondaryText && <button className={cn("px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-md border", isLight ? "bg-slate-100 text-slate-800 border-slate-200" : "bg-white/10 border-white/20 text-white hover:bg-white/20")}>{p.ctaSecondaryText}</button>}
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    InfoCards: {
      label: "📋 Карточки информации",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        columns: { type: "select", label: "Столбцы", options: [{ label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }] },
        background: { type: "select", label: "Фон", options: [{ label: "Белый", value: "white" }, { label: "Серый", value: "slate" }] },
        items: {
          type: "array", label: "Карточки",
          getItemSummary: (item: any) => item.title || "Карточка",
          arrayFields: {
            title: { type: "text", label: "Заголовок" },
            description: { type: "textarea", label: "Описание" },
            icon: { type: "select", label: "Иконка", options: iconOptions },
            color: { type: "select", label: "Цвет", options: [
              { label: "Синий", value: "blue" }, { label: "Зелёный", value: "emerald" },
              { label: "Фиолетовый", value: "purple" }, { label: "Оранжевый", value: "orange" },
              { label: "Розовый", value: "pink" }, { label: "Индиго", value: "indigo" },
            ]},
          },
        },
      },
      defaultProps: {
        sectionLabel: "О компании", title: "Информация", subtitle: "", columns: "3", background: "slate",
        items: [{ title: "Доставка", description: "Бесплатная доставка до ТК", icon: "Truck", color: "blue" }],
      },
      render: (p: any) => {
        const cm: Record<string, string> = { blue: "bg-blue-50 text-blue-600", emerald: "bg-emerald-50 text-emerald-600", purple: "bg-purple-50 text-purple-600", orange: "bg-orange-50 text-orange-600", pink: "bg-pink-50 text-pink-600", indigo: "bg-indigo-50 text-indigo-600" };
        const col = p.columns === "4" ? "lg:grid-cols-4" : p.columns === "2" ? "lg:grid-cols-2" : "lg:grid-cols-3";
        return (
          <section className={cn("py-20 px-6", p.background === "slate" ? "bg-slate-50" : "bg-white")}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                {p.sectionLabel && <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
                {p.subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{p.subtitle}</p>}
              </div>
              <div className={cn("grid md:grid-cols-2 gap-6", col)}>
                {(p.items || []).map((item: any, i: number) => {
                  const Icon = iconMap[item.icon] || Zap;
                  return (
                    <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", cm[item.color] || "bg-indigo-50 text-indigo-600")}><Icon className="w-7 h-7" /></div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      },
    },

    PriceTable: {
      label: "💰 Таблица цен",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        footnote: { type: "text", label: "Примечание" },
        headersText: { type: "text", label: "Заголовки столбцов (через |)" },
        rows: {
          type: "array", label: "Строки таблицы",
          getItemSummary: (item: any) => (item.cells || "").split("|")[0] || "Строка",
          arrayFields: {
            cells: { type: "text", label: "Ячейки (через |)" },
          },
        },
      },
      defaultProps: {
        sectionLabel: "Прайс-лист", title: "Цены", subtitle: "", footnote: "",
        headersText: "Продукт|Формат|Цена",
        rows: [{ cells: "Бумага|A4|320 ₽" }],
      },
      render: (p: any) => {
        const headers = (p.headersText || "").split("|").map((s: string) => s.trim()).filter(Boolean);
        return (
          <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                {p.sectionLabel && <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
                {p.subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{p.subtitle}</p>}
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {headers.map((h: string, i: number) => <th key={i} className="text-left px-6 py-4 font-bold text-slate-700">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {(p.rows || []).map((row: any, ri: number) => (
                      <tr key={ri} className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors">
                        {(row.cells || "").split("|").map((cell: string, ci: number) => (
                          <td key={ci} className={cn("px-6 py-4", ci === 0 ? "font-medium text-slate-900" : "text-slate-600")}>{cell.trim()}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {p.footnote && <div className="mt-6 flex items-center gap-2 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>{p.footnote}</span></div>}
            </div>
          </section>
        );
      },
    },

    MarketplaceCards: {
      label: "🛒 Маркетплейсы",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        items: {
          type: "array", label: "Маркетплейсы",
          getItemSummary: (item: any) => item.name || "МП",
          arrayFields: {
            name: { type: "text", label: "Название" },
            description: { type: "textarea", label: "Описание" },
            gradient: { type: "text", label: "Градиент CSS классы" },
          },
        },
      },
      defaultProps: {
        sectionLabel: "Маркетплейсы", title: "Покупайте на маркетплейсах", subtitle: "",
        items: [{ name: "Wildberries", description: "Весь ассортимент", gradient: "from-purple-500 to-purple-700" }],
      },
      render: (p: any) => (
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {p.sectionLabel && <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
              {p.subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{p.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {(p.items || []).map((mp: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className={cn("bg-gradient-to-r p-8 flex items-center justify-center", mp.gradient)}><ShoppingBag className="w-16 h-16 text-white/80" /></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{mp.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">{mp.description}</p>
                    <span className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-3 transition-all">Перейти<ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    Newsletter: {
      label: "📧 Рассылка",
      fields: {
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        buttonText: { type: "text", label: "Текст кнопки" },
        variant: { type: "select", label: "Тема", options: [
          { label: "Индиго", value: "indigo" }, { label: "Фиолетовый", value: "purple" }, { label: "Изумрудный", value: "emerald" },
        ]},
      },
      defaultProps: { title: "Подпишитесь на рассылку", subtitle: "Будьте в курсе новинок", buttonText: "Подписаться", variant: "indigo" },
      render: (p: any) => {
        const bg: Record<string, string> = { indigo: "bg-indigo-600", purple: "bg-gradient-to-br from-purple-600 to-indigo-700", emerald: "bg-emerald-600" };
        return (
          <section className={cn("py-20 px-6", bg[p.variant] || bg.indigo)}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{p.title}</h2>
              <p className="text-white/70 text-lg mb-10">{p.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input type="email" placeholder="Ваш email" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:ring-2 focus:ring-white outline-none backdrop-blur-md" />
                <button className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg">{p.buttonText}</button>
              </div>
            </div>
          </section>
        );
      },
    },

    CategoryGrid: {
      label: "📦 Сетка категорий",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        items: {
          type: "array", label: "Категории",
          getItemSummary: (item: any) => item.name || "Категория",
          arrayFields: {
            name: { type: "text", label: "Название" },
            description: { type: "textarea", label: "Описание" },
            icon: { type: "select", label: "Иконка", options: iconOptions },
            gradient: { type: "text", label: "Градиент CSS" },
          },
        },
      },
      defaultProps: { sectionLabel: "Ассортимент", title: "Категории", subtitle: "", items: [] },
      render: (p: any) => (
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {p.sectionLabel && <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
              {p.subtitle && <p className="text-slate-500 text-lg">{p.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(p.items || []).map((cat: any, i: number) => {
                const Icon = iconMap[cat.icon] || FileText;
                return (
                  <div key={i} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className={cn("bg-gradient-to-br p-8 flex items-center justify-center", cat.gradient)}><Icon className="w-14 h-14 text-white/80 group-hover:scale-110 transition-transform" /></div>
                    <div className="p-6"><h3 className="text-lg font-bold mb-2">{cat.name}</h3><p className="text-slate-500 text-sm">{cat.description}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ),
    },

    VisitorCards: {
      label: "👥 Карточки посетителей",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        items: {
          type: "array", label: "Посетители",
          getItemSummary: (item: any) => item.title || "Гость",
          arrayFields: {
            title: { type: "text", label: "Заголовок" },
            description: { type: "textarea", label: "Описание" },
            icon: { type: "select", label: "Иконка", options: iconOptions },
          },
        },
      },
      defaultProps: { sectionLabel: "Наши клиенты", title: "Кто посещает", subtitle: "", items: [] },
      render: (p: any) => (
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {p.sectionLabel && <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
              {p.subtitle && <p className="text-slate-500 text-lg">{p.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {(p.items || []).map((v: any, i: number) => {
                const Icon = iconMap[v.icon] || Users;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Icon className="w-7 h-7" /></div>
                    <div><h3 className="text-xl font-bold mb-2">{v.title}</h3><p className="text-slate-500 leading-relaxed">{v.description}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ),
    },

    FactList: {
      label: "⭐ Список фактов",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        items: {
          type: "array", label: "Факты",
          getItemSummary: (item: any) => (item.text || "").slice(0, 40) || "Факт",
          arrayFields: {
            text: { type: "textarea", label: "Текст" },
            icon: { type: "select", label: "Иконка", options: iconOptions },
          },
        },
      },
      defaultProps: { sectionLabel: "Факты", title: "Интересные факты", items: [{ text: "Факт 1", icon: "Star" }] },
      render: (p: any) => (
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {p.sectionLabel && <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(p.items || []).map((fact: any, i: number) => {
                const Icon = iconMap[fact.icon] || Star;
                return (
                  <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600"><Icon className="w-5 h-5" /></div>
                    <p className="text-slate-700 font-medium leading-relaxed">{fact.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ),
    },

    ContactCTA: {
      label: "📞 Контактный блок",
      fields: {
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        address: { type: "text", label: "Адрес" },
        phone: { type: "text", label: "Телефон" },
        workingHours: { type: "text", label: "Часы работы" },
        ctaText: { type: "text", label: "Кнопка основная" },
        ctaSecondaryText: { type: "text", label: "Кнопка вторичная" },
        variant: { type: "select", label: "Тема", options: [
          { label: "Индиго", value: "indigo" }, { label: "Фиолетовый", value: "purple" }, { label: "Изумрудный", value: "emerald" },
        ]},
      },
      defaultProps: { title: "Приезжайте к нам", subtitle: "Всегда рады видеть вас", address: "г. Нижний Новгород", phone: "+7 (910) 106-60-03", workingHours: "Пн–Пт: 9:00–18:00", ctaText: "Записаться", ctaSecondaryText: "Позвонить", variant: "indigo" },
      render: (p: any) => {
        const bg: Record<string, string> = { indigo: "bg-gradient-to-br from-indigo-600 to-indigo-800", purple: "bg-gradient-to-br from-purple-600 to-indigo-700", emerald: "bg-gradient-to-br from-emerald-600 to-emerald-800" };
        return (
          <section className={cn("py-20 px-6", bg[p.variant] || bg.indigo)}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-16 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{p.title}</h2>
                <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">{p.subtitle}</p>
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="flex flex-col items-center gap-3"><MapPin className="w-8 h-8 text-white/60" /><span className="text-sm text-white/80">{p.address}</span></div>
                  <div className="flex flex-col items-center gap-3"><Phone className="w-8 h-8 text-white/60" /><span className="text-sm text-white/80">{p.phone}</span></div>
                  <div className="flex flex-col items-center gap-3"><Clock className="w-8 h-8 text-white/60" /><span className="text-sm text-white/80">{p.workingHours}</span></div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2">{p.ctaText}<ArrowRight className="w-5 h-5" /></button>
                  <span className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2"><Phone className="w-5 h-5" />{p.ctaSecondaryText}</span>
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    ReviewCards: {
      label: "💬 Отзывы",
      fields: {
        title: { type: "text", label: "Заголовок" },
        items: {
          type: "array", label: "Отзывы",
          getItemSummary: (item: any) => item.name || "Отзыв",
          arrayFields: {
            name: { type: "text", label: "Имя" },
            role: { type: "text", label: "Роль" },
            text: { type: "textarea", label: "Текст отзыва" },
          },
        },
      },
      defaultProps: { title: "Отзывы клиентов", items: [{ name: "Анна", role: "Дизайнер", text: "Отличный сервис!" }] },
      render: (p: any) => (
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2></div>
            <div className="grid md:grid-cols-3 gap-8">
              {(p.items || []).map((r: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-slate-600 italic mb-6 leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">{(r.name || "?")[0]}</div>
                    <div><div className="font-bold text-sm">{r.name}</div><div className="text-xs text-slate-400">{r.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    CollectionCards: {
      label: "🎨 Коллекции",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        items: {
          type: "array", label: "Коллекции",
          getItemSummary: (item: any) => item.name || "Коллекция",
          arrayFields: {
            name: { type: "text", label: "Название" },
            description: { type: "textarea", label: "Описание" },
            colors: { type: "text", label: "CSS классы цветов (через запятую)" },
          },
        },
      },
      defaultProps: { sectionLabel: "Коллекции", title: "Дизайнерская бумага", subtitle: "", items: [] },
      render: (p: any) => (
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {p.sectionLabel && <p className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
              {p.subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{p.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(p.items || []).map((col: any, i: number) => (
                <div key={i} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="p-6 pb-0">
                    <div className="flex gap-2 mb-4">{(col.colors || "").split(",").filter(Boolean).map((c: string, ci: number) => <div key={ci} className={cn("w-8 h-8 rounded-lg shadow-sm", c.trim())} />)}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">{col.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{col.description}</p>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <span className="text-purple-600 font-bold text-sm flex items-center gap-1 group-hover:gap-3 transition-all">Подробнее<ArrowRight className="w-4 h-4" /></span>
                    <Sparkles className="w-5 h-5 text-slate-300 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WarningBanner: {
      label: "⚠️ Предупреждение",
      fields: {
        title: { type: "text", label: "Заголовок" },
        text: { type: "textarea", label: "Текст" },
      },
      defaultProps: { title: "Важно знать!", text: "Информационное сообщение" },
      render: (p: any) => (
        <section className="bg-amber-50 py-12 px-6 border-y border-amber-100">
          <div className="max-w-4xl mx-auto flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0 text-amber-600"><AlertTriangle className="w-6 h-6" /></div>
            <div><h3 className="font-bold text-amber-900 mb-1">{p.title}</h3><p className="text-amber-700 leading-relaxed">{p.text}</p></div>
          </div>
        </section>
      ),
    },

    TimelineSteps: {
      label: "📝 Этапы (таймлайн)",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        accentColor: { type: "select", label: "Цвет акцента", options: [
          { label: "Фиолетовый", value: "purple" }, { label: "Индиго", value: "indigo" }, { label: "Изумрудный", value: "emerald" },
        ]},
        items: {
          type: "array", label: "Этапы",
          getItemSummary: (item: any) => item.title || "Этап",
          arrayFields: {
            title: { type: "text", label: "Заголовок" },
            description: { type: "textarea", label: "Описание" },
          },
        },
      },
      defaultProps: { sectionLabel: "Процесс", title: "Этапы работ", subtitle: "", accentColor: "purple", items: [{ title: "Шаг 1", description: "Описание" }] },
      render: (p: any) => {
        const accent = p.accentColor || "purple";
        const accentText = accent === "emerald" ? "text-emerald-600" : accent === "indigo" ? "text-indigo-600" : "text-purple-600";
        return (
          <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                {p.sectionLabel && <p className={cn("font-bold text-sm uppercase tracking-wider mb-3", accentText)}>{p.sectionLabel}</p>}
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
                {p.subtitle && <p className="text-slate-500 text-lg">{p.subtitle}</p>}
              </div>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />
                <div className="space-y-6">
                  {(p.items || []).map((step: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="relative z-10 shrink-0 hidden md:flex">
                        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-purple-500 group-hover:bg-purple-50 flex items-center justify-center font-black text-xl text-slate-400 group-hover:text-purple-600 transition-all shadow-sm">{i + 1}</div>
                      </div>
                      <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:border-purple-100 transition-all">
                        <div className="flex items-center gap-3 mb-2 md:hidden"><span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">{i + 1}</span></div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-purple-700 transition-colors">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    ServiceCards: {
      label: "🔧 Карточки услуг",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        accentColor: { type: "select", label: "Цвет акцента", options: [
          { label: "Изумрудный", value: "emerald" }, { label: "Индиго", value: "indigo" }, { label: "Фиолетовый", value: "purple" },
        ]},
        items: {
          type: "array", label: "Услуги",
          getItemSummary: (item: any) => item.title || "Услуга",
          arrayFields: {
            title: { type: "text", label: "Заголовок" },
            description: { type: "textarea", label: "Описание" },
            icon: { type: "select", label: "Иконка", options: iconOptions },
          },
        },
      },
      defaultProps: { sectionLabel: "Услуги", title: "Наши услуги", subtitle: "", accentColor: "emerald", items: [{ title: "Услуга", description: "Описание", icon: "Zap" }] },
      render: (p: any) => {
        const cm: Record<string, { bg: string; hover: string }> = {
          emerald: { bg: "bg-emerald-50 text-emerald-600", hover: "group-hover:bg-emerald-600 group-hover:text-white" },
          indigo: { bg: "bg-indigo-50 text-indigo-600", hover: "group-hover:bg-indigo-600 group-hover:text-white" },
          purple: { bg: "bg-purple-50 text-purple-600", hover: "group-hover:bg-purple-600 group-hover:text-white" },
        };
        const c = cm[p.accentColor] || cm.emerald;
        const accentText = p.accentColor === "emerald" ? "text-emerald-600" : p.accentColor === "indigo" ? "text-indigo-600" : "text-purple-600";
        return (
          <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                {p.sectionLabel && <p className={cn("font-bold text-sm uppercase tracking-wider mb-3", accentText)}>{p.sectionLabel}</p>}
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
                {p.subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{p.subtitle}</p>}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(p.items || []).map((s: any, i: number) => {
                  const Icon = iconMap[s.icon] || Zap;
                  return (
                    <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors", c.bg, c.hover)}><Icon className="w-7 h-7" /></div>
                      <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{s.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      },
    },

    TechSpecs: {
      label: "📊 Тех. параметры",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        items: {
          type: "array", label: "Параметры",
          getItemSummary: (item: any) => item.label || "Параметр",
          arrayFields: {
            label: { type: "text", label: "Название" },
            value: { type: "text", label: "Значение" },
            icon: { type: "select", label: "Иконка", options: iconOptions },
          },
        },
      },
      defaultProps: { sectionLabel: "Оборудование", title: "Технические параметры", items: [{ label: "Точность", value: "±0.5 мм", icon: "Target" }] },
      render: (p: any) => (
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {p.sectionLabel && <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {(p.items || []).map((spec: any, i: number) => {
                const Icon = iconMap[spec.icon] || Zap;
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center hover:border-emerald-200 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Icon className="w-6 h-6" /></div>
                    <div className="text-2xl font-extrabold text-slate-900 mb-1">{spec.value}</div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{spec.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ),
    },

    TagCloud: {
      label: "🏷️ Облако тегов",
      fields: {
        sectionLabel: { type: "text", label: "Метка секции" },
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        tags: {
          type: "array", label: "Теги",
          getItemSummary: (item: any) => item.label || "Тег",
          arrayFields: {
            label: { type: "text", label: "Текст" },
          },
        },
      },
      defaultProps: { sectionLabel: "Популярное", title: "Частые задачи", subtitle: "", tags: [{ label: "Визитки" }, { label: "Листовки" }] },
      render: (p: any) => (
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {p.sectionLabel && <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-3">{p.sectionLabel}</p>}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{p.title}</h2>
              {p.subtitle && <p className="text-slate-500 text-lg">{p.subtitle}</p>}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {(p.tags || []).map((tag: any, i: number) => <span key={i} className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-full font-medium text-sm hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-100">{tag.label}</span>)}
            </div>
          </div>
        </section>
      ),
    },

    ContactForm: {
      label: "📝 Форма заявки",
      fields: {
        title: { type: "text", label: "Заголовок" },
        subtitle: { type: "textarea", label: "Подзаголовок" },
        successTitle: { type: "text", label: "Заголовок успеха" },
        successMessage: { type: "text", label: "Сообщение успеха" },
        feature1: { type: "text", label: "Преимущество 1" },
        feature2: { type: "text", label: "Преимущество 2" },
        feature3: { type: "text", label: "Преимущество 3" },
      },
      defaultProps: {
        title: "Оставьте заявку", subtitle: "Свяжемся в течение 30 минут",
        successTitle: "Заявка принята!", successMessage: "Мы свяжемся с вами",
        feature1: "Быстрый расчет", feature2: "Любая сложность", feature3: "",
      },
      render: (p: any) => {
        const features = [p.feature1, p.feature2, p.feature3].filter(Boolean).map((text: string) => ({ text }));
        return <ContactFormInner {...p} features={features} />;
      },
    },

    Section: {
      label: "📐 Секция-контейнер",
      fields: {
        background: { type: "select", label: "Фон", options: [
          { label: "Белый", value: "white" }, { label: "Серый", value: "slate" },
          { label: "Тёмный", value: "dark" }, { label: "Индиго", value: "indigo" },
        ]},
        padding: { type: "select", label: "Отступы", options: [
          { label: "Нет", value: "none" }, { label: "Маленький", value: "sm" },
          { label: "Средний", value: "md" }, { label: "Большой", value: "lg" },
        ]},
      },
      defaultProps: { background: "white", padding: "md" },
      render: (p: any) => {
        const bgMap: Record<string, string> = { white: "bg-white", slate: "bg-slate-50", dark: "bg-slate-900 text-white", indigo: "bg-indigo-600 text-white" };
        const padMap: Record<string, string> = { none: "py-0", sm: "py-8", md: "py-20", lg: "py-32" };
        return <section className={cn(bgMap[p.background] || "bg-white", padMap[p.padding] || "py-20", "px-6")}><div className="max-w-6xl mx-auto"><DropZone zone="section-content" /></div></section>;
      },
    },

    Heading: {
      label: "📌 Заголовок",
      fields: {
        title: { type: "text", label: "Текст" },
        level: { type: "select", label: "Уровень", options: [{ label: "H1", value: "h1" }, { label: "H2", value: "h2" }, { label: "H3", value: "h3" }] },
        align: { type: "select", label: "Выравнивание", options: [{ label: "Слева", value: "left" }, { label: "По центру", value: "center" }] },
      },
      defaultProps: { title: "Заголовок", level: "h2", align: "left" },
      render: (p: any) => {
        const sizes: Record<string, string> = { h1: "text-5xl md:text-7xl font-extrabold", h2: "text-3xl md:text-4xl font-bold", h3: "text-xl md:text-2xl font-bold" };
        const cls = cn("mb-6 text-slate-900", sizes[p.level] || sizes.h2, p.align === "center" && "text-center");
        if (p.level === "h1") return <h1 className={cls}>{p.title}</h1>;
        if (p.level === "h3") return <h3 className={cls}>{p.title}</h3>;
        return <h2 className={cls}>{p.title}</h2>;
      },
    },

    Text: {
      label: "📝 Текст",
      fields: {
        content: { type: "textarea", label: "Содержание" },
        variant: { type: "select", label: "Стиль", options: [{ label: "Обычный", value: "classic" }, { label: "Крупный", value: "lead" }, { label: "Мелкий", value: "small" }] },
        align: { type: "select", label: "Выравнивание", options: [{ label: "Слева", value: "left" }, { label: "По центру", value: "center" }] },
      },
      defaultProps: { content: "Текст", variant: "classic", align: "left" },
      render: (p: any) => {
        const v: Record<string, string> = { classic: "text-slate-600 text-lg leading-relaxed", lead: "text-slate-800 text-2xl font-light leading-relaxed", small: "text-slate-500 text-sm" };
        return <div className={cn("mb-6", v[p.variant] || v.classic, p.align === "center" && "text-center")}>{p.content}</div>;
      },
    },

    Button: {
      label: "🔘 Кнопка",
      fields: {
        text: { type: "text", label: "Текст" },
        variant: { type: "select", label: "Стиль", options: [
          { label: "Основная", value: "primary" }, { label: "Вторичная", value: "secondary" },
          { label: "Контур", value: "outline" }, { label: "Успех", value: "success" },
        ]},
        size: { type: "select", label: "Размер", options: [{ label: "Маленький", value: "sm" }, { label: "Средний", value: "md" }, { label: "Большой", value: "lg" }] },
      },
      defaultProps: { text: "Кнопка", variant: "primary", size: "md" },
      render: (p: any) => {
        const v: Record<string, string> = { primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg", secondary: "bg-slate-900 text-white", outline: "bg-transparent border-2 border-slate-200 text-slate-900", success: "bg-emerald-600 text-white" };
        const s: Record<string, string> = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-10 py-4 text-lg" };
        return <button className={cn("inline-flex items-center gap-2 font-bold rounded-xl transition-all", v[p.variant] || v.primary, s[p.size] || s.md)}>{p.text}<ArrowRight className="w-4 h-4" /></button>;
      },
    },

    Spacer: {
      label: "↕️ Отступ",
      fields: {
        height: { type: "select", label: "Высота", options: [
          { label: "Маленький (16px)", value: "sm" }, { label: "Средний (32px)", value: "md" },
          { label: "Большой (64px)", value: "lg" }, { label: "Огромный (96px)", value: "xl" },
        ]},
      },
      defaultProps: { height: "md" },
      render: (p: any) => {
        const h: Record<string, string> = { sm: "h-4", md: "h-8", lg: "h-16", xl: "h-24" };
        return <div className={h[p.height] || h.md} />;
      },
    },

    Divider: {
      label: "➖ Разделитель",
      fields: {
        style: { type: "select", label: "Стиль", options: [
          { label: "Линия", value: "line" }, { label: "Точки", value: "dots" }, { label: "Градиент", value: "gradient" },
        ]},
      },
      defaultProps: { style: "line" },
      render: (p: any) => {
        if (p.style === "dots") return <div className="py-8 flex justify-center gap-2">{[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-slate-300" />)}</div>;
        if (p.style === "gradient") return <div className="py-4"><div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" /></div>;
        return <div className="py-4"><hr className="border-slate-200" /></div>;
      },
    },
  },
};
