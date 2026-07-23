export interface IFinanceEvent {
  type: 'FINANCE_UPDATED'
  payload?: Record<string, unknown>
}
