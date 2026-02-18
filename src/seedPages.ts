/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "./db";

// IMPORTANT: Every content item MUST have a unique `props.id` for Puck to work correctly.

const wholesaleData: any = {
  root: { props: { seoTitle: "Оптовые цены — Onlook", seoDescription: "Оптовые цены на офсетную и мелованную бумагу", seoKeywords: "бумага, картон, опт", ogTitle: "", ogDescription: "", ogImage: "" } },
  content: [
    {
      type: "HeroBanner",
      props: {
        id: "ws-hero-1",
        title: "Оптовые цены на офсетную и мелованную бумагу и картон",
        subtitle: "Понимаем, как важна для вас надежность, стабильность и универсальность материалов, чтобы успешно выполнять разнообразные заказы ваших клиентов, вне зависимости от используемого оборудования.",
        badge: "",
        ctaText: "Получить прайс",
        ctaSecondaryText: "Связаться с нами",
        variant: "indigo",
        align: "left",
      },
    },
    {
      type: "InfoCards",
      props: {
        id: "ws-info-1",
        sectionLabel: "О компании",
        title: "Это базовый минимум того, что нужно знать о нас",
        subtitle: "Надёжный партнёр для вашего бизнеса — доставка, оплата, индивидуальный подход",
        columns: "3",
        background: "slate",
        items: [
          { title: "Доставка", description: "Мы осуществляем перевозки через транспортные логистические компании, поэтому для нас нет границ. Доставку до транспортных компаний мы осуществляем бесплатно.", icon: "Truck", color: "blue" },
          { title: "Где мы находимся", description: "Мы располагаемся в Нижнем Новгороде по адресу: улица Баумана, 48, корпус 1. Всегда рады оказать аудиенцию в нашем комфортном шоуруме.", icon: "MapPin", color: "emerald" },
          { title: "Оплата", description: "Мы работаем с любыми категориями клиентов: юридическими и физическими лицами. По запросу отправим торговое предложение.", icon: "CreditCard", color: "purple" },
          { title: "Индивидуальный размер", description: "У нас собственное профессиональное оборудование для резки, поэтому мы можем изготовить материал практически любого размера, который вам нужен.", icon: "Scissors", color: "orange" },
          { title: "Образцы", description: "Если вы еще не убедились в качестве нашей продукции, предлагаем вам приобрести её в наших магазинах на маркетплейсах. Там вы найдете весь ассортимент.", icon: "Package", color: "pink" },
        ],
      },
    },
    {
      type: "PriceTable",
      props: {
        id: "ws-price-1",
        sectionLabel: "Прайс-лист",
        title: "Цены и атрибуты продукции",
        subtitle: "Актуальные оптовые цены на офсетную бумагу форматов А4 и А5",
        headersText: "Продукт|Формат|Плотность|Цена (от 10 пач.)|Цена (от 50 пач.)",
        rows: [
          { cells: "Офсетная бумага Royal Paper|A4|80 г/м²|320 ₽|290 ₽" },
          { cells: "Офсетная бумага Royal Paper|A4|120 г/м²|480 ₽|440 ₽" },
          { cells: "Офсетная бумага Royal Paper|A5|80 г/м²|180 ₽|160 ₽" },
          { cells: "Мелованная бумага (глянец)|A4|130 г/м²|650 ₽|590 ₽" },
          { cells: "Мелованная бумага (мат)|A4|130 г/м²|680 ₽|620 ₽" },
          { cells: "Мелованный картон|A4|250 г/м²|890 ₽|820 ₽" },
          { cells: "Мелованный картон|A4|300 г/м²|1050 ₽|960 ₽" },
        ],
        footnote: "Цены указаны за пачку (500 листов). Актуальны на 2024 г.",
      },
    },
    {
      type: "MarketplaceCards",
      props: {
        id: "ws-mp-1",
        sectionLabel: "Маркетплейсы",
        title: "Покупайте прямо сейчас на маркетплейсах",
        subtitle: "Понимаем, как важна для вас надежность, стабильность и универсальность материалов.",
        items: [
          { name: "Wildberries", description: "Весь ассортимент офсетной и мелованной бумаги", gradient: "from-purple-500 to-purple-700" },
          { name: "Ozon", description: "Дизайнерская бумага и картон с быстрой доставкой", gradient: "from-blue-500 to-blue-700" },
          { name: "Яндекс Маркет", description: "Выгодные цены и промокоды на первый заказ", gradient: "from-yellow-500 to-orange-500" },
        ],
      },
    },
    {
      type: "Newsletter",
      props: {
        id: "ws-nl-1",
        title: "Подпишитесь на новостную рассылку",
        subtitle: "Будьте в курсе новых поступлений, специальных предложений и акций. Получайте выгодные цены первыми — никакого спама.",
        buttonText: "Подписаться",
        variant: "indigo",
      },
    },
  ],
  zones: {},
};

