export type TTransactionType = 'income' | 'expense'

export interface IMember {
  id: string
  name: string
  setor: number
  sisa: number
  avatar?: string
}

export interface IPocketData {
  id: string
  name: string
  total: number
  spent: number
  icon: string
}

export interface ITransaction {
  id: string
  type: TTransactionType
  desc: string
  amount: number
  time: string
  createdAt: string
  pocket: string
  dicatat: string
  image?: string
}

export interface ISummary {
  total: number
  income: number
  expense: number
}

export interface IDashboardData {
  summary: ISummary
  members: IMember[]
  pockets: IPocketData[]
  transactions: ITransaction[]
}
