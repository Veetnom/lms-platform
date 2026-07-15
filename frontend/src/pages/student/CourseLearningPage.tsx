import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BookOpen, Calendar, Target } from 'lucide-react'
import { HomeworkCard } from '../../components/homework/HomeworkCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading, Text } from '../../components/ui/Typography'
import { ProgressBar } from '../../components/ui/ProgressBar'
import {
  enrolledCourses,
  homeworkItems,
  homeworkTabItems,
  studentModuleLessonsByModuleId,
  studentModuleProgress,
} from '../../data/mockData'
import type { HomeworkTab } from '../../types'
import { PageContainer } from '../../components/ui/PageContainer'

export function CourseLearningPage() {
  const course = enrolledCourses[0]
  const [hwTab, setHwTab] = useState<HomeworkTab>('todo')
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null)

  return (
    <PageContainer>
      <div className="space-y-8">
      {/* Шапка курса */}
      <div>
        <Heading as="h1">{course.title}</Heading>
        <Text className="mt-2">{course.progress}% материалов пройдено</Text>
        <ProgressBar value={course.progress} className="mt-2 max-w-md" />
        <Text className="mt-2">
          {course.pointsEarned}/{course.pointsTotal} баллов получено
        </Text>
      </div>

      {course.currentTask && (
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Text size="base" color="primary" className="font-medium">«{course.currentTask}»</Text>
            <Link to="/my-courses/1/task/10">
              <Button variant="blue">Продолжить</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Домашние работы */}
      <section>
        <Heading as="h2" className="mb-4">Домашние работы</Heading>
        <div className="mb-4 flex flex-wrap gap-2">
          {homeworkTabItems.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setHwTab(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                hwTab === tab.value
                  ? 'bg-indigo-600 text-white'
                  : 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {homeworkItems.slice(0, 2).map((hw) => (
            <HomeworkCard
              key={hw.id}
              title={hw.title}
              daysLeft={hw.daysLeft}
              points={hw.points}
              maxPoints={hw.maxPoints}
              showSubject={false}
            />
          ))}
        </div>
      </section>

      {/* Модули курса */}
      <section>
        <Heading as="h2" className="mb-4">Программа курса</Heading>
        <div className="space-y-4">
          {studentModuleProgress.map((mod) => {
            const progressPct = mod.totalPoints > 0
              ? Math.round((mod.earnedPoints / mod.totalPoints) * 100)
              : 0
            const isExpanded = expandedModuleId === mod.id
            const lessons = studentModuleLessonsByModuleId[mod.id] ?? []

            return (
              <Card key={mod.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                  className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-border-light"
                >
                  {/* Номер модуля */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-sm">
                    {mod.id.slice(-1)}
                  </div>

                  {/* Информация */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-primary">{mod.title}</h3>
                      {mod.completed && (
                        <span className="shrink-0 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                          Завершён
                        </span>
                      )}
                    </div>

                    {/* Статистика */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {mod.lessonsCount} {mod.lessonsCount === 1 ? 'урок' : 'уроков'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Target className="h-3.5 w-3.5" />
                        Необходимо {mod.totalPoints} баллов
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {mod.startDate} – {mod.endDate}
                      </span>
                    </div>

                    {/* Прогресс */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-primary">
                          {mod.earnedPoints} / {mod.totalPoints} баллов
                        </span>
                        <span className="text-muted">{progressPct}%</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-border-light">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Стрелка */}
                  <div
                    className={`mt-4 shrink-0 text-muted transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Раскрывающийся список уроков */}
                {isExpanded && lessons.length > 0 && (
                  <div className="border-t border-border px-6 py-4">
                    <div className="space-y-2">
                      {lessons.map((lesson, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg bg-bg-base px-4 py-3 transition-colors hover:bg-border-light"
                        >
                          <div className="min-w-0 flex-1">
                            <Text className="font-medium">{lesson.title}</Text>
                            <Text className="text-xs">
                              {lesson.points} · {lesson.status}
                            </Text>
                          </div>
                          {lesson.taskId && (
                            <Link to={lesson.isPassed ? `/my-courses/1/task/${lesson.taskId}` : '#'}>
                              <Button variant={lesson.isPassed ? 'secondary' : 'blue'} size="sm">
                                {lesson.isPassed ? 'Ещё раз' : 'Выполнить'}
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </section>
    </div>
    </PageContainer>
  )
}
