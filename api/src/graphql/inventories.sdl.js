export const schema = gql`
  type Inventory {
    id: Int!
    name: String!
    quantity: Int!
  }

  type Query {
    inventories: [Inventory!]!
    inventory(id: Int!): Inventory
  }

  input CreateInventoryInput {
    name: String!
    quantity: Int!
  }

  input UpdateInventoryInput {
    name: String
    quantity: Int
  }

  type Mutation {
    createInventory(input: CreateInventoryInput!): Inventory!
    updateInventory(id: Int!, input: UpdateInventoryInput!): Inventory!
    deleteInventory(id: Int!): Inventory!
  }
`