const showroomData: any = {
  root: { props: { seoTitle: "Шоурум — Onlook", seoDescription: "Шоурум бумаги и картона в Нижнем Новгороде", seoKeywords: "шоурум, бумага", ogTitle: "", ogDescription: "", ogImage: "" } },
  content: [
    {
      type: "HeroBanner",
      props: {
        id: "sr-hero-1",
        title: "Шоурум бумаги и картона в Нижнем Новгороде",
        subtitle: "У нас вы можете выбрать дизайнерскую бумагу по образцам и каталогам, купить офсетную и мелованную бумагу Royal Paper, ознакомиться с ассортиментом картона, получить консультацию и оформить заказ.",
        badge: "",
        ctaText: "Записаться на визит",
        ctaSecondaryText: "Смотреть на карте",
        variant: "dark",
        align: "left",
      },
    },
    {
      type: "CategoryGrid",
      props: {
        id: "sr-cat-1",
        sectionLabel: "Ассортимент",
        title: "Категории товаров",
        subtitle: "Которые у нас можно посмотреть или купить в шоуруме",
        items: [
          { name: "Офсетная бумага", description: "Универсальная бумага для полиграфии и офиса", icon: "FileText", gradient: "from-blue-500 to-blue-600" },
          { name: "Мелованная бумага", description: "Глянцевая и матовая для премиум-печати", icon: "Sparkles", gradient: "from-emerald-500 to-emerald-600" },
          { name: "Мелованный картон", description: "Плотный картон для упаковки и полиграфии", icon: "Package", gradient: "from-amber-500 to-amber-600" },
          { name: "Дизайнерская бумага", description: "Уникальные текстуры и цвета для творчества", icon: "Palette", gradient: "from-purple-500 to-purple-600" },
        ],
      },
    },
    {
      type: "VisitorCards",
      props: {
        id: "sr-vis-1",
        sectionLabel: "Наши клиенты",
        title: "Кто в основном посещает наш шоурум",
        subtitle: "Мы работаем с самыми разными клиентами",
        items: [
          { title: "Полиграфисты", description: "У нас есть офсетная, мелованная и дизайнерская бумага. Если нужно, порежем сразу в нужный формат", icon: "Printer" },
          { title: "Дизайнеры", description: "Крутые проекты делаются только на дизайнерской бумаге — приходите, смотрите, вдохновляйтесь", icon: "Palette" },
          { title: "Творческие люди", description: "В нашем шоуруме есть в наличии бумага формата А4 и А3, которую можно приобрести поштучно, нет границ для творчества", icon: "Lightbulb" },
          { title: "Клиенты типографий", description: "Типографии не продают бумагу — они на ней печатают, так что перед тем, как искать типографию, выберите бумагу", icon: "Users" },
        ],
      },
    },
    {
      type: "FactList",
      props: {
        id: "sr-facts-1",
        sectionLabel: "Факты",
        title: "Несколько интересных фактов о шоуруме",
        items: [
          { text: "Более 500 видов бумаги: Дизайнерская, Офсетная, Меловая", icon: "FileText" },
          { text: "Оборудованное пространство для погружения в творческий процесс", icon: "Sparkles" },
          { text: "Помощь специалиста в подборе бумаги под ваши задачи", icon: "Users" },
          { text: "Всегда найдется парковочное место для размещения машины", icon: "Car" },
          { text: "Удобное местоположение в 10 мин. от станции метро Заречная", icon: "Train" },
          { text: "Можно отрезать небольшой фрагмент образца бумаги", icon: "Scissors" },
        ],
      },
    },
    {
      type: "ContactCTA",
      props: {
        id: "sr-contact-1",
        title: "Приезжайте к нам",
        subtitle: "Всегда рады оказать аудиенцию в нашем комфортном шоуруме",
        address: "г. Нижний Новгород, ул. Баумана, 48, корпус 1",
        phone: "+7 (910) 106-60-03",
        workingHours: "Пн–Пт: 9:00 – 18:00",
        ctaText: "Записаться на визит",
        ctaSecondaryText: "Позвонить",
        variant: "indigo",
      },
    },
    {
      type: "ReviewCards",
      props: {
        id: "sr-reviews-1",
        title: "Отзывы клиентов",
        items: [
          { name: "Анна М.", role: "Дизайнер", text: "Прекрасный шоурум! Огромный выбор дизайнерской бумаги. Менеджер помог подобрать идеальный вариант для моего проекта." },
          { name: "Виктор К.", role: "Владелец типографии", text: "Работаем с Onlook уже 2 года. Стабильное качество, оптовые цены, быстрая доставка. Рекомендую!" },
          { name: "Елена С.", role: "Художник", text: "Нашла здесь уникальные текстурные бумаги для своих работ. Очень приятная атмосфера в шоуруме." },
        ],
      },
    },
  ],
  zones: {},
};

