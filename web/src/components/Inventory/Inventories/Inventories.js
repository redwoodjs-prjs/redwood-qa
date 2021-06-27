import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Inventory/InventoriesCell'

const DELETE_INVENTORY_MUTATION = gql`
  mutation DeleteInventoryMutation($id: Int!) {
    deleteInventory(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const InventoriesList = ({ inventories }) => {
  const [deleteInventory] = useMutation(DELETE_INVENTORY_MUTATION, {
    onCompleted: () => {
      toast.success('Inventory deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete inventory ' + id + '?')) {
      deleteInventory({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td>{truncate(inventory.id)}</td>
              <td>{truncate(inventory.name)}</td>
              <td>{truncate(inventory.quantity)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.inventory({ id: inventory.id })}
                    title={'Show inventory ' + inventory.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInventory({ id: inventory.id })}
                    title={'Edit inventory ' + inventory.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete inventory ' + inventory.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(inventory.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoriesList
