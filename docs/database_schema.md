#Database Schema(Draft)

## Users
 -user_id(Primary Key)
 -name
 -email
 -password
 -role(Admin /Staff /customer)
## Plants
 -plant_id(Primary key)
 -name
 -category
 -price
 -quantity
 -description
## Orders
 -order_id(Primary key)
 -user_id(foreign key)
 -order_date
 -total_amount
 -status(Pending /Confirmed /Shipped /Delivered /Cancelled )
 
