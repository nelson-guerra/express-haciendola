/**
 * @openapi
 * /api/v1/users:
 *    post:
 *      tags:
 *        - Users
 *      summary: Register user
 *      requestBody:
 *        description: Information user required to register
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: demo
 *                email:
 *                  type: string
 *                  example: demo@gmail.com
 *                password:
 *                  type: string
 *                  example: 12345
 *      responses:
 *        200:
 *         description: Successful registration message
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Successfully register user
 *                  data:
 *                    type: object
 *        400:
 *          description: Invalid parameters
 *        409:
 *          description: The email already exists
 *        500:
 *          description: Server error
 * /api/v1/auth/login:
 *    post:
 *      tags:
 *        - Users
 *      summary: Login
 *      requestBody:
 *        description: Email and password required to authentication
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: demo@gmail.com
 *                password:
 *                  type: string
 *                  example: 12345
 *      responses:
 *        200:
 *         description: Returns access token and refresh token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Successful login
 *                  data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *                      refreshToken:
 *                        type: string
 *                        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *        400:
 *         description: Invalid parameters
 *        500:
 *         description: Server error
 * /api/v1/auth/refresh:
 *    post:
 *      tags:
 *        - Users
 *      summary: Get new access token
 *      requestBody:
 *        description: Refresh token is required to get a new access token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *      responses:
 *        200:
 *         description: Return new access token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: New Access token
 *                  data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *        400:
 *         description: Invalid parameters
 *        401:
 *         description: Invalid or expired token
 *        500:
 *         description: Error server
 */
