import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES } from '@/types/ticket'

interface TicketFiltersProps {
  filters: {
    status: string
    priority: string
    category: string
    assignedTo: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function TicketFilters({ filters, onFilterChange, onClearFilters }: TicketFiltersProps) {
  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                {TICKET_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center space-x-2">
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <Select
              value={filters.priority}
              onValueChange={(value) => onFilterChange('priority', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All priorities</SelectItem>
                {TICKET_PRIORITIES.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center space-x-2">
                      <Badge className={priority.color}>{priority.label}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select
              value={filters.category}
              onValueChange={(value) => onFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {TICKET_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Assigned To</label>
            <Select
              value={filters.assignedTo}
              onValueChange={(value) => onFilterChange('assignedTo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All assignees</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="me">Assigned to me</SelectItem>
                <SelectItem value="dev-team">Dev Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              {filters.status && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <span>Status: {TICKET_STATUSES.find(s => s.value === filters.status)?.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => onFilterChange('status', '')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.priority && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <span>Priority: {TICKET_PRIORITIES.find(p => p.value === filters.priority)?.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => onFilterChange('priority', '')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <span>Category: {filters.category}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => onFilterChange('category', '')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.assignedTo && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <span>Assigned: {filters.assignedTo}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => onFilterChange('assignedTo', '')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}