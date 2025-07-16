export interface Ticket {
  id: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed'
  userId: string
  userEmail: string
  userName: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  resolvedAt?: string
}

export interface TicketComment {
  id: string
  ticketId: string
  userId: string
  userName: string
  userEmail: string
  comment: string
  isInternal: boolean
  createdAt: string
}

export interface TicketAttachment {
  id: string
  ticketId: string
  filename: string
  fileUrl: string
  fileSize?: number
  uploadedBy: string
  createdAt: string
}

export const TICKET_CATEGORIES = [
  'Bug Report',
  'Feature Request',
  'Technical Support',
  'Account Issue',
  'Performance Issue',
  'Security Concern',
  'Other'
] as const

export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
] as const

export const TICKET_STATUSES = [
  { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-800' },
  { value: 'waiting', label: 'Waiting', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
] as const