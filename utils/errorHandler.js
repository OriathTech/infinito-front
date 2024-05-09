export const errorHandler = (error) => {
    console.log("error -----", error)
    if (error.response?.data) {
        return {
            status: error.response.data.status,
            message: error.response.data.message,
            error: error.response.data.error
        };
    }
    return {
        status: "error",
        message: "Error en el Context",
        error: error.message
    };
}