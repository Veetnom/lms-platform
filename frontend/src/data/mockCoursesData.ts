export interface TeacherCourseInfo {
  id: string
  title: string
  studentCount: number
}

export interface MethodistCourseInfo {
  id: string
  title: string
  studentCount: number
  status: 'published' | 'draft'
  price?: string
  shortDesc?: string
  fullDesc?: string
}

export interface CourseModule {
  id: string
  title: string
  lessonCount: number
}

export const teacherCourses: TeacherCourseInfo[] = [
  { id: '1', title: 'Русский язык', studentCount: 25 },
  { id: '2', title: 'Математика', studentCount: 18 },
]

export const methodistCourses: MethodistCourseInfo[] = [
  { id: '1', title: 'Русский язык', studentCount: 25, status: 'published' },
  { id: '2', title: 'Математика', studentCount: 18, status: 'published' },
  { id: '3', title: 'Химия', studentCount: 0, status: 'draft' },
]

export const courseModules: CourseModule[] = [
  { id: 'm1', title: 'Модуль 1. Орфография', lessonCount: 6 },
  { id: 'm2', title: 'Модуль 2. Пунктуация', lessonCount: 8 },
  { id: 'm3', title: 'Модуль 3. Морфология', lessonCount: 5 },
  { id: 'm4', title: 'Модуль 4. Сочинение', lessonCount: 4 },
]

/** Данные для страницы информации о курсе (MethodistCourseInfoPage) */
export interface CourseInfoData {
  title: string
  price: string
  shortDesc: string
  fullDesc: string
  isPublished: boolean
}

export const mockCourseInfo: CourseInfoData = {
  title: 'Русский язык',
  price: '24165',
  shortDesc: 'Основной курс 3.0 — это комплексная система подготовки к ЕГЭ по русскому языку на максимум!',
  fullDesc: 'Подробная программа курса включает в себя все разделы языкознания: орфографию, пунктуацию, лексику, грамматику. Каждый модуль содержит теоретические материалы и практические задания.',
  isPublished: true,
}

export const allStudents = [
  { id: '1', name: 'Александр', email: 'alex@mail.ru' },
  { id: '2', name: 'Елена', email: 'elena@mail.ru' },
  { id: '3', name: 'Дмитрий', email: 'dmitry@mail.ru' },
  { id: '4', name: 'Анна', email: 'anna@mail.ru' },
  { id: '5', name: 'Иван', email: 'ivan@mail.ru' },
  { id: '6', name: 'Ольга', email: 'olga@mail.ru' },
  { id: '7', name: 'Пётр', email: 'petr@mail.ru' },
]