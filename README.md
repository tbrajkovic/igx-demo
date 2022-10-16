A product with the following model

Product {
	sku:string;
	name:string;
	brand:string;
	stockQty:number;
	available:boolean;
	description:{
		text:string;
		price:string;
		discount:number;
	}
}

Sku - is autocomplete input, after you type 2 characters you will doo a server request and will receive a list. The list will be displayed as a drop-down.
A SKU has the following model :  
Sku {
	sku:string;
	name:string;
	brand:string;
}

 - You have a grid where you display the Product List
 - It’s empty initially so you can select "New Product"
 - When you fill in the SKU, if exists, you need to populate the product fields with data(information) from the selected SKU
 - if you edit the stockQty field then available needs to be False
 - You can Add/Edit/Delete many rows from the grid - they will remain in transaction until you hit commit
 - there is a “SAVE” button which does the comit to the transaction