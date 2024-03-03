<p align="center">
    <img src="https://i.ibb.co/wWCBkNR/saurus.png" alt="saurus" style="width: 200px; height: 200px;" border="0">
</p>


# storesaurusDB

<p>
  The backend for the Storesaurus project is designed to streamline your experience. By registering, you gain access to a platform where you can upload your .csv files and avail yourself of comprehensive analyses. Our system, as robust as a dinosaur, will identify any gaps and verify the accuracy of your data's "DNA". 
</p>

## Table of Contents 

- [About](#about)
- [Stack](#stack)
- [Features](#features-)
- [Installation](#installation-)
- [Development](#development)
- [API Endpoints](#api-endpoints-)
- [Author](#author)

## About

This project is a backend application currently in the early stages of development, designed with a strong focus on domain logic. This is effectively demonstrated through the encapsulation of functionality within services and entities, such as the FileAnalysisService, and the implementation of domain-specific types like csvAnalysis, illustrating the application of Domain-Driven Design (DDD) principles.

Leveraging TypeScript in strict mode, the application integrates seamlessly with Express and Node.js to directly utilize the MongoDB driver. This approach eschews the use of an Object Document Mapper (ODM) like Mongoose, thereby optimizing performance.

User authentication is managed through a combination of Valibot for validation, JWT for token management, and bcrypt for password hashing, ensuring secure and efficient user authentication.

For file management and analysis, the application utilizes GridFS for storage, Multer for file upload handling, and Papaparse for CSV parsing, offering robust solutions for handling large files and complex data processing.

Error management across the application is meticulously handled by restify-errors, ensuring consistent and clear error handling practices.


## Stack 

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"><img src="https://img.shields.io/badge/-Nodejs-43853d?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white">

## Features

Current version 0.4

- **User Authentication:** Both registration and login processes are secure and thoroughly validated. 

- **File Upload:** The ability to upload large .csv files through a controlled, error-proof process.

- **File Analysis:** Choose a file you've uploaded to our database and explore it to obtain a diagnosis regarding empty data or structural deficiencies.

## Installation 

Get a copy of the project up and running on your local machine for development and testing purposes.

Don't forget to copy and rename .env.example as .env with your corresponding values.

```sh
git clone https://github.com/Dave86dev/storesaurusDB

cd storesaurusDB

npm i storesaurusDB

npm run dev
```

## Development

The project, while still in the nascent stages of its backend development, is poised for significant enhancements. Notably, the roadmap includes the integration of advanced file management and a revamped user authentication experience, with features like password recovery on the horizon.

Concurrently, the planning phase for the frontend development is underway, with expectations set on crafting a user interface using React with TypeScript.

## API Endpoints 

Version 0.4 04/03/2024

*(Upcoming swagger documentation for a complete documentation of the API endpoints).*

(Click to expand)

<details>
  <summary style="font-weight: bold; font-size: 1.3em;">User Endpoints</summary>

##### Authentication 

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login an existing user.

##### File

- `POST /file/upload` - Upload a .csv file to the database for further analysis.
- `POST /file/analysis` - Analyse and get a diagnosis in return.

</details>

## Author

- **David Ochando Blasco** - Project Developer
  - [GitHub](https://github.com/Dave86dev) - [LinkedIn](https://www.linkedin.com/in/david-ochando-blasco-90b2ba1a/)
