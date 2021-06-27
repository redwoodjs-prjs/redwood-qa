import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const inventories = () => {
  return db.inventory.findMany()
}

export const inventory = ({ id }) => {
  return db.inventory.findUnique({
    where: { id },
  })
}

export const createInventory = ({ input }) => {
  return db.inventory.create({
    data: input,
  })
}

export const updateInventory = ({ id, input }) => {
  return db.inventory.update({
    data: input,
    where: { id },
  })
}

export const deleteInventory = ({ id }) => {
  return db.inventory.delete({
    where: { id },
  })
}
