import { Model } from "@nozbe/watermelondb"

export type CategoryType = {
    id: string
    name: string
    parent_id: integer
} & Model
export type SpendType = {
    id: string
    desc: string
    cost: integer
    category_id: string
    created_at: string
    createdAt: Date
} & Model
