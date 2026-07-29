/* Game content: syllables and simple words for ages ~5 */
const SYLLABLES = [
  "МА", "МО", "МУ", "МЫ", "МЕ", "МИ",
  "ПА", "ПО", "ПУ", "ПЫ", "ПЕ", "ПИ",
  "БА", "БО", "БУ", "БЫ", "БЕ", "БИ",
  "ДА", "ДО", "ДУ", "ДЫ", "ДЕ", "ДИ",
  "ТА", "ТО", "ТУ", "ТЫ", "ТЕ", "ТИ",
  "НА", "НО", "НУ", "НЫ", "НЕ", "НИ",
  "ЛА", "ЛО", "ЛУ", "ЛЫ", "ЛЕ", "ЛИ",
  "СА", "СО", "СУ", "СЫ", "СЕ", "СИ",
  "КА", "КО", "КУ", "КЫ", "КЕ", "КИ",
  "РА", "РО", "РУ", "РЫ", "РЕ", "РИ",
  "ВА", "ВО", "ВУ", "ВЫ", "ВЕ", "ВИ",
  "ГА", "ГО", "ГУ", "ГЫ", "ГЕ", "ГИ",
  "ЗА", "ЗО", "ЗУ", "ЗЫ", "ЗЕ", "ЗИ",
  "ЖА", "ЖО", "ЖУ", "ЖИ",
  "ЧА", "ЧО", "ЧУ", "ЧИ",
  "ША", "ШО", "ШУ", "ШИ",
  "Я", "Ю", "Ё", "Е",
];

const WORDS = [
  { word: "МАМА", syllables: ["МА", "МА"], picture: "mama", say: "мама" },
  { word: "ПАПА", syllables: ["ПА", "ПА"], picture: "papa", say: "папа" },
  { word: "КОТ", syllables: ["КОТ"], picture: "kot", say: "кот" },
  { word: "ДОМ", syllables: ["ДОМ"], picture: "dom", say: "дом" },
  { word: "РЫБА", syllables: ["РЫ", "БА"], picture: "ryba", say: "рыба" },
  { word: "МЯЧ", syllables: ["МЯЧ"], picture: "myach", say: "мяч" },
  { word: "ЛУНА", syllables: ["ЛУ", "НА"], picture: "luna", say: "луна" },
  { word: "СОЛНЦЕ", syllables: ["СОЛНЦЕ"], picture: "solnce", say: "солнце" },
  { word: "ЛИСА", syllables: ["ЛИ", "СА"], picture: "fox", say: "лиса" },
  { word: "МАШИНА", syllables: ["МА", "ШИ", "НА"], picture: "mashina", say: "машина" },
  { word: "РОЗА", syllables: ["РО", "ЗА"], picture: "cvetok", say: "роза" },
  { word: "ДЕРЕВО", syllables: ["ДЕ", "РЕ", "ВО"], picture: "derevo", say: "дерево" },
  { word: "КНИГА", syllables: ["КНИ", "ГА"], picture: "kniga", say: "книга" },
  { word: "ВОДА", syllables: ["ВО", "ДА"], picture: "voda", say: "вода" },
  { word: "НОГА", syllables: ["НО", "ГА"], picture: "noga", say: "нога" },
  { word: "РУКА", syllables: ["РУ", "КА"], picture: "ruka", say: "рука" },
  { word: "ЛИЦО", syllables: ["ЛИ", "ЦО"], picture: "litso", say: "лицо" },
];

/* Open syllable pairs for listen / pop modes (easier for beginners) */
const EASY_SYLLABLES = [
  "МА", "МО", "МУ", "МЫ", "МЕ", "МИ",
  "ПА", "ПО", "ПУ", "ПИ",
  "БА", "БО", "БУ", "БИ",
  "ДА", "ДО", "ДУ", "ДИ",
  "ТА", "ТО", "ТУ", "ТИ",
  "НА", "НО", "НУ", "НИ",
  "ЛА", "ЛО", "ЛУ", "ЛИ",
  "СА", "СО", "СУ", "СИ",
  "КА", "КО", "КУ", "КИ",
  "РА", "РО", "РУ", "РИ",
  "ВА", "ВО", "ВИ",
  "ГА", "ГО", "ГУ",
  "ЗА", "ЗУ", "ЗИ",
  "ША", "ШУ", "ШИ",
  "ЧА", "ЧУ", "ЧИ",
];

const PRAISE = [
  "Молодец!",
  "Ура!",
  "Супер!",
  "Правильно!",
  "Здорово!",
  "Красавчик!",
  "Отлично!",
];

const ENCOURAGE = [
  "Попробуй ещё!",
  "Почти!",
  "Ещё разок!",
  "Ты сможешь!",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniqueDistractors(correct, pool, count) {
  const others = shuffle(pool.filter((s) => s !== correct));
  return others.slice(0, count);
}
