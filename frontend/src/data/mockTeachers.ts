export interface Person {
  id: string
  name: string
  email: string
}

export const methodistTeachers: (Person & { checkedAnswers: number })[] = [
  { id: '1', name: 'Аля Виноградова', email: 'alya@mail.ru', checkedAnswers: 42 },
  { id: '2', name: 'Иван Петров', email: 'ivan@mail.ru', checkedAnswers: 28 },
]

export const methodistCurators: Person[] = [
  { id: '3', name: 'Мария Смирнова', email: 'maria@mail.ru' },
  { id: '4', name: 'Анна Кураторова', email: 'anna@mail.ru' },
]

export const curatorTeachers: (Person & { role: string })[] = [
  { id: '1', name: 'Аля Виноградова', role: 'Преподаватель', email: 'alya@mail.ru' },
  { id: '2', name: 'Иван Петров', role: 'Преподаватель', email: 'ivan@mail.ru' },
]

/** Все доступные преподаватели для выбора при добавлении */
export const allTeachers: Person[] = [
  { id: '1', name: 'Аля Виноградова', email: 'alya@mail.ru' },
  { id: '2', name: 'Иван Петров', email: 'ivan@mail.ru' },
  { id: '5', name: 'Ольга Соколова', email: 'olga@mail.ru' },
  { id: '6', name: 'Дмитрий Козлов', email: 'dmitry@mail.ru' },
]

/** Все доступные кураторы для выбора при добавлении */
export const allCurators: Person[] = [
  { id: '3', name: 'Мария Смирнова', email: 'maria@mail.ru' },
  { id: '4', name: 'Анна Кураторова', email: 'anna@mail.ru' },
  { id: '7', name: 'Елена Васильева', email: 'elena@mail.ru' },
  { id: '8', name: 'Сергей Новиков', email: 'sergey@mail.ru' },
]