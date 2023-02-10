import Product from "../models/Products";
import { ObjectId } from 'mongodb';


//*CREANDO UN NUEVO PRODUCTO
export const createProduct = async (req, res) => {
    try {
        const { name, category, price, imgURL } = req.body;
        const newProduct = new Product({ name, category, price, imgURL });
        const productSaved = await newProduct.save();

        console.log("mesaje de pueba para la rama feature");

        res.status(201).json({ message: 'Producto guardado', productSaved })

    } catch (error) {
        res.status(500).json({
            message: error.message || "ERROR no se pudo crear el producto"
        });
    }
};


//*LISTANDO LA DB
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message || "ERROR no se pudo listar los productos"
        });
    }
};


//*BUASCAR UN PRODUCTO POR ID
export const getProductById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.productId)) {
            res.json({ message: "ID NO VALIDO" })
        };

        const newId = await Product.findOne({ "_id": req.params.productId })
        if (!newId) {
            res.json({ message: "ID NO ENCONTRADO" })
        }

        const product = await Product.findById(req.params.productId)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message || "ERROR al obtener el producto"
        });
    }
};


//*ACTUALIZANDO UN PRODUCTO POR ID
export const updateProductById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.productId)) {
            res.json({ message: "ID NO VALIDO" })
        };

        const newId = await Product.findOne({ "_id": req.params.productId })
        if (!newId) {
            res.json({ message: "ID NO ENCONTRADO" })
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message || "Algo salio mal al actualizar el producto" });
    }
};


//*ELIMINANDO UN PRODUCTO POR ID
export const deleteProductById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.productId)) {
            res.json({ message: "ID NO VALIDO" })
        };

        const newId = await Product.findOne({ "_id": req.params.productId })
        if (!newId) {
            res.status(404).json({ message: "ID NO ENCONTRADO" })
        }

        const { productId } = req.params;
        await Product.findByIdAndDelete(productId)
        res.status(200).send({ message: "Producto eliminado" })
    } catch (error) {
        res.status(500).json({ message: error.message || "Algo salio mal al eliminar el producto" });
    }
};

export default { createProduct }