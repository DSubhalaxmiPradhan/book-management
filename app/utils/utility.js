const dynamic_response = (status = 200, message = 'Success', data = null, res) => {
    return res.status(status).json({ status, message, data });
}

module.exports = dynamic_response;