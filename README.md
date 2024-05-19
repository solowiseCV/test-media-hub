# Media Hub API Documentation

## Introduction

Welcome to the documentation for the Media Hub API. This API is crafted to equip developers with an extensive toolkit for seamless integration with the Media Hub web application. It facilitates effortless access to diverse media content and features.


### Purpose

The Media Hub API serves as the backbone for accessing and managing media content within the Media Hub web application. It facilitates the integration of media content from various sources, including user-generated content, licensed content, and third-party integrations.

### API Version

This documentation covers version 1.0 of the Media Hub API. It is important to note that the API may evolve over time, with new features, improvements, and changes to existing functionalities. Always refer to the latest version of this documentation for the most current information.


### Getting Started

To start using the Media Hub API, follow these steps:

1. *Register for an API Key*: Sign up for a Media Hub account and register for an API key. This key is required for authenticating your requests to the API.

2. *Explore the Documentation*: Use this documentation as your guide to understand the available endpoints and best practices for integrating with the Media Hub API.

3. *Test Your Integration*: Use tools like Postman or curl to test API requests and responses. This will help you understand how the API works and troubleshoot any issues that arise.

4. *Build Your Application*: With a solid understanding of the API and its capabilities, start building your application. Utilize the API to access and manage media content, personalize user experiences, and enhance your application's functionality.

5. *Support and Feedback*: We welcome feedback and questions from our users. If you encounter any issues or have suggestions for improving the API or this documentation, please contact our support team or submit your feedback through the Media Hub website.



## Base URL
`https://localhost/api/`

## Authentication
Authentication is required for most endpoints. You can authenticate by including your API key in the request headers.
`Authorization: Bearer YOUR_API_KEY`

## Endpoints
 ### User Onboarding and Account Management

1. Sign Up Process
## POST /signup
- Creates a new user account.
 - Request Body

 `{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}`

- Response:
   201 Created if successful, returns user data including ID and email.
   400 Bad Request if validation fails.
    409 Conflict if the email is already registered.


2. Email Verification
- POST /verify-email
   - Verifies the user's email address.
   - Request Body
   `{
    "email": "user@example.com",
    "verification_code": "123456"
}`

- Response:
 `200 OK` if successful.
  `400 Bad` Request if verification fails.

3. Password Reset
 - POST /reset-password
    - Sends a password reset link to the user's email.
    - Request Body:
    `{
    "email": "user@example.com"
}`

- Response:
  `200 OK` if successful.
   `404 Not Found` if the email is not registered.

## Media Integration and Content Aggregation

1. Platform Integration
- GET /platforms
   - Retrieves a list of supported streaming platforms.
   - Response:
      `200 OK` with platform data.  

2. Search Functionality
- GET /search?q={query}
  - Searches for media across connected platforms.
    - Query Parameters:
     - `q`: Search query.
    - Response:
     `200 OK` with search results.

3. Playlist Creation
 - POST /playlists
  - Creates a new playlist for the user.
  - Request Body 
  `{
    "name": "My Playlist",
    "description": "My awesome playlist"
}`
- Response:
  `201 Created` if successful, returns playlist data including ID and name.


## User Dashboard and Consumption Tracking

1. Watch Time Tracking
- GET /watch-time
   - Retrieves total watch time for the user.
   - Response:
    `200 OK` with watch time data.

2. Recommendations
- GET /recommendations
  - Retrieves recommended content based on user preferences.
  - Response:
    `200 OK` with recommended content data.

 3. Goal Setting
 - POST /goals
    - Sets a new consumption goal for the user.
    - Request Body   
   `{
    "goal": 10,
    "unit": "movies",
    "timeframe": "month"
}`
- Response:
  `201 Created` if successful, returns goal data.


## Playlist Management and Social Sharing

1. Playlist Editing
- PUT /playlists/{playlist_id}
 - Updates the details of a playlist.
 - Request Body:
  `{
    "name": "New Playlist Name",
    "description": "Updated playlist description"
}`

- Response:
 `200 OK` if successful, returns updated playlist data.

2. Sharing Functionality
- POST /playlists/{playlist_id}/share
   - Generates a shareable link for the playlist.
   - Response:
    `200 OK` with shareable link.

## Offline Functionality and Download Options
1. Offline Mode
- PUT /offline-mode
  - Toggles offline mode for the user.
  - Request Body  

  `{
    "enabled": true
}`

- Response:
 `200 OK` if successful, returns updated user data.

2. Download Management
- POST /download
  - Initiates the download of media content.
  - Request Body:
  `{
    "media_id": "123456789",
    "format": "mp4"
}`

- Response:
  `200 OK` if successful, returns download status.

 


 

  



