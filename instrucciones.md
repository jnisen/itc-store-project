Take a previous "online-store" app that you created in previous exercises, or take another student store.
create a backend for the store
deploy the store
all data will be stored in the backend
the user will see all products
the user will search for a product
the user will click a product and see it on a "product page"
a user will have a login/register page

on the products page, each product can be updated or deleted and added, only by admin.

a public user will have a cart
only logged in user can add a product to cart, change the quantity, and delete from cart


Data Schema

Class User 
	email
	username
	password
	cart (si es user) // todos los productos que venden


Class Products
	id 
	name
	image
	price
	quantity (there is enough products?)


Class Cart
	id
	Array<Productos>



	
	
	