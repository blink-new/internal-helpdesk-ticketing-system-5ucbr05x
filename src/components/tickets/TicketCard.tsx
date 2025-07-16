import { formatDistanceToNow } from 'date-fns'
import { Clock, MessageCircle, Paperclip, User } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Ticket, TICKET_PRIORITIES, TICKET_STATUSES } from '@/types/ticket'

interface TicketCardProps {
  ticket: Ticket
  onClick: () => void
}

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const priorityConfig = TICKET_PRIORITIES.find(p => p.value === ticket.priority)
  const statusConfig = TICKET_STATUSES.find(s => s.value === ticket.status)

  const getUrgencyIndicator = () => {
    if (ticket.priority === 'critical') return 'border-l-4 border-red-500'
    if (ticket.priority === 'high') return 'border-l-4 border-orange-500'
    return ''
  }

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${getUrgencyIndicator()}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {ticket.title}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={statusConfig?.color}>
                {statusConfig?.label}
              </Badge>
              <Badge variant="outline" className={priorityConfig?.color}>
                {priorityConfig?.label}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {ticket.category}
              </Badge>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            #{ticket.id.slice(-6)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {ticket.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {ticket.userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-600">{ticket.userName}</span>
            </div>

            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MessageCircle className="h-3 w-3" />
              <span>0</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Paperclip className="h-3 w-3" />
              <span>0</span>
            </div>
          </div>
        </div>

        {ticket.assignedTo && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">
                Assigned to {ticket.assignedTo}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}