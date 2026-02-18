/* eslint-disable @typescript-eslint/no-explicit-any */
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "./config";
import { db } from "./db";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";

export function PageEditor({ slug, onBack }: { slug: string; onBack: () => void }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pageId, setPageId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      const pages = await db.pages.toArray();
      const page = pages.find(p => p.name === slug);
      if (cancelled) return;
      if (page) {
        setData(page.data);
        setPageId(page.id ?? null);
      } else {
        // Create empty page with proper structure
        setData({
          content: [],
          root: { props: { seoTitle: "", seoDescription: "", seoKeywords: "", ogTitle: "", ogDescription: "", ogImage: "" } },
          zones: {},
        });
      }
      setLoading(false);
    }
    loadData();
    return () => { cancelled = true; };
  }, [slug]);

  const handleSave = useCallback(async (newData: any) => {
    try {
      if (pageId) {
        await db.pages.update(pageId, {
          data: newData,
          updatedAt: Date.now(),
        });
      } else {
        const id = await db.pages.add({
          name: slug,
          data: newData,
          updatedAt: Date.now(),
        });
        setPageId(id as number);
      }
      alert("✅ Страница сохранена!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Ошибка сохранения");
    }
  }, [pageId, slug]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const pageTitles: Record<string, string> = {
    wholesale: "Оптовые цены",
    showroom: "Шоурум",
    "designer-paper": "Дизайнерская бумага",
    "custom-cut": "Индивидуальная резка",
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="font-bold text-sm">{pageTitles[slug] || slug}</span>
            <span className="text-xs text-slate-500 ml-2">#{slug}</span>
          </div>
        </div>
        <span className="text-xs text-slate-500">Puck Editor • Нажмите &quot;Publish&quot; для сохранения</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <Puck
          config={config}
          data={data}
          onPublish={handleSave}
        />
      </div>
    </div>
  );
}
