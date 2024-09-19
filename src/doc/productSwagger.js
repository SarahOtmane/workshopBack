/**
 * @swagger
 * tags:
 *   name: Product
 *   description: CRUD operations for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - name
 *         - attributes
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: the name of the product
 *         attributes:
 *           type: array
 *           description: array with all the attributes of the product
 *         price:
 *           type: number
 *           description: the price of the product
 */


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Person logged in successfully
 *       401:
 *         description: Incorrect email or password
 *       404:
 *         description: Person not found
 *       500:
 *         description: Internal server error
 */