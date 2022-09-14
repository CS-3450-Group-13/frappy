*Requirments Definition*
*Group 13*

# Frappy's
**1. Introduction and Context**
Due to the recent explosion in popularity, Dan's Frappicino shop, *Frappy's* has been experiencing a massive increase in customers and orders. In addition to this, they've also needed to hire a large number of new employees to manage these orders, which their payment system is having trouble managing, and are constantly running out of inventory for their favorite products. Overall, this has slowed down Frappy's growth, and led to a decreased overall customer experience, with customers experiencing unreasonable wait times or being unable to purchase their favorite drinks. The goal of this project is to create a web-based application to solve these systems by allowing customers to place orders online, while also allowing managers to oversee staff and inventory. 

A customer will be able to create a custom order for their drink ahead of time, reducing the time needed for Frappy's to process their order as well as saving the Customer time by avoiding having them wait in line. Drinks will be choosable via a variety of customizable presets or be buildable from the ground up via a "create-your-own" option. The system will allow customers to pay via their registered account balance, reducing payment fees and encouraging customer spending via a prepurchased "gift card" system. Additionally, the account system will allow customer's and Frappy's to track order history. This should allow customers more convenient access to their favorite drinks, and give Frappy's a better ability to estimate inventory trends.

Baristas will be able to use the system to view a queue of available drinks, reducing downtime, and increasing productivity by allowing them to optimize the order of drink creation. This will also allow them to mark orders as complete, letting the customer know their order is done immediately. 

Cashiers will be able to use the system in order to place an order on behalf of a specific customer, drawing funds from the customer's balance. This should allow customers to order in-store if they forgot to order beforehand online.

Managers will have admin-level access to the system, allowing them to track and manage other users' accounts and balances. Using this functionality, they will be able to automatically pay employees at the end of the week with minimal difficulty. Managers will also be able to edit the drink menu as they see fit, allowing them to adapt to shortages and respond to customer demands. 

All employees should be able to log their hours worked. This will assist in the automated payment system, and reduce the overhead of using a ticket system. 


**2. Users and their Goals**
The users of this system can be divided into two main categories: customers and employees. Customers will use the system to place orders, and should only be able to interact with their own accounts. Employees, which can further be subdivided into cashiers, baristas, and managers, will use the system to process orders, track work time, manage payments, and manage inventory. Employee access to account information should be broader than customer's, following a principle of least privilege. Diagrams illustrating a selection of these tasks can be viewed in appendix A

## All Users
Functions available to all users of the web application include:
1. Account Creation
	* Default Option Presented to Users Who are Not Currently Signed In
	* Requires Unique Username
	* Requires Password
	* Password Should Pass Some Level of Minimum Security
2. Sign In
	* Default Option Presented to Users Who are Not Currently Signed In
	* Requires Username
	* Requires Matching Password

## Customers
Functions available to customers include:
1. Customize and Order Drinks
	* Several Modifiable Preset Options
	* "Build-Your-Own" Option
	* Paid for Using Account Balance
	* Drink Order Will Go Through if Drink Options are Valid and Account Contains Sufficient Balance
2. View Their Account Balance
	* Account Balance Will be Viewable Via a User Profile Button
	* An Add to Balance Button Will Allow Users to Top Off Their Balance Via Gift Cards
3. View Their Order History
	* Order History Will be Viewable Via a User Profile Button
	* Customers Will Have the Option to Create an Order Using a Past Order as a Preset


## All Employees

1. Log Hours Worked
	* Available Via a User Profile Button

## Cashiers
Functions Available to Cashiers Include:
1. Customize and Order Drinks on Behalf of a User
	* Option to Select from All Registered Users
	* Several Modifiable Preset Options
	* "Build-Your-Own" Option
	* Paid for Using Account Balance
	* Drink Order Will Go Through if Drink Options are Valid and Selected User Account Contains Sufficient Balance

## Baristas
Functions available to Baristas Include:
1. View Order Queue
	* Viewable Via a Unique Order Queue Button

2. Mark Orders as Completed
	* Via a Button in the Order Queue Screen

## Managers
Functions available to Managers Include:
1. View and Manage Other Accounts
	* Available Via an Admin Panel
	* Can Mark Accounts as Different Roles (Except for Manager)
	* Can Change Account Balances

2. View and Manage Inventory
	* Available Via an Admin Panel
	* Can Add to Current Inventory Stock
	* Can Add New Items to Inventory? 

3. Create New Drink Presets
	* Available Via an Admin Panel
	* Can Upload a Custom Image

4. Pay Employees
	* Available Via an Admin Panel
	* Automatically Transfers Balance from the Managers Account to Employees Accounts
	* Pays Employees Based on Hours Logged
	* Fails if Insufficient Funds are Available

**3. Functional Requirments**

**4. Non-functional Requirements**
There exist several non-functional requirements for this project as well, namely:
1. The system must use a database
	1. The database should store account information for users, managers, cashiers, and baristas, including the following fields:
		* Username
		* Password (*Encrypted*)
		* Account Balance
		* Order History 
	2. The database should store information on the store's current inventory, including the following fields:
		* Type
		* Quantity

2. The system should be deployable over the internet.
	1. Local hosting will also suffice. 

3. The system should use a version control system.
	1. Git has been selected for this purpose.

4. Development will follow a hybrid mixture of the Agile method and Spiral process.
	1. Each 2-week phase will be composed of several smaller tasks
		* Tasks will utilize a backlog and priority system
	2. Each phase will include risk analysis
	3. Any type of development can be done at any phase
	4. Each phase will end with a retrospective meeting

5. Deveopmers must meet frequently to discuss progress
	1. The SCRUM format will be used
	2. Stand Up's will be used
	3. SCRUM poker will be used

6. Developers must track progress of implementation via burndown charts.
	1. These will be updated at "daily" meetings.


**5. Future Features**

**6. Glossary**

**Appendix A**