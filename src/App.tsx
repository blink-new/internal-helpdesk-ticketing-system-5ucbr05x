import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { TicketForm } from '@/components/tickets/TicketForm'
import { TicketCard } from '@/components/tickets/TicketCard'
import { TicketFilters } from '@/components/tickets/TicketFilters'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { blink } from '@/blink/client'
import { Ticket } from '@/types/ticket'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

// Mock data for demonstration
const mockTickets: Ticket[] = [
    {
      id: 'ticket_001',
      title: 'Login page not loading properly',
      description: 'Users are experiencing issues when trying to access the login page. The page appears to be stuck on loading screen.',
      category: 'Bug Report',
      priority: 'high',
      status: 'open',
      userId: 'user_001',
      userEmail: 'john.doe@example.com',
      userName: 'John Doe',
      assignedTo: 'Dev Team',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ticket_002',
      title: 'Feature request: Dark mode support',
      description: 'It would be great to have a dark mode option for better user experience during night time usage.',
      category: 'Feature Request',
      priority: 'medium',
      status: 'in_progress',
      userId: 'user_002',
      userEmail: 'jane.smith@example.com',
      userName: 'Jane Smith',
      assignedTo: 'UI Team',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ticket_003',
      title: 'Critical: Database connection timeout',
      description: 'Production database is experiencing frequent connection timeouts causing service disruption.',
      category: 'Technical Support',
      priority: 'critical',
      status: 'open',
      userId: 'user_003',
      userEmail: 'admin@example.com',
      userName: 'System Admin',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
      id: 'ticket_004',
      title: 'Password reset email not received',
      description: 'User reported not receiving password reset emails. Checked spam folder as well.',
      category: 'Account Issue',
      priority: 'medium',
      status: 'resolved',
      userId: 'user_004',
      userEmail: 'support@example.com',
      userName: 'Support Team',
      assignedTo: 'Backend Team',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ticket_005',
      title: 'Performance issue on mobile devices',
      description: 'The application is running slowly on mobile devices, especially on older Android phones.',
      category: 'Performance Issue',
      priority: 'low',
      status: 'waiting',
      userId: 'user_005',
      userEmail: 'mobile.user@example.com',
      userName: 'Mobile User',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    assignedTo: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    // Load mock tickets for demonstration
    setTickets(mockTickets)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let filtered = tickets

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(ticket => ticket.status === filters.status)
    }
    if (filters.priority) {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority)
    }
    if (filters.category) {
      filtered = filtered.filter(ticket => ticket.category === filters.category)
    }
    if (filters.assignedTo) {
      if (filters.assignedTo === 'unassigned') {
        filtered = filtered.filter(ticket => !ticket.assignedTo)
      } else if (filters.assignedTo === 'me') {
        filtered = filtered.filter(ticket => ticket.assignedTo === user?.email)
      } else {
        filtered = filtered.filter(ticket => ticket.assignedTo === filters.assignedTo)
      }
    }

    setFilteredTickets(filtered)
  }, [tickets, searchQuery, filters, user])

  const handleSubmitTicket = async (ticketData: any) => {
    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: 'open',
      userId: user?.id || 'anonymous',
      userEmail: user?.email || 'anonymous@example.com',
      userName: user?.email?.split('@')[0] || 'Anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setTickets(prev => [newTicket, ...prev])
    toast({
      title: 'Ticket submitted successfully',
      description: `Ticket #${newTicket.id.slice(-6)} has been created.`
    })
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      assignedTo: ''
    })
  }

  const handleTicketClick = (ticket: Ticket) => {
    toast({
      title: 'Ticket Details',
      description: `Opening ticket #${ticket.id.slice(-6)}: ${ticket.title}`
    })
  }

  const getStats = () => {
    const total = tickets.length
    const open = tickets.filter(t => t.status === 'open').length
    const inProgress = tickets.filter(t => t.status === 'in_progress').length
    const resolved = tickets.filter(t => t.status === 'resolved').length
    
    return {
      total,
      open,
      inProgress,
      resolved,
      avgResponseTime: '2.5 hours'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Helpdesk</h1>
          <p className="text-gray-600 mb-6">Please sign in to access the ticketing system</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNewTicket={() => setShowTicketForm(true)}
        onSearch={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage and track your support tickets</p>
        </div>

        <StatsCards stats={getStats()} />

        <div className="space-y-6">
          <TicketFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Tickets ({filteredTickets.length})
            </h3>
            {searchQuery && (
              <p className="text-sm text-gray-600">
                Showing results for "{searchQuery}"
              </p>
            )}
          </div>

          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || Object.values(filters).some(Boolean)
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first ticket'
                }
              </p>
              {!searchQuery && !Object.values(filters).some(Boolean) && (
                <button
                  onClick={() => setShowTicketForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Create Ticket
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => handleTicketClick(ticket)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showTicketForm && (
        <TicketForm
          onClose={() => setShowTicketForm(false)}
          onSubmit={handleSubmitTicket}
        />
      )}

      <Toaster />
    </div>
  )
}

export default App