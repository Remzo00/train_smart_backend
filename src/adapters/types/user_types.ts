/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignInParams:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the user trying to sign in.
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: The password of the user trying to sign in.
 *           example: password123
 *       required:
 *         - email
 *         - password
 */
export interface UserSignInParams {
    email: string;
    password: string;
  }
  /**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserParams:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The full name of the user.
 *           example: John 
 *         surname:
 *           type: string
 *           description: The surname of the user.
 *           example: Doe
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: The password for the user account.
 *           example: password123
 *         weight:
 *           type: number
 *           description: The weight of the user.
 *           example: 70
 *         gender:
 *           type: string
 *           description: The gender of the user.
 *           example: male
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - weight
 *         - gender
 */
  export interface CreateUserParams {
    name: string;
    surname: string;
    email: string;
    password: string;
    weight: number;
    gender: string;
  }

  /**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserParams:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The full name of the user.
 *           example: Jane 
 *         surname:
 *           type: string
 *           description: The surname of the user.
 *           example: Doe
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: johndoe@example.com
 *         weight:
 *           type: number
 *           description: The weight of the user.
 *           example: 70
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - weight
 */

  export interface UpdateUserParams {
    name?: string;
    surname?: string;
    email?: string;
    weight?: number;
    gender?: string;
  }