const designerPaperData: any = {
  root: { props: { seoTitle: "Дизайнерская бумага — Onlook", seoDescription: "Ищете, где купить дизайнерскую бумагу?", seoKeywords: "дизайнерская бумага", ogTitle: "", ogDescription: "", ogImage: "" } },
  content: [
    {
      type: "HeroBanner",
      props: {
        id: "dp-hero-1",
        title: "Ищете, где купить дизайнерскую бумагу?",
        subtitle: "Мы создаём красивые и притягательные проекты. Разрабатываем сервис, который помогает людям развивать бизнес и совершенствовать рабочие процессы.",
        badge: "",
        ctaText: "Смотреть каталог",
        ctaSecondaryText: "Посетить шоурум",
        variant: "purple",
        align: "center",
      },
    },
    {
      type: "CollectionCards",
      props: {
        id: "dp-coll-1",
        sectionLabel: "Коллекции",
        title: "Коллекции дизайнерской бумаги",
        subtitle: "Выбирать дизайнерскую бумагу по картинке в интернете рискованно, потому что цвета на экране искажаются, текстура не видна, а итоговая печать способна разочаровать",
        items: [
          { name: "Knight Color", description: "Целлюлозные тонированные в массе художественные бумаги, глубоких, ярких тонов", colors: "bg-red-500,bg-blue-600,bg-emerald-500,bg-amber-500" },
          { name: "Rubber Like", description: "Коллекция бумаги с матовым покрытием, напоминающим резину", colors: "bg-slate-800,bg-slate-600,bg-slate-400,bg-slate-300" },
          { name: "Galaxy Metallic", description: "Окрашенная в массе дизайнерская бумага с металлизированным покрытием", colors: "bg-yellow-400,bg-gray-300,bg-orange-300,bg-rose-300" },
          { name: "Fiber Art", description: "Коллекция немелованных дизайнерских бумаг в натуральных природных оттенках", colors: "bg-amber-200,bg-lime-200,bg-stone-300,bg-amber-100" },
          { name: "Color Style Smooth", description: "Тонированные в массе дизайнерские бумаги и картоны насыщенного чёрного цвета", colors: "bg-black,bg-gray-900,bg-gray-800,bg-gray-700" },
          { name: "Knight Black", description: "Коллекция чистоцеллюлозной тонированной в массе, гладкой дизайнерской бумаги пастельных оттенков", colors: "bg-pink-200,bg-sky-200,bg-green-200,bg-yellow-200" },
        ],
      },
    },
    {
      type: "WarningBanner",
      props: {
        id: "dp-warn-1",
        title: "Важно знать!",
        text: "Выбирать дизайнерскую бумагу по картинке в интернете рискованно — цвета на экране искажаются, текстура не видна, а итоговая печать способна разочаровать. Рекомендуем посетить наш шоурум и оценить образцы лично.",
      },
    },
    {
      type: "TimelineSteps",
      props: {
        id: "dp-steps-1",
        sectionLabel: "Процесс",
        title: "Этапы работ",
        subtitle: "Расписали для Вас совершенно ясную и понятную структуру этапов работы",
        accentColor: "purple",
        items: [
          { title: "Определитесь с видами дизайнерской бумаги", description: "Для начала нужно изучить образцы и каталоги дизайнерской бумаги в нашем шоуруме, находящемся по адресу: Нижний Новгород, ул. Баумана, д. 48к1." },
          { title: "Проверка наличия остатков", description: "Мы используем специальную программу, чтобы проверить наличие бумаги на нашем складе и складах поставщиков." },
          { title: "Расчёт стоимости", description: "Уточняем все детали Вашего заказа: резка, упаковка, доставка, торговое предложение и в итоге озвучиваем Вам полную стоимость заказа." },
          { title: "Оформление заказа", description: "Если все условия Вас устраивают, то тогда на этом этапе Вы осуществляете оплату заказа тем путем, который мы ранее с Вами обсудили." },
          { title: "Ждём доставку бумаги от поставщика", description: "Срок доставки составляет от 1 дня до 4 недель. В любом случае вы будете знать заранее, когда бумага поступит от поставщика к нам." },
          { title: "Приёмка и осмотр бумаги", description: "Когда бумага пришла от поставщика, мы её тщательно осматриваем. Если есть повреждения, делаем фото/видео фиксацию." },
          { title: "Резка бумаги", description: "Осуществляем резку Вашей бумаги на нашем профессиональном оборудовании в нужные размеры." },
          { title: "Упаковка", description: "Упакуем готовую нарезанную бумагу в ту упаковку, которую мы согласовали на этапе Расчёт стоимости." },
          { title: "Доставка или Самовывоз", description: "Осуществляем доставку собственными силами или через транспортные/курьерские компании, также возможен самовывоз из шоурума." },
          { title: "Подписание документов", description: "Для юридических лиц выставляем УПД с НДС, для физических — высылаем электронный чек на почту или в мессенджер." },
        ],
      },
    },
    {
      type: "ContactCTA",
      props: {
        id: "dp-contact-1",
        title: "Готовы выбрать бумагу?",
        subtitle: "Приезжайте в наш шоурум или свяжитесь с нами для консультации",
        address: "г. Нижний Новгород, ул. Баумана, 48, корпус 1",
        phone: "+7 (910) 106-60-03",
        workingHours: "Пн–Пт: 9:00 – 18:00",
        ctaText: "Оставить заявку",
        ctaSecondaryText: "Позвонить",
        variant: "purple",
      },
    },
  ],
  zones: {},
};

