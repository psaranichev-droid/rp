/* eslint-disable @typescript-eslint/no-explicit-any */
import Dexie, { type Table } from 'dexie';

export interface PageData {
  id?: number;
  name: string;
  data: any;
  updatedAt: number;
}

export interface Product {
  id?: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  status: 'draft' | 'published';
  sku: string;
  stock: number;
  image: string;
  createdAt: number;
  updatedAt: number;
}

export interface MediaItem {
  id?: number;
  filename: string;
  alt: string;
  url: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: number;
}

export interface Category {
  id?: number;
  title: string;
  slug: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface UserRecord {
  id?: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive';
  createdAt: number;
  updatedAt: number;
}

export interface GlobalSetting {
  id?: number;
  key: string;
  value: any;
  updatedAt: number;
}

export class MyDatabase extends Dexie {
  pages!: Table<PageData>;
  products!: Table<Product>;
  media!: Table<MediaItem>;
  categories!: Table<Category>;
  users!: Table<UserRecord>;
  globals!: Table<GlobalSetting>;

  constructor() {
    super('puck-db');
    this.version(2).stores({
      pages: '++id, name, updatedAt',
      products: '++id, title, slug, category, status, createdAt, updatedAt',
      media: '++id, filename, mimeType, createdAt',
      categories: '++id, title, slug, createdAt',
      users: '++id, name, email, role, status, createdAt',
      globals: '++id, key, updatedAt',
    });
  }
}

export const db = new MyDatabase();

// Seed initial data for admin
export async function seedAdminData() {
  const seedKey = 'payload-admin-seed-v2';
  if (localStorage.getItem(seedKey)) return;

  // Seed categories
  const catCount = await db.categories.count();
  if (catCount === 0) {
    await db.categories.bulkAdd([
      { title: 'Офсетная бумага', slug: 'offset-paper', description: 'Универсальная бумага для полиграфии и офисной печати', createdAt: Date.now(), updatedAt: Date.now() },
      { title: 'Мелованная бумага', slug: 'coated-paper', description: 'Глянцевая и матовая бумага для премиум-печати', createdAt: Date.now(), updatedAt: Date.now() },
      { title: 'Мелованный картон', slug: 'coated-cardboard', description: 'Плотный картон для упаковки и полиграфии', createdAt: Date.now(), updatedAt: Date.now() },
      { title: 'Дизайнерская бумага', slug: 'designer-paper', description: 'Уникальные текстуры и цвета для творческих проектов', createdAt: Date.now(), updatedAt: Date.now() },
    ]);
  }

  // Seed products
  const prodCount = await db.products.count();
  if (prodCount === 0) {
    await db.products.bulkAdd([
      { title: 'Офсетная бумага Royal Paper A4 80г', slug: 'offset-a4-80', description: 'Универсальная офсетная бумага формата А4, плотность 80 г/м². Идеальна для повседневной печати.', price: 320, category: 'Офсетная бумага', status: 'published', sku: 'RP-A4-80', stock: 500, image: '', createdAt: Date.now() - 86400000 * 5, updatedAt: Date.now() },
      { title: 'Офсетная бумага Royal Paper A4 120г', slug: 'offset-a4-120', description: 'Плотная офсетная бумага формата А4, плотность 120 г/м². Для презентаций и важных документов.', price: 480, category: 'Офсетная бумага', status: 'published', sku: 'RP-A4-120', stock: 300, image: '', createdAt: Date.now() - 86400000 * 4, updatedAt: Date.now() },
      { title: 'Мелованная бумага глянцевая A4 130г', slug: 'coated-gloss-a4', description: 'Глянцевая мелованная бумага для высококачественной цветной печати.', price: 650, category: 'Мелованная бумага', status: 'published', sku: 'MC-GL-A4', stock: 200, image: '', createdAt: Date.now() - 86400000 * 3, updatedAt: Date.now() },
      { title: 'Мелованная бумага матовая A4 130г', slug: 'coated-matte-a4', description: 'Матовая мелованная бумага без бликов, идеальна для каталогов.', price: 680, category: 'Мелованная бумага', status: 'published', sku: 'MC-MT-A4', stock: 180, image: '', createdAt: Date.now() - 86400000 * 2, updatedAt: Date.now() },
      { title: 'Мелованный картон A4 250г', slug: 'cardboard-a4-250', description: 'Плотный мелованный картон для визиток и открыток.', price: 890, category: 'Мелованный картон', status: 'published', sku: 'MK-A4-250', stock: 150, image: '', createdAt: Date.now() - 86400000 * 1, updatedAt: Date.now() },
      { title: 'Knight Color — Красный', slug: 'knight-color-red', description: 'Тонированная в массе дизайнерская бумага глубокого красного тона.', price: 45, category: 'Дизайнерская бумага', status: 'published', sku: 'KC-RED', stock: 400, image: '', createdAt: Date.now(), updatedAt: Date.now() },
      { title: 'Galaxy Metallic — Золото', slug: 'galaxy-metallic-gold', description: 'Дизайнерская бумага с металлизированным покрытием золотого оттенка.', price: 65, category: 'Дизайнерская бумага', status: 'draft', sku: 'GM-GOLD', stock: 250, image: '', createdAt: Date.now(), updatedAt: Date.now() },
      { title: 'Rubber Like — Чёрный', slug: 'rubber-like-black', description: 'Матовая бумага с покрытием, напоминающим резину. Тактильный эффект.', price: 55, category: 'Дизайнерская бумага', status: 'draft', sku: 'RL-BLK', stock: 180, image: '', createdAt: Date.now(), updatedAt: Date.now() },
    ]);
  }

  // Seed users
  const userCount = await db.users.count();
  if (userCount === 0) {
    await db.users.bulkAdd([
      { name: 'Администратор', email: 'admin@onlook.ru', role: 'admin', status: 'active', createdAt: Date.now() - 86400000 * 30, updatedAt: Date.now() },
      { name: 'Менеджер контента', email: 'editor@onlook.ru', role: 'editor', status: 'active', createdAt: Date.now() - 86400000 * 15, updatedAt: Date.now() },
      { name: 'Иван Петров', email: 'ivan@example.com', role: 'user', status: 'active', createdAt: Date.now() - 86400000 * 7, updatedAt: Date.now() },
    ]);
  }

  // Seed media
  const mediaCount = await db.media.count();
  if (mediaCount === 0) {
    await db.media.bulkAdd([
      { filename: 'hero-banner.jpg', alt: 'Главный баннер', url: '', mimeType: 'image/jpeg', filesize: 245000, width: 1920, height: 1080, createdAt: Date.now() - 86400000 * 10 },
      { filename: 'showroom-photo.jpg', alt: 'Фото шоурума', url: '', mimeType: 'image/jpeg', filesize: 180000, width: 1200, height: 800, createdAt: Date.now() - 86400000 * 8 },
      { filename: 'paper-samples.png', alt: 'Образцы бумаги', url: '', mimeType: 'image/png', filesize: 320000, width: 1600, height: 900, createdAt: Date.now() - 86400000 * 5 },
      { filename: 'logo-onlook.svg', alt: 'Логотип Onlook', url: '', mimeType: 'image/svg+xml', filesize: 4500, width: 200, height: 60, createdAt: Date.now() - 86400000 * 3 },
    ]);
  }

  // Seed globals
  const globalsCount = await db.globals.count();
  if (globalsCount === 0) {
    await db.globals.bulkAdd([
      {
        key: 'site-settings',
        value: {
          siteName: 'Onlook',
          siteDescription: 'Бумага и картон оптом и в розницу',
          siteUrl: 'https://onlook.ru',
          contactEmail: 'info@onlook.ru',
          contactPhone: '+7 (910) 106-60-03',
          address: 'г. Нижний Новгород, ул. Баумана, 48, корпус 1',
          workingHours: 'Пн–Пт: 9:00 – 18:00',
          socialVk: '',
          socialTelegram: '',
          socialWhatsapp: '',
        },
        updatedAt: Date.now(),
      },
      {
        key: 'header-settings',
        value: {
          topBarText: 'Бесплатная доставка до транспортных компаний',
          showTopBar: true,
          logoText: 'Onlook',
          showSearch: true,
          showCart: true,
          showFavorites: true,
        },
        updatedAt: Date.now(),
      },
      {
        key: 'footer-settings',
        value: {
          showNewsletter: true,
          newsletterTitle: 'Подпишитесь на рассылку',
          copyrightText: '© 2024 Onlook. Все права защищены.',
          showSocialLinks: true,
        },
        updatedAt: Date.now(),
      },
    ]);
  }

  localStorage.setItem(seedKey, '1');
}
