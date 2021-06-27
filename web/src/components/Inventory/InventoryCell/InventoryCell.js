import Inventory from 'src/components/Inventory/Inventory'

export const QUERY = gql`
  query FindInventoryById($id: Int!) {
    inventory: inventory(id: $id) {
      id
      name
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Inventory not found</div>

export const Success = ({ inventory }) => {
  return <Inventory inventory={inventory} />
}
