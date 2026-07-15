import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { TeacherSidebar } from './TeacherSidebar'
import { PageContainer } from '../ui/PageContainer'

export function TeacherLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showCart={false} userName="АВ" />
      <div className="flex flex-1 flex-col lg:flex-row">
        <TeacherSidebar />
        <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </div>
  )
}
