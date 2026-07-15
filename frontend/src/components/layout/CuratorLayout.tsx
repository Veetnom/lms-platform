import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { CuratorSidebar } from './CuratorSidebar'

export function CuratorLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showCart={false} userName="КР" />
      <div className="flex flex-1 flex-col lg:flex-row">
        <CuratorSidebar />
        <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
