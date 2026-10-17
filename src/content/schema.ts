/**
 * Описывает редактируемые поля каждого блока контента для генератора форм
 * в админке. Поля, которых нет в схеме (например `to` у пунктов меню),
 * не показываются в форме, но и не теряются — BlockForm правит только
 * объявленные тут пути, остальное содержимое объекта проходит насквозь.
 */

export type LeafField =
  | { kind: "text"; label: string }
  | { kind: "textarea"; label: string }
  /** Многострочный текст с разметкой: \n — перенос, \n\n — абзац, {{...}} — акцент. */
  | { kind: "richtext"; label: string }
  | { kind: "image"; label: string };

export type ArrayField = {
  kind: "array";
  label: string;
  of: LeafField | ObjectSchema;
  itemLabel?: string;
  /** Запрещает добавлять/удалять/переставлять пункты — их число завязано на код (напр. внутренние ссылки). */
  fixedLength?: boolean;
};
export type ObjectField = { kind: "object"; label: string; fields: ObjectSchema };
export type Field = LeafField | ArrayField | ObjectField;
export type ObjectSchema = Record<string, Field>;

const text = (label: string): LeafField => ({ kind: "text", label });
const textarea = (label: string): LeafField => ({ kind: "textarea", label });
const richtext = (label: string): LeafField => ({ kind: "richtext", label });
const image = (label: string): LeafField => ({ kind: "image", label });
const array = (label: string, of: LeafField | ObjectSchema, itemLabel?: string): ArrayField => ({
  kind: "array",
  label,
  of,
  itemLabel,
});
const fixedArray = (label: string, of: LeafField | ObjectSchema): ArrayField => ({
  kind: "array",
  label,
  of,
  fixedLength: true,
});
const object = (label: string, fields: ObjectSchema): ObjectField => ({ kind: "object", label, fields });

const credItem: ObjectSchema = { title: text("Звание/роль"), note: text("Уточнение") };
const faqItem: ObjectSchema = { q: text("Вопрос"), a: textarea("Ответ") };
const weekItem: ObjectSchema = { title: text("Название недели"), note: text("Описание") };
const tierItem: ObjectSchema = { name: text("Название тарифа"), price: text("Цена") };

