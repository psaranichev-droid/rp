import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

interface SiteFooterProps {
  onNavigate: (page: string) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">
              Подпишитесь на новостную рассылку
            </h3>
            <p className="text-slate-400 text-sm">
              Будьте в курсе новых поступлений, специальных предложений и акций
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-72"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Подписаться</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-black text-2xl tracking-tight mb-4">
              Onlook
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Надёжный партнёр для вашего бизнеса. Офсетная, мелованная и
              дизайнерская бумага оптом и в розницу.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-5 text-indigo-400 text-sm uppercase tracking-wider">
              Страницы
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("wholesale")}
                  className="hover:text-white transition-colors"
                >
                  Оптовые цены
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("showroom")}
                  className="hover:text-white transition-colors"
                >
                  Шоурум
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("designer-paper")}
                  className="hover:text-white transition-colors"
                >
                  Дизайнерская бумага
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("custom-cut")}
                  className="hover:text-white transition-colors"
                >
                  Индивидуальная резка
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-5 text-indigo-400 text-sm uppercase tracking-wider">
              Услуги
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Резка бумаги
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Упаковка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Доставка по РФ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Образцы бумаги
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-indigo-400 text-sm uppercase tracking-wider">
              Контакты
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <span>
                  г. Нижний Новгород, ул. Баумана, 48, корпус 1
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href="tel:+79101066003"
                  className="hover:text-white transition-colors"
                >
                  +7 (910) 106-60-03
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href="mailto:info@onlook.ru"
                  className="hover:text-white transition-colors"
                >
                  info@onlook.ru
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Пн–Пт: 9:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <div>© 2024 Onlook. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
