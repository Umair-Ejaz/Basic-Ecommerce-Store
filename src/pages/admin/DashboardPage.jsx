import React from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Dashboard from '../../components/admin/Dasboard'

const DashboardPage = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome Admin!</h2>
      <Dashboard />
    </AdminLayout>

  )
}

export default DashboardPage
