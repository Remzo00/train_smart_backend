// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     UserSignInParams:
//  *       type: object
//  *       properties:
//  *         email:
//  *           type: string
//  *           description: The email address of the user trying to sign in.
//  *           example: johndoe@example.com
//  *         password:
//  *           type: string
//  *           description: The password of the user trying to sign in.
//  *           example: password123
//  *       required:
//  *         - email
//  *         - password
//  */
export interface UserSignInParams {
    email: string;
    password: string;
  }
  // /**
  //  * @swagger
  //  * components:
  //  *   schemas:
  //  *     CreateUserParams:
  //  *       type: object
  //  *       properties:
  //  *         fullName:
  //  *           type: string
  //  *           description: The full name of the user.
  //  *           example: John Doe
  //  *         email:
  //  *           type: string
  //  *           description: The email address of the user.
  //  *           example: johndoe@example.com
  //  *         password:
  //  *           type: string
  //  *           description: The password for the user account.
  //  *           example: password123
  //  *         weight:
  //  *           type: number
  //  *           description: The weight of the user in kilograms.
  //  *           example: 70
  //  *         gender:
  //  *           type: string
  //  *           description: The gender of the user.
  //  *           example: male
  //  *       required:
  //  *         - fullName
  //  *         - email
  //  *         - password
  //  */
  export interface CreateUserParams {
    name: string;
    surname: string;
    email: string;
    password: string;
    weight: number;
    gender: string;
  }