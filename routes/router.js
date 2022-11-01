import { Route } from "npm:express";

const router = Route();

router.get("/find", getAllProducts()).get("/find/:id", getProductById(req.query.id));
router.post("/new", createProduct(req.body)).put("/update", updateProduct(req.body));
router.delete("/delete", deleteProduct(req.query.id));

export default router;
