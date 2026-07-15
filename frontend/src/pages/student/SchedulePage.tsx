import { useState } from 'react'
import { Calendar } from '../../components/schedule/Calendar'
import { Button } from '../../components/ui/Button'
import { Heading, Text } from '../../components/ui/Typography'
import { scheduleEvents } from '../../data/mockData'
import { X, CalendarDays, Clock } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import type { ScheduleEvent } from '../../types'
import { PageContainer } from '../../components/ui/PageContainer'

const badgeVariantMap = {
  orange: 'orange' as const,
  blue: 'blue' as const,
  purple: 'purple' as const,
  gray: 'gray' as const,
}

function EventModal({ event, onClose }: { event: ScheduleEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <Text size="base" color="primary" className="text-lg font-semibold">{event.title}</Text>
            <p className="mt-1 text-sm text-muted">
              <CalendarDays className="mr-1 inline h-4 w-4" />
              {event.date}
              <Clock className="ml-3 mr-1 inline h-4 w-4" />
              {event.time}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded p-1 text-muted hover:bg-border-light">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <Badge variant={badgeVariantMap[event.color]}>{event.type === 'homework' ? 'Домашнее задание' : event.type === 'exam' ? 'Экзамен' : 'Событие'}</Badge>
        </div>

        {event.description && (
          <div className="mb-4">
            <Text color="muted">{event.description}</Text>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Закрыть</Button>
        </div>
      </div>
    </div>
  )
}

export function SchedulePage() {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)

  return (
    <PageContainer>
      <Heading as="h1" className="mb-6">Расписание</Heading>
      <Calendar events={scheduleEvents} onEventClick={(event) => setSelectedEvent(event)} />

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </PageContainer>
  )
}
