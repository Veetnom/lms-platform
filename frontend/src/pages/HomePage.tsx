import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Heading, Text } from '../components/ui/Typography'

export function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <Card className="max-w-md text-center">
        <Heading as="h1">Онлайн-школа</Heading>
        <Text className="mt-2">Выберите раздел для просмотра</Text>
        <div className="mt-6 flex flex-col gap-3">
          <Link to="/store">
            <Button variant="purple" fullWidth>Ученик</Button>
          </Link>
          <Link to="/teacher/courses">
            <Button variant="dark" fullWidth>Преподаватель</Button>
          </Link>
          <Link to="/methodist/courses">
            <Button variant="blue" fullWidth>Методист</Button>
          </Link>
          <Link to="/curator/chat">
            <Button variant="green" fullWidth>Куратор</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