export const blockSchemas: Record<string, ObjectSchema> = {
  header: {
    leftNav: array("Левое меню", { label: text("Текст пункта") }),
    rightNav: array("Правое меню", { label: text("Текст пункта") }),
    contactLabel: text("Пункт «Контакты» (мобильное меню)"),
  },

  footer: {
    claim: text("Слоган под лого"),
    authorName: text("Имя автора (копирайт)"),
    contactLabel: text("Кнопка «Написать мне»"),
    columns: array("Колонки ссылок", {
      title: text("Заголовок колонки"),
      links: array("Ссылки", { label: text("Текст ссылки") }),
    }),
    social: array("Соцсети", { label: text("Название"), href: text("Ссылка") }),
  },

  "shared.effects": {
    items: array("Эффекты от практики (общий список — гл. страница и «Практики»)", text("Эффект")),
  },

  "home.hero": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Подзаголовок"),
    ctaPrimaryLabel: text("Кнопка 1"),
    ctaSecondaryLabel: text("Кнопка 2"),
    scrollLabel: text("Подпись «Листать»"),
  },

  "home.about": {
    portraitNote: text("Подпись-заглушка портрета"),
    portraitImage: image("Портрет"),
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    body: textarea("Текст"),
    creds: array("Регалии", credItem),
    ctaLabel: text("Кнопка"),
  },

  "home.attention": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    intro: textarea("Вступление"),
    effectsHeading: text("Заголовок списка эффектов"),
    effectsNote: text("Примечание под списком"),
    ctaLabel: text("Кнопка"),
    botEyebrow: text("Надпись над карточкой бота"),
    botTitle: text("Заголовок карточки бота"),
    botText: textarea("Текст карточки бота"),
    botList: array("Список в карточке бота", text("Пункт")),
    botCtaLabel: text("Кнопка бота"),
  },

  "home.quote": {
    text: richtext("Текст цитаты"),
    attribution: text("Подпись под цитатой"),
  },

  "home.sreda": {
    eyebrow: text("Надпись над заголовком"),
    title: text("Заголовок"),
    body: textarea("Текст"),
    ctaLabel: text("Кнопка"),
    coverImage: image("Обложка сообщества"),
    coverNote: text("Подпись-заглушка обложки"),
  },

  "home.finalCta": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
    ctaPrimaryLabel: text("Кнопка 1"),
    ctaSecondaryLabel: text("Кнопка 2"),
    formPlaceholder: text("Плейсхолдер поля email"),
    formSubmitLabel: text("Кнопка формы"),
    formSubmitDoneLabel: text("Кнопка формы после отправки"),
    hintDefault: text("Подсказка под формой"),
    hintSent: text("Подсказка после отправки"),
  },

  "home.paths": {
    eyebrow: text("Надпись над заголовком"),
    title: text("Заголовок"),
    lede: textarea("Текст"),
    items: fixedArray("Карточки (число завязано на ссылки в коде)", {
      title: text("Заголовок"),
      lede: textarea("Текст"),
      meta: text("Подпись снизу"),
    }),
  },

  "home.library": {
    eyebrow: text("Надпись над заголовком"),
    title: text("Заголовок"),
    lede: textarea("Текст"),
    ctaLabel: text("Кнопка"),
    items: fixedArray("Карточки материалов (число завязано на ссылки в коде)", {
      kind: text("Тип материала"),
      title: text("Заголовок"),
      meta: text("Подпись снизу"),
    }),
  },

  "home.shop": {
    eyebrow: text("Надпись над заголовком"),
    title: text("Заголовок"),
    lede: textarea("Текст"),
    linkLabel: text("Текст ссылки на карточке"),
    items: fixedArray("Карточки товаров (число завязано на ссылки в коде)", {
      title: text("Заголовок"),
      lede: textarea("Текст"),
      price: text("Цена"),
      status: text("Статус"),
    }),
  },

  "home.podcastsSection": {
    eyebrow: text("Надпись над заголовком"),
    title: text("Заголовок"),
    ledePrefix: textarea("Текст перед числом выпусков"),
    allEpisodesLabel: text("Кнопка «Все выпуски»"),
    podcastPageLabel: text("Кнопка «Страница подкаста»"),
  },

  "page.about": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Подзаголовок"),
    todo: array("Список «в работе»", text("Пункт")),
    portraitImage: image("Портрет"),
    portraitNote: text("Подпись-заглушка портрета"),
    positionEyebrow: text("Надпись над блоком «Позиция»"),
    positionTitle: text("Заголовок блока «Позиция»"),
    positionBody: richtext("Текст блока «Позиция» (можно несколько абзацев)"),
    fieldsEyebrow: text("Надпись над «Чем я занимаюсь»"),
    fieldsTitle: text("Заголовок «Чем я занимаюсь»"),
    fields: array("Сферы исследований", credItem),
  },

  "page.mentoring": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Подзаголовок"),
    todo: array("Список «в работе»", text("Пункт")),
    branches: array("Форматы работы", {
      status: text("Статус"),
      title: text("Заголовок"),
      lede: textarea("Текст"),
      price: text("Цена"),
    }),
    orderEyebrow: text("Надпись над блоком «О порядке работы»"),
    orderTitle: text("Заголовок блока"),
    orderBody: textarea("Текст блока"),
    orderQuote: textarea("Цитата в блоке"),
    orderCtaLabel: text("Кнопка"),
  },

  "page.practices": {
    hero: object("Шапка страницы", {
      eyebrow: text("Надпись над заголовком"),
      title: richtext("Заголовок"),
      lede: textarea("Подзаголовок"),
      ctaPrimaryLabel: text("Кнопка 1"),
      ctaSecondaryLabel: text("Кнопка 2"),
    }),
    groupPhotoImage: image("Фото группового занятия"),
    groupPhotoNote: text("Подпись-заглушка фото"),
    problem: object("Блок «Знакомо?»", {
      eyebrow: text("Надпись над заголовком"),
      title: richtext("Заголовок"),
      intro: textarea("Вступление"),
      symptoms: array("Симптомы", text("Пункт")),
    }),
    insight: object("Блок «Почему это происходит»", {
      eyebrow: text("Надпись над заголовком"),
      title: text("Заголовок"),
      body: richtext("Текст (можно несколько абзацев)"),
    }),
    quote: object("Цитата в середине страницы", { text: richtext("Текст цитаты") }),
    solution: object("Блок «Решение»", {
      eyebrow: text("Надпись над заголовком"),
      title: text("Заголовок"),
      body: richtext("Текст (можно несколько абзацев)"),
    }),
    resultsEyebrow: text("Надпись над списком эффектов"),
    resultsTitle: text("Заголовок списка эффектов"),
    audience: object("Блок «Кому подходит»", {
      eyebrow: text("Надпись над заголовком"),
      title: text("Заголовок"),
      intro: textarea("Вступление"),
      items: array("Карточки аудитории", { who: text("Кому"), why: text("Зачем") }),
    }),
    program: object("Программа по неделям", {
      eyebrow: text("Надпись над заголовком"),
      title: richtext("Заголовок"),
      weeks: array("Недели", weekItem),
    }),
    formats: object("Форматы и цены", {
      eyebrow: text("Надпись над заголовком"),
      title: text("Заголовок"),
      intro: textarea("Вступление"),
      ctaLabel: text("Кнопка на карточке"),
      items: array("Карточки форматов", {
        status: text("Статус"),
        title: text("Заголовок"),
        lede: textarea("Текст"),
        tiers: array("Тарифы", tierItem),
      }),
    }),
    author: object("Блок «Автор и ведущий»", {
      photoImage: image("Фото автора"),
      photoNote: text("Подпись-заглушка фото"),
      eyebrow: text("Надпись над заголовком"),
      title: text("Заголовок (имя)"),
      creds: array("Регалии", credItem),
      quote: textarea("Цитата автора"),
    }),
    faqEyebrow: text("Надпись над FAQ"),
    faqTitle: text("Заголовок FAQ"),
    faq: array("Вопросы и ответы", faqItem),
    finalCta: object("Финальный призыв", {
      title: richtext("Заголовок"),
      lede: textarea("Текст"),
      ctaPrimaryLabel: text("Кнопка 1"),
      ctaSecondaryLabel: text("Кнопка 2"),
    }),
  },

  "page.podcasts": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    description: textarea("Описание подкаста"),
    latestBadge: text("Значок «Свежий выпуск»"),
    archiveEyebrow: text("Надпись над архивом"),
    archiveTitle: text("Заголовок архива"),
    loadMoreLabel: text("Кнопка «Показать ещё»"),
    platformsEyebrow: text("Надпись над платформами"),
    platformsTitle: text("Заголовок платформ"),
    platformsLede: textarea("Текст про платформы"),
    suggestTopicLabel: text("Кнопка «Предложить тему»"),
    platforms: array("Площадки", { label: text("Название"), href: text("Ссылка") }),
  },

  "page.contact": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Подзаголовок"),
    nameLabel: text("Подпись поля «Имя»"),
    contactLabel: text("Подпись поля «Контакт»"),
    messageLabel: text("Подпись поля «Сообщение»"),
    consentLabel: text("Текст согласия на обработку ПД"),
    submitLabel: text("Кнопка отправки"),
    submitDoneLabel: text("Кнопка после отправки"),
    successMessage: text("Сообщение после отправки"),
    sideTitle: text("Заголовок «Или напрямую»"),
    sideNote: text("Примечание внизу"),
    channels: array("Каналы связи", { label: text("Название"), value: text("Значение"), href: text("Ссылка") }),
  },

  "page.simple.library": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
    todo: array("Список «в работе»", text("Пункт")),
  },
  "page.simple.blog": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
    todo: array("Список «в работе»", text("Пункт")),
  },
  "page.simple.products": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
    todo: array("Список «в работе»", text("Пункт")),
  },
  "page.simple.freePractices": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
    todo: array("Список «в работе»", text("Пункт")),
  },
  "page.simple.account": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
    todo: array("Список «в работе»", text("Пункт")),
  },
  "page.simple.notFound": {
    eyebrow: text("Надпись над заголовком"),
    title: richtext("Заголовок"),
    lede: textarea("Текст"),
  },
  "page.simple.legal": {
    sharedLede: textarea("Общий текст для документов"),
    sharedTodo: array("Список «в работе» (общий)", text("Пункт")),
    offer: object("Публичная оферта", { eyebrow: text("Надпись"), title: text("Заголовок") }),
    privacy: object("Политика конфиденциальности", { eyebrow: text("Надпись"), title: text("Заголовок") }),
    consent: object("Согласие на обработку ПД", { eyebrow: text("Надпись"), title: text("Заголовок") }),
  },

  "page.genericInProgress": {
    eyebrow: text("Надпись"),
    title: text("Заголовок"),
    intro: textarea("Текст"),
    ctaLabel: text("Кнопка"),
    placeholderLabel: text("Подпись-заглушка иллюстрации"),
    placeholderImage: image("Иллюстрация (общая для всех незаполненных разделов)"),
  },
};

