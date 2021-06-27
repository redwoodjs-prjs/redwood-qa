import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import InventoryForm from 'src/components/Inventory/InventoryForm'

export const QUERY = gql`
  query FindInventoryById($id: Int!) {
    inventory: inventory(id: $id) {
      id
      name
      quantity
    }
  }
`
const UPDATE_INVENTORY_MUTATION = gql`
  mutation UpdateInventoryMutation($id: Int!, $input: UpdateInventoryInput!) {
    updateInventory(id: $id, input: $input) {
      id
      name
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ inventory }) => {
  const [updateInventory, { loading, error }] = useMutation(
    UPDATE_INVENTORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Inventory updated')
        navigate(routes.inventories())
      },
    }
  )

  const onSave = (input, id) => {
    updateInventory({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Inventory {inventory.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InventoryForm
          inventory={inventory}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
