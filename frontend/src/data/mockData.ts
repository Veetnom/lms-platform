import type {
  AssignmentSubmission,
  CartItem,
  ChatThread,
  Course,
  Curator,
  EnrolledCourse,
  HomeworkItem,
  HomeworkTabItem,
  LessonItem,
  ScheduleEvent,
  Student,
  StudentModuleLesson,
  StudentModuleProgress,
  Task,
  TeacherAssignment,
  TeacherGroup,
  TeacherHomework,
} from '../types'

export const storeCourses: Course[] = [
  {
    id: '1',
    title: 'Русский язык',
    price: 24165,
    subtitle:
      'Основной курс 3.0 — это комплексная система подготовки к ЕГЭ по русскому языку на максимум!',
    description:
      'Курс поможет вам систематизировать знания, отработать все типы заданий и научиться писать сочинение на высокий балл. Вы получите доступ к теории, практике и регулярной обратной связи от кураторов.',
    highlights: [
      'Интенсивный формат с еженедельными занятиями',
      'Теория через практику — от простого к сложному',
      'Домашние работы и пробные экзамены',
      'Дополнительные материалы: карточки, шпаргалки',
    ],
    program: [
      { id: '1', title: '1. Первая часть ЕГЭ', expanded: false },
      { id: '2', title: '2. Сочинение', expanded: false },
      {
        id: '3',
        title: '3. Повторение тем',
        expanded: true,
        lessons: ['Орфография', 'Пунктуация', 'Морфология'],
      },
    ],
  },
  {
    id: '2',
    title: 'Математика',
    price: 24165,
    subtitle: 'Подготовка к ЕГЭ по математике профильного уровня',
    description: 'Комплексная подготовка к ЕГЭ по математике.',
    highlights: ['Теория и практика', 'Регулярные проверки', 'Кураторская поддержка'],
    program: [
      { id: '1', title: '1. Алгебра', expanded: false },
      { id: '2', title: '2. Геометрия', expanded: false },
    ],
  },
  {
    id: '3',
    title: 'Химия',
    price: 24165,
    subtitle: 'Подготовка к ЕГЭ по химии',
    description: 'Комплексная подготовка к ЕГЭ по химии.',
    highlights: ['Теория и практика', 'Лабораторные задания'],
    program: [{ id: '1', title: '1. Органическая химия', expanded: false }],
  },
  {
    id: '4',
    title: 'Информатика',
    price: 24165,
    subtitle: 'Подготовка к ЕГЭ по информатике',
    description: 'Комплексная подготовка к ЕГЭ по информатике.',
    highlights: ['Программирование', 'Алгоритмы'],
    program: [{ id: '1', title: '1. Алгоритмы', expanded: false }],
  },
]

export const enrolledCourses: EnrolledCourse[] = [
  {
    id: '1',
    title: 'Русский язык',
    progress: 17,
    pointsEarned: 80,
    pointsTotal: 460,
    currentTask: 'Задание №10. Правописание приставок',
  },
  {
    id: '4',
    title: 'Информатика',
    progress: 70,
    pointsEarned: 430,
    pointsTotal: 630,
  },
]

export const homeworkItems: HomeworkItem[] = [
  {
    id: '1',
    title: '4. Орфоэпия',
    subject: 'Русский Язык',
    daysLeft: 5,
    points: 0,
    maxPoints: 10,
    status: 'published',
  },
  {
    id: '2',
    title: '15. Планометрия',
    subject: 'Математика',
    daysLeft: 7,
    points: 0,
    maxPoints: 10,
    status: 'published',
  },
  {
    id: '3',
    title: '12. Правописание Не и Ни',
    subject: 'Русский Язык',
    daysLeft: 7,
    points: 0,
    maxPoints: 10,
    status: 'published',
  },
  {
    id: '4',
    title: '13. Тригонометрия',
    subject: 'Математика',
    daysLeft: 10,
    points: 0,
    maxPoints: 10,
    status: 'published',
  },
  {
    id: '5',
    title: '13. Скайрим',
    subject: 'Математика',
    daysLeft: 10,
    points: 0,
    maxPoints: 10,
    status: 'published',
  },
]

