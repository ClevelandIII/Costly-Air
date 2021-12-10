# Models (folder)

### Products (file)

 - name - String
   - Required
   - Unique

 - price - Number
   - Required

 - image - String
   - Required

### Cart (file)

 - name - String
   - Required
   - Unique

 - price - Number
   - Required

 - image - String
   - Required

 - quantity - Number

# Routes (folder)

### productsRoutes (file) - `/api/v1/products` 

- `/`
   - GET - getAllProducts
   - POST - createProduct

- `/uploads`
   - POST - uploadImage

### cartRoutes (file) - `/api/v1/cart`

 - `/`
   - POST - createItem
   - GET - getAllItems

- `/:id`
   - DELETE - removeItem
   - PATCH - updateItem

### buyRoutes (file) - `/api/v1/buy`

 - `/`
   - POST - buyCart

# Controller (folder)

### productsController (file)

 - createProduct
   - Creates a product with `req.body`

 - getAllProducts
   - Find all products

### imageUploadController (file)

 - uploadImage

   - Takes a file and creates an image on the local storage, returns a string of the path

### cartController (file)

 - createItem
   - Creates a item in the cart useing `req.body`

 - getAllItems
   -  Find all items in the cart

 - removeItem
   - Removes an item from the cart

 - updateItem
   - Updates the quantity of an item in the cart
  
### buyController (file)

 - buyCart
   - Buys everything in the cart with the chosen card
