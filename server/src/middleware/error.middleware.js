// Purpose: Centralize error formatting so the API returns consistent failures.
// This middleware should be registered after all routes and other middleware.
export const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || error.status || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error.",
    });
};