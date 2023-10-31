# Book Management API Documentation

This documentation provides information about the API endpoints for managing books. The Book Management API allows you to perform various operations related to books, including adding, editing, retrieving details, listing, and deleting books.

## Table of Contents

- [Introduction](#introduction)
- [API Endpoints](#api-endpoints)
  - [Add Book](#add-book)
  - [Edit Book](#edit-book)
  - [Get Book Details By Id](#get-book-details-by-id)
  - [Book List](#book-list)
  - [Delete Book](#delete-book)

## Introduction

The Book Management API is designed to manage information about books. It provides several endpoints for performing CRUD (Create, Read, Update, Delete) operations on book data. The API uses JSON format for data exchange.

Base URL: `http://localhost:3039`

## API Endpoints

### Add Book

- **Endpoint:** `/api/book/create`
- **Method:** POST
- **Description:** Add a new book to the database.
- **Request Body:**
  ```json
  {
    "title": "heal yourself",
    "author": "lwis",
    "summary": "A journey to healing"
  }

### Edit Book

- **Endpoint:** `/api/book/update/{bookId}`
- **Method:** PUT
- **Description:** Edit an existing book's information.
- **Request Body:**
  ```json
  {
  "title": "heal yourself 007",
  "author": "lwis",
  "summary": "A journey to healing"
  }

### Get Book Details By Id

- **Endpoint:** `/api/book/getDetails/{bookId}`
- **Method:** GET
- **Description:** Retrieve details of a book by its book ID.
- **Response:**
  ```json
   {
    "status": 1,
    "data": {
        "_id": "654123b036c63163798dcc36",
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "summary": "A Fable about following your dream",
        "active": true,
        "deleted": false,
        "createdAt": "2023-10-31T15:56:32.839Z",
        "updatedAt": "2023-10-31T15:56:32.839Z"
    },
    "message": "Book Data"
  }

### Book List

- **Endpoint:** `/api/book/list`
- **Method:** GET
- **Description:** Retrieve a list of all available books.
- **Response:**
  ```json
   {
    "status": 1,
    "message": "List of Book",
    "data": [
        {
            "_id": "654123b036c63163798dcc36",
            "title": "The Alchemist",
            "author": "Paulo Coelho",
            "summary": "A Fable about following your dream",
            "active": true,
            "deleted": false,
            "createdAt": "2023-10-31T15:56:32.839Z",
            "updatedAt": "2023-10-31T15:56:32.839Z"
        }
    ],
    "totalCount": 1,
    "totalPages": 1
  }

### Delete Book

- **Endpoint:** `/api/book/delete/{bookId}`
- **Method:** DELETE
- **Description:** Delete a book by its unique ID.
- **Response:**
  ```json
   {
    "status": 1,
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "message": "Book Deleted Successfully"
  }