export type BlockGroup = { title: string; blocks: { key: string; label: string }[] };

export const blockGroups: BlockGroup[] = [
  {
    title: "Общее",
    blocks: [
      { key: "header", label: "Шапка сайта" },
      { key: "footer", label: "Подвал сайта" },
      { key: "shared.effects", label: "Эффекты от практики (общий список)" },
    ],
  },
  {
    title: "Главная",
    blocks: [
      { key: "home.hero", label: "Обложка (Hero)" },
      { key: "home.about", label: "Обо мне" },
      { key: "home.attention", label: "Практики на внимание" },
      { key: "home.quote", label: "Цитата" },
      { key: "home.sreda", label: "Среда (сообщество)" },
      { key: "home.paths", label: "Три двери" },
      { key: "home.library", label: "Библиотека знаний" },
      { key: "home.shop", label: "Магазин" },
      { key: "home.podcastsSection", label: "Подкаст (блок)" },
      { key: "home.finalCta", label: "Финальный призыв" },
    ],
  },
  {
    title: "Страница «Обо мне»",
    blocks: [{ key: "page.about", label: "Обо мне" }],
  },
  {
    title: "Страница «Наставничество»",
    blocks: [{ key: "page.mentoring", label: "Наставничество" }],
  },
  {
    title: "Страница «Практики»",
    blocks: [{ key: "page.practices", label: "Практики на внимание" }],
  },
  {
    title: "Страница «Подкасты»",
    blocks: [{ key: "page.podcasts", label: "Подкасты" }],
  },
  {
    title: "Страница «Контакты»",
    blocks: [{ key: "page.contact", label: "Контакты" }],
  },
  {
    title: "Страницы-заглушки",
    blocks: [
      { key: "page.simple.library", label: "Библиотека" },
      { key: "page.simple.blog", label: "Блог" },
      { key: "page.simple.products", label: "Магазин" },
      { key: "page.simple.freePractices", label: "Бесплатные практики" },
      { key: "page.simple.account", label: "Личный кабинет" },
      { key: "page.simple.notFound", label: "Страница 404" },
      { key: "page.simple.legal", label: "Документы" },
      { key: "page.genericInProgress", label: "Общий текст «раздел наполняется»" },
    ],
  },
];
