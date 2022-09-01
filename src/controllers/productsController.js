// ************ Require's ************
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const storeProducts = (products) => {fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf-8')};
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult}=require('express-validator')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products', {
			products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product => product.id === +req.params.id)
		return res.render('detail', {
			product,
			toThousand
		})
	},
	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		const errors = validationResult(req);//Nos provee el método isEmpty() 
		if (errors.isEmpty()) {       //Condicional con isEmpty() para comprobar si hay errores
			const id = products[products.length - 1].id
			const { name, price, discount } = req.body
			const newProduct = {
				id: +id + 1,
				...req.body,
				name: name.trim(),
				price: +price,
				discount: +discount
			}
			const productModify = [...products, newProduct]
			storeProducts(productModify)
			return res.redirect('/')
		} else {
			return res.render('product-create-form', {//Envia errores a la vista en caso de que los haya para utilizar etiquetas EJS
				errors: errors.mapped(),//El metodo mapped(), guarda los errores como un objeto literal
				old: req.body //Los datos anteriores a ser enviados para evitar escribirlos nuevamente
			})
		}

	},

	// Update - Form to edit
	edit: (req, res) => {
		const productToEdit = products.find(product => product.id === +req.params.id)
		return res.render('product-edit-form', {
			productToEdit
		})
	},

	// Update - Method to update
	update: (req, res) => {
		const { name, price, discount, description, category } = req.body
		const { id } = req.params

		const productModify = products.map(product => {
			if (product.id === +id) {
				return {
					...product,
					name: name.trim(),
					price: +price,
					discount: +discount,
					category,
					description
				}
			}
			return product
		})
		storeProducts(productModify)
		return res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const productDelete = products.filter(product => product.id !== +req.params.id)
		storeProducts(productDelete)
		return res.redirect('/')
	}
};

module.exports = controller

