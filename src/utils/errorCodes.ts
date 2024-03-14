export const ErrorCodes = {
  VALIDATION_FAILED: {
    statusCode: 400,
    message: "General validation failure for the provided data.",
  },
  AUTH_TOKEN_MISSING: {
    statusCode: 401,
    message: "No authentication token was provided.",
  },
  AUTH_TOKEN_INVALID: {
    statusCode: 401,
    message: "The provided authentication token is invalid or expired.",
  },
  AUTH_TOKEN_FAILED: {
    statusCode: 401,
    message:
      "General authentication failure, could be due to malformed tokens or incorrect signatures.",
  },
  AUTH_CREDENTIALS_INVALID: {
    statusCode: 401,
    message:
      "The provided credentials (e.g., username/password) are incorrect.",
  },
  PERMISSION_DENIED: {
    statusCode: 403,
    message:
      "The authenticated user does not have permission to perform the requested action.",
  },
  RESOURCE_ACCESS_DENIED: {
    statusCode: 403,
    message:
      "The user is authenticated but does not have access to the requested resource.",
  },
  RESOURCE_NOT_FOUND: {
    statusCode: 404,
    message: "The requested resource does not exist.",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User is non-existent in our database.",
  },
  USER_ALREADY_EXISTS: {
    statusCode: 409,
    message: "A user with the provided identifier already exists.",
  },
  PAYLOAD_TOO_LARGE: {
    statusCode: 413,
    message: "The request payload exceeds the allowed size limit.",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    statusCode: 415,
    message: "The request has an unsupported media type.",
  },
  RATE_LIMIT_EXCEEDED: {
    statusCode: 429,
    message: "The request has exceeded the rate limit.",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "A generic error message for unexpected server behavior.",
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message:
      "The service is temporarily unavailable, usually due to maintenance or overload.",
  },
};
