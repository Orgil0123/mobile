import { Model } from "@nozbe/watermelondb"

export type CategoryType = {
    id: integer
    name: string
    parent_id: integer
} & Model
export type SpendType = {
    id: integer
    desc: string
    cost: integer
} & Model
