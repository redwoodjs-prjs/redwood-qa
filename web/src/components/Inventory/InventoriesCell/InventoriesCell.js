import { Link, routes } from '@redwoodjs/router'

import Inventories from 'src/components/Inventory/Inventories'

export const QUERY = gql`
  query INVENTORIES {
    inventories {
      id
      name
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No inventories yet. '}
      <Link to={routes.newInventory()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ inventories }) => {
  return <Inventories inventories={inventories} />
}
