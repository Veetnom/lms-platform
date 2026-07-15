import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { StudentSidebar } from './StudentSidebar'

export function StudentLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <StudentSidebar />
        <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
