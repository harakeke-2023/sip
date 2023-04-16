export interface CardData {
  category_id: number
  user_id: number
  name: string
  description: string
  date_created: number
  period: number
  location: string
  completed: boolean
  total_count: number
  comp_count: number
}

export interface Card extends CardData {
  id: number
}

