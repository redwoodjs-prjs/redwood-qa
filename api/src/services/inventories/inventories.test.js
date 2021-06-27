import {
  inventories,
  inventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from './inventories'

describe('inventories', () => {
  scenario('returns all inventories', async (scenario) => {
    const result = await inventories()

    expect(result.length).toEqual(Object.keys(scenario.inventory).length)
  })

  scenario('returns a single inventory', async (scenario) => {
    const result = await inventory({ id: scenario.inventory.one.id })

    expect(result).toEqual(scenario.inventory.one)
  })

  scenario('creates a inventory', async () => {
    const result = await createInventory({
      input: { name: 'String', quantity: 5152198 },
    })

    expect(result.name).toEqual('String')
    expect(result.quantity).toEqual(5152198)
  })

  scenario('updates a inventory', async (scenario) => {
    const original = await inventory({ id: scenario.inventory.one.id })
    const result = await updateInventory({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a inventory', async (scenario) => {
    const original = await deleteInventory({ id: scenario.inventory.one.id })
    const result = await inventory({ id: original.id })

    expect(result).toEqual(null)
  })
})
