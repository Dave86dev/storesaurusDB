<p align="center">
    <img src="https://i.ibb.co/Wnp6Vg7/saurus.png" alt="saurus" style="width: 250px; height: 250px;" border="0">
</p>


# storesaurusdb

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

User authentication is a cornerstone of this application, secured through innovative magic link techniques. By integrating Valibot for precise validation, JWT for sophisticated token management, and Mailjet for reliable email interactions, the system guarantees secure, efficient, and user-friendly authentication. This combination ensures not only the security of user data but also provides a seamless authentication experience.

For file management and analysis, the application utilizes GridFS for storage, Multer for file upload handling, and Papaparse for CSV parsing, offering robust solutions for handling large files and complex data processing.

Error management across the application is meticulously handled by restify-errors, ensuring consistent and clear error handling practices.


## Stack 

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"><img src="https://img.shields.io/badge/-Nodejs-43853d?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white">

## Features

Current version 0.5

- **User Authentication:** Both registration and login processes are secure and thoroughly validated. Magic link rules. User can ask for it's account deactivation.

- **File Management:** We can upload large .csv files through a controlled, error-proof process. We can also delete files and retrieve them given a user.

- **File Analysis:** Choose a file you've uploaded to our database and explore it to obtain a diagnosis regarding empty data or structural deficiencies. Now you are able to store these analysis! Isn't it cool?

- **Admin manager:** Toggle user isActive accounts.

## Installation 

Get a copy of the project up and running on your local machine for development and testing purposes.

Don't forget to copy and rename .env.example as .env with your corresponding values.

```sh
git clone https://github.com/Dave86dev/storesaurusdb

cd storesaurusdb

npm i 

npm run dev
```

## Development

While the project is currently in the early stages of backend development, it is on the brink of substantial advancements. A key feature on the roadmap is the integration of advanced file management capabilities, promising to significantly enhance the application's functionality. The successful implementation of an email/magic link system marks a major milestone.

Concurrently, the planning phase for the frontend development is underway, with expectations set on crafting a user interface with React-Vite-TypeScript.

## API Endpoints 

Version 0.5 11/03/2024

*(Upcoming swagger documentation for a complete documentation of the API endpoints).*

(Click to expand)

<details>
  <summary style="font-weight: bold; font-size: 1.3em;">User Endpoints</summary>

##### Analysis 

- `POST /analysis/analyze` - Analyse and get a diagnosis in return.
- `POST /analysis/save` - Keep your analysis stored on our database.

##### Authentication 

- `POST /auth/deactivate` - Ask administration to deactivate your account.
- `POST /auth/prelogin` - First step to log an existing user.
- `POST /auth/login` - Second and final step to log an existing user.
- `POST /auth/preregister` - First step to register a new user.
- `POST /auth/register` - Second step in the process of registering a new user.
- `POST /auth/registerfinal` - Final step in registering a new user.

##### File

- `POST /file/delete`- Deletes a file from the database.
- `POST /file/retrieval` - Retrieve files uploaded by a certain user.
- `POST /file/upload` - Upload a .csv file to the database for further analysis.

</details>

<details>
  <summary style="font-weight: bold; font-size: 1.3em;">Admin Endpoints</summary>

##### Authentication 

- `POST /admin/auth/toggle` - Toggle activation and deactivation of a certain user.

</details>

## Author

- **David Ochando Blasco** - Project Developer
  - [GitHub](https://github.com/Dave86dev) - [LinkedIn](https://www.linkedin.com/in/david-ochando-blasco-90b2ba1a/)
