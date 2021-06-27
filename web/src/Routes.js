// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {  Set,  Router, Route } from '@redwoodjs/router'
import InventoriesLayout from 'src/layouts/InventoriesLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={InventoriesLayout}>
        <Route path="/inventories/new" page={InventoryNewInventoryPage} name="newInventory" />
        <Route path="/inventories/{id:Int}/edit" page={InventoryEditInventoryPage} name="editInventory" />
        <Route path="/inventories/{id:Int}" page={InventoryInventoryPage} name="inventory" />
        <Route path="/inventories" page={InventoryInventoriesPage} name="inventories" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
