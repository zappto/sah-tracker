export type TTransactionType = 'income' | 'expense'

export interface IMember {
  name: string
  setor: number
  sisa: number
  avatar?: string
}

export interface IPocketData {
  name: string
  total: number
  spent: number
  icon: string
}

export interface ITransaction {
  type: TTransactionType
  desc: string
  amount: number
  time: string
  createdAt: string
  pocket: string
  dicatat: string
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
