/**
 * @openapi
 * /api/v1/products:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Products
 *      summary: Register product
 *      requestBody:
 *        description: Information product required to register
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        200:
 *          description: Successful registration message
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Successfully created product
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                         type: string
 *                         example: 70d2f086-0358-450f-9802-62c33a068971
 *        400:
 *          description: Invalid parameters
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server error
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Products
 *      summary: Get all products
 *      responses:
 *        200:
 *          description: Return all products
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Successfully obtained products
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Product'
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Error server
 *
 * /api/v1/products/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Products
 *      summary: Update product by Id
 *      requestBody:
 *        description: Information product required to update
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        200:
 *          description: Successful registration message
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Successfully updated product
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                         type: string
 *                         example: 70d2f086-0358-450f-9802-62c33a068971
 *        400:
 *          description: Invalid parameters
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server error
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Products
 *      summary: Get product by Id
 *      responses:
 *        200:
 *          description: Return one product
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Successfully found product
 *                  data:
 *                    $ref: '#/components/schemas/Product'
 *        400:
 *          description: Invalid parameters
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Error server
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Products
 *      summary: Delete product
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Product successfully removed
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                         type: string
 *                         example: 70d2f086-0358-450f-9802-62c33a068971
 *        400:
 *          description: Invalid parameters
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server error
 */
