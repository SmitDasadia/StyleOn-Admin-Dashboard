import Product from "../models/Product"

export async function getProduct(req, res) {
    try {
        const products = await Product.find({})
        if (!products) {
            res.status(404).json({ error: "Product Not Founded." });
        }
        res.status(200).json({ products, res: "OK" });
    } catch (error) {
        res.status(404).json({ error: "Product Not Founded." });
    }
}


export async function addProduct(req, res) {
    try {
        const fromData = req.body;
        if (fromData) {
            const { title, slug, desc, img, category, color, size, price, avialableQty } = fromData;
            let u = new Product({
                title, slug, desc, img, category, color, size, price, avialableQty
            })

            await u.save()

            res.status(200).json({ product: "Product Added." });
        } else {
            res.status(400).json({ product: "Product Not Added." });
        }

    } catch (error) {
        res.status(404).json({ error: "Product Not Added." });
    }
}


export async function updateProduct(req, res) {
    try {
        const formData = req.body;
        const { productId } = req.query;

        if (formData && productId) {
            const { title, slug, desc, img, category, color, size, price, avialableQty } = formData;
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { title, slug, desc, img, category, color, size, price, avialableQty },
                { new: true }
            );
            if (updatedProduct) {
                res.status(200).json({ success: "Product Updated.", updatedProduct });
            } else {
                res.status(404).json({ error: "Product Not Found." });
            }
        } else {
            res.status(400).json({ error: "Product Not Updated. Request body or productId is missing." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred.", errorMessage: error.message });
    }
}











export async function deleteProduct(req, res) {
    try {
        
        const { productId } = req.query;

        if (productId) {
            
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (deletedProduct) {
                res.status(200).json({ success: "Product Deleted.", product: productId });
            } else {
                res.status(404).json({ error: "Product Not Deleted." });
            }
        } else {
            res.status(400).json({ error: "Product Not Deleted. Request body or productId is missing." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred.", errorMessage: error.message });
    }
}

