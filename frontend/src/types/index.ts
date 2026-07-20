export type CourseStatus = 'published' | 'draft'
export type AssignmentType = 'task' | 'homework'
export type HomeworkTab = 'todo' | 'submitted' | 'overdue'

export interface Course {
  id: string
  title: string
  price: number
  description: string
  subtitle: string
  highlights: string[]
  program: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  lessons?: string[]
  expanded?: boolean
}

export interface EnrolledCourse {
  id: string
  title: string
  progress: number
  pointsEarned: number
  pointsTotal: number
  currentTask?: string
}

export interface HomeworkItem {
  id: string
  title: string
  subject: string
  daysLeft: number
  points: number
  maxPoints: number
  deadline?: string
  status: CourseStatus
}

export interface CartItem {
  id: string
  title: string
  price: number
}

export interface ScheduleEvent {
  id: string
  date: string
  time: string
  title: string
  color: 'orange' | 'blue' | 'purple' | 'gray'
  type: 'homework' | 'exam' | 'event'
  description?: string
  completed?: boolean
}

export interface ChatMessage {
  id: string
  text: string
  time: string
  isOwn: boolean
}

export interface ChatThread {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  messages: ChatMessage[]
}

export interface Student {
  id: string
  name: string
  email: string
  progress: number
  points: number
  startedAt: string
}

export interface Curator {
  id: string
  name: string
  email: string
  checkedAnswers: number
  appointedAt: string
}

export interface TeacherAssignment {
  id: string
  title: string
  type: AssignmentType
  checked: number
  total: number
  points: number
}

export interface TeacherHomework {
  id: string
  title: string
  status: CourseStatus
  points: number
  openDate: string
  deadline: string
}

export interface LessonItem {
  id: string
  title: string
  points: number
}

export interface Task {
  id: number
  title: string
  points: number
  instruction: string
  content?: string
  type?: 'text' | 'essay'
}

export interface TeacherGroup {
  id: string
  title: string
  courseTitle: string
  students: StudentInGroup[]
}

export interface StudentInGroup {
  id: string
  name: string
  email: string
  progress: number
  points: number
}

/** Прогресс студента по модулю */
export interface StudentModuleProgress {
  id: string
  title: string
  lessonsCount: number
  totalPoints: number
  earnedPoints: number
  startDate: string
  endDate: string
  completed: boolean
}

/** Урок внутри модуля для студента */
export interface StudentModuleLesson {
  title: string
  points: string
  status: string
  taskId?: string
  isPassed: boolean
}

export interface HomeworkTabItem {
  value: HomeworkTab
  label: string
}

export interface AssignmentSubmission {
  studentId: string
  submittedAt: string
  status: 'checked' | 'pending'
  points?: number
  maxPoints?: number
}

/** Тип задания в редакторе уроков */
export type LessonTaskType = 'lecture' | 'assignment'

/** Вариант ответа в шаге задания */
export interface AnswerOption {
  id: string
  text: string
  isCorrect: boolean
}

/** Шаг задания (лекция или задание) */
export interface Step {
  id: number
  title: string
  content: string
  options: AnswerOption[]
  points: number
  answerType: 'single' | 'multiple' | 'text'
}

/** Задание в редакторе уроков */
export interface LessonTask {
  id: number
  title: string
  type: LessonTaskType
  steps: Step[]
}

/** Состояние формы модуля (создание/редактирование) */
export interface ModuleFormState {
  title: string
  startDate: string
  requiredPoints: number
}
