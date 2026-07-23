import { test, expect } from '@playwright/test'

test('dashboard loads and displays header', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})

test('dashboard shows summary card', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/saldo/i)).toBeVisible()
})

test('transactions page shows transaction list', async ({ page }) => {
  await page.goto('/transactions')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByText(/transaksi/i)).toBeVisible()
})

test('navigation between pages works', async ({ page }) => {
  await page.goto('/')
  await page.getByText(/transaksi/i).first().click()
  await expect(page).toHaveURL(/\/transactions/)
})