export const cartItems: CartItem[] = [
  {
    id: 'history',
    title: 'История',
    price: 24165,
  },
  {
    id: 'russian',
    title: 'Русский язык',
    price: 24165,
  },
]

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    date: '2026-03-31',
    time: '10:00',
    title: 'Информатика - Алгебра лог...',
    color: 'gray',
    type: 'homework',
    description: 'Сдать домашнее задание по теме "Алгебра логики"',
    completed: true,
  },
  {
    id: '2',
    date: '2026-04-01',
    time: '14:00',
    title: 'Русский язык - Орфоэпия',
    color: 'orange',
    type: 'homework',
    description: 'Выучить орфоэпические нормы, выполнить упражнения',
  },
  {
    id: '3',
    date: '2026-04-01',
    time: '16:00',
    title: 'Математика - Планиметрия',
    color: 'blue',
    type: 'exam',
    description: 'Пробный экзамен по планиметрии',
  },
]

export const chatThreads: ChatThread[] = [
  {
    id: '1',
    name: 'Мария',
    avatar: 'М',
    lastMessage: 'Здравствуйте! Вы записались на курс...',
    time: '11:34',
    messages: [
      {
        id: '1',
        text: "Здравствуйте! Поздравляю вас, вы записались на курс 'Русский Язык'. Я ваш личный куратор, вы можете обращаться ко мне по всем вопросам",
        time: '11:32',
        isOwn: false,
      },
      {
        id: '2',
        text: 'Здравствуйте! Я очень рад, что записался на ваш курс.',
        time: '11:34',
        isOwn: true,
      },
    ],
  },
]

export const students: Student[] = [
  { id: '1', name: 'Александр', email: 'alex@mail.ru', progress: 70, points: 490, startedAt: '01.09.2025' },
  { id: '2', name: 'Елена', email: 'elena@mail.ru', progress: 70, points: 490, startedAt: '01.09.2025' },
  { id: '3', name: 'Дмитрий', email: 'dmitry@mail.ru', progress: 70, points: 490, startedAt: '01.09.2025' },
  { id: '4', name: 'Анна', email: 'anna@mail.ru', progress: 70, points: 490, startedAt: '01.09.2025' },
]

export const curators: Curator[] = [
  { id: '1', name: 'Мария', email: 'maria@school.ru', checkedAnswers: 45, appointedAt: '01.09.2025' },
  { id: '2', name: 'Анна', email: 'anna@school.ru', checkedAnswers: 32, appointedAt: '01.09.2025' },
]

export const teacherGroups: TeacherGroup[] = [
  {
    id: '1',
    title: 'Русский язык — группа А',
    courseTitle: 'Русский язык',
    students: [
      { id: '1', name: 'Александр', email: 'alex@mail.ru', progress: 70, points: 490 },
      { id: '2', name: 'Елена', email: 'elena@mail.ru', progress: 85, points: 520 },
      { id: '3', name: 'Дмитрий', email: 'dmitry@mail.ru', progress: 60, points: 380 },
    ],
  },
  {
    id: '2',
    title: 'Русский язык — группа Б',
    courseTitle: 'Русский язык',
    students: [
      { id: '4', name: 'Анна', email: 'anna@mail.ru', progress: 90, points: 590 },
      { id: '5', name: 'Иван', email: 'ivan@mail.ru', progress: 45, points: 290 },
    ],
  },
  {
    id: '3',
    title: 'Математика — группа А',
    courseTitle: 'Математика',
    students: [
      { id: '6', name: 'Ольга', email: 'olga@mail.ru', progress: 55, points: 340 },
      { id: '7', name: 'Пётр', email: 'petr@mail.ru', progress: 75, points: 470 },
    ],
  },
]

export const teacherHomework: TeacherHomework[] = [
  { id: '1', title: '4. Орфоэпия', status: 'published', points: 10, openDate: '01.12.2025', deadline: '17.12.2025' },
  { id: '2', title: '12. Правописание Не и Ни', status: 'published', points: 10, openDate: '01.12.2025', deadline: '17.12.2025' },
  { id: '3', title: '27. Сочинение', status: 'draft', points: 10, openDate: '01.12.2025', deadline: '17.12.2025' },
]

export const teacherAssignments: TeacherAssignment[] = [
  { id: '1', title: 'Задание 1. Орфоэпия', type: 'task', checked: 0, total: 120, points: 10 },
  { id: '2', title: 'Задание 1. Орфоэпия', type: 'homework', checked: 0, total: 120, points: 10 },
  { id: '3', title: 'Задание 1. Орфоэпия', type: 'task', checked: 0, total: 120, points: 10 },
]