const customCutData: any = {
  root: { props: { seoTitle: "Индивидуальная резка — Onlook", seoDescription: "Оказываем услугу по резке бумаги и картона", seoKeywords: "резка бумаги, формат", ogTitle: "", ogDescription: "", ogImage: "" } },
  content: [
    {
      type: "HeroBanner",
      props: {
        id: "cc-hero-1",
        title: "Оказываем услугу по резке бумаги и картона",
        subtitle: "Порежем бумагу в любой формат или размер на собственном профессиональном оборудовании. Точность до миллиметра и высокое качество края.",
        badge: "",
        ctaText: "Оставить заявку",
        ctaSecondaryText: "Узнать стоимость",
        variant: "emerald",
        align: "left",
      },
    },
    {
      type: "ServiceCards",
      props: {
        id: "cc-svc-1",
        sectionLabel: "Наши услуги",
        title: "Услуги резки",
        subtitle: "Подберём оптимальное решение под вашу задачу — от визиток и листовок до больших тиражей упаковки.",
        accentColor: "emerald",
        items: [
          { title: "Резка в любой формат", description: "Порежем под нужный размер: А3, А4, А5 и нестандартные форматы.", icon: "Scissors" },
          { title: "Пакетная резка тиражей", description: "Быстро обрабатываем большие объёмы без потери точности.", icon: "Layers" },
          { title: "Точная подрезка", description: "Аккуратные края, допуск до ±0.5 мм на профессиональном оборудовании.", icon: "Target" },
          { title: "Подготовка макета", description: "Поможем подготовить ТЗ и разметку под чистовой рез.", icon: "Settings" },
          { title: "Упаковка и маркировка", description: "Упакуем и промаркируем партии по вашим требованиям.", icon: "Package" },
          { title: "Логистика и доставка", description: "Доставим по городу или отправим ТК по РФ — оперативно и надёжно.", icon: "Truck" },
        ],
      },
    },
    {
      type: "TechSpecs",
      props: {
        id: "cc-tech-1",
        sectionLabel: "Оборудование",
        title: "Технические параметры",
        items: [
          { label: "Точность", value: "±0.5 мм", icon: "Target" },
          { label: "Плотность", value: "до 400 г/м²", icon: "Layers" },
          { label: "Форматы", value: "от A7 до SRA3", icon: "Ruler" },
          { label: "Ширина реза", value: "до 480 мм", icon: "Scissors" },
          { label: "Материалы", value: "бумага, картон", icon: "Package" },
          { label: "Скорость", value: "5000 резов/день", icon: "Zap" },
        ],
      },
    },
    {
      type: "TagCloud",
      props: {
        id: "cc-tags-1",
        sectionLabel: "Популярное",
        title: "Частые задачи",
        subtitle: "Мы ежедневно решаем повторяющиеся задачи для бизнеса и творчества.",
        tags: [{ label: "Визитки" }, { label: "Листовки" }, { label: "Открытки" }, { label: "Бирки" }, { label: "Меню" }, { label: "Постеры" }],
      },
    },
    {
      type: "ContactForm",
      props: {
        id: "cc-form-1",
        title: "Оставьте заявку",
        subtitle: "Наши специалисты свяжутся с вами в течение 30 минут для уточнения деталей и расчета стоимости.",
        successTitle: "Заявка принята!",
        successMessage: "Мы свяжемся с вами в ближайшее время.",
        feature1: "Быстрый расчет",
        feature2: "Любая сложность",
        feature3: "",
      },
    },
  ],
  zones: {},
};

export const PAGE_SLUGS: Record<string, string> = {
  wholesale: "Оптовые цены",
  showroom: "Шоурум",
  "designer-paper": "Дизайнерская бумага",
  "custom-cut": "Индивидуальная резка",
};

const PAGE_DATA: Record<string, any> = {
  wholesale: wholesaleData,
  showroom: showroomData,
  "designer-paper": designerPaperData,
  "custom-cut": customCutData,
};

// Seed version — increment this to force re-seed all pages
const SEED_VERSION = 4;

export async function seedPages() {
  // Check if we need to re-seed
  const versionKey = "puck-seed-version";
  const currentVersion = localStorage.getItem(versionKey);

  if (currentVersion !== String(SEED_VERSION)) {
    // Clear old data and re-seed
    console.log("Re-seeding pages (version changed)...");
    await db.pages.clear();
    localStorage.setItem(versionKey, String(SEED_VERSION));
  }

  const existingPages = await db.pages.toArray();

  for (const [slug] of Object.entries(PAGE_SLUGS)) {
    const exists = existingPages.find((p) => p.name === slug);
    if (!exists && PAGE_DATA[slug]) {
      await db.pages.add({
        name: slug,
        data: PAGE_DATA[slug],
        updatedAt: Date.now(),
      });
      console.log(`Seeded page: ${slug}`);
    }
  }
}