export const moduleLessons: LessonItem[] = [
  { id: '1', title: 'Орфография', points: 40 },
  { id: '2', title: 'Морфология', points: 40 },
  { id: '3', title: 'Грамматика', points: 40 },
]

export const sampleTask: Task = {
  id: 1,
  title: 'Задание 1',
  points: 1,
  instruction:
    'Укажите предложения, в которых нужно поставить ОДНУ запятую. Запишите номера этих предложений',
  content: `1) Кто умолял меня о встрече и тем самым склонил к предательству интересов фирмы?
2) Сердце Курочкина скатилось под уклон «русских горок» и бешено забилось где-то в районе солнечного сплетения.
3) Мальчишки и девчонки нашего класса а также их родители приняли участие в школьном спектакле.
4) От домов во все стороны шли ряды деревьев или кустарников или цветов.
5) В России континентальный климат и здесь особенно суровая зима.`,
}

export const essayTask: Task = {
  id: 27,
  title: 'Задание 27. Сочинение',
  points: 5,
  type: 'essay',
  instruction: `Напишите сочинение-рассуждение по проблеме исходного текста «Как влияет на человека природа?»

Сформулируйте позицию автора (запишите одним предложением).
Сформулируйте и обоснуйте свое отношение к позиции автора (согласие или несогласие).
Приведите 2 аргумента из личного опыта или литературы.
Объём сочинения — не менее 150 слов.`,
  content:
    'Не хочу я писать сочинение!',
}

export const studentModuleProgress: StudentModuleProgress[] = [
  {
    id: 'm1',
    title: 'Модуль 1. Орфография',
    lessonsCount: 6,
    totalPoints: 120,
    earnedPoints: 80,
    startDate: '1 сен',
    endDate: '30 сен',
    completed: false,
  },
  {
    id: 'm2',
    title: 'Модуль 2. Пунктуация',
    lessonsCount: 8,
    totalPoints: 160,
    earnedPoints: 0,
    startDate: '1 окт',
    endDate: '31 окт',
    completed: false,
  },
  {
    id: 'm3',
    title: 'Модуль 3. Морфология',
    lessonsCount: 5,
    totalPoints: 100,
    earnedPoints: 0,
    startDate: '1 ноя',
    endDate: '30 ноя',
    completed: false,
  },
  {
    id: 'm4',
    title: 'Модуль 4. Сочинение',
    lessonsCount: 4,
    totalPoints: 80,
    earnedPoints: 0,
    startDate: '1 дек',
    endDate: '25 дек',
    completed: false,
  },
]

export const studentModuleLessonsByModuleId: Record<string, StudentModuleLesson[]> = {
  m1: [
    { title: 'Введение в орфографию', points: '30/30', status: 'Пройдено', taskId: '9', isPassed: true },
    { title: 'Задание №9. Правописание гласных', points: '30/30', status: 'Пройдено', taskId: '10', isPassed: true },
    { title: 'Задание №10. Правописание приставок', points: '0/20', status: 'Не пройдено', taskId: '11', isPassed: false },
    { title: 'Задание №11. Правописание суффиксов', points: '0/20', status: 'Не пройдено', taskId: '12', isPassed: false },
  ],
  m2: [],
  m3: [],
  m4: [],
}

export const homeworkTabItems: HomeworkTabItem[] = [
  { value: 'todo', label: 'Надо сдать' },
  { value: 'submitted', label: 'Сданы' },
  { value: 'overdue', label: 'Просрочены' },
]

export const assignmentSubmissions: Record<string, AssignmentSubmission[]> = {
  '1': [
    { studentId: '1', submittedAt: '12.04.2026', status: 'checked', points: 8, maxPoints: 10 },
    { studentId: '2', submittedAt: '11.04.2026', status: 'pending' },
    { studentId: '3', submittedAt: '10.04.2026', status: 'checked', points: 4, maxPoints: 5 },
  ],
  '2': [
    { studentId: '1', submittedAt: '12.04.2026', status: 'pending' },
    { studentId: '4', submittedAt: '11.04.2026', status: 'checked', points: 9, maxPoints: 10 },
  ],
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽'
}
