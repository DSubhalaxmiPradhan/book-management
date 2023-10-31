const bookControler = {};
const Book = require('../models/bookModel');
const Logger = require('../utils/logger');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const dynamic_response = require("../utils/utility");




bookControler.create = async function(req, res) {
    const reqBody = req.body;
    const bookRecord = new Book(reqBody);
    try {
        const bookSaveRecord = await bookRecord.save();        
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Success", req.originalUrl.split("?").shift(), 'Create', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        dynamic_response(200, 'New Book added Successfully', bookSaveRecord, res);

    } catch (err) {
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Failure", req.originalUrl.split("?").shift(), 'Create', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)

        res.status(400).send({
            status: 0,
            data: {},
            message: "Invalid Record"
        })
    }
}

bookControler.update = async function(req, res) {
    const reqBody = req.body;
    try {
        const BookRecord = await Book.findOne({ _id: req.params.id });
        if (BookRecord) {
            const BookUpdate = await Book.updateOne({ _id: req.params.id }, { $set: reqBody });
            Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Success", req.originalUrl.split("?").shift(), 'Update', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
 
            res.status(200).send({
                status: 1,
                data: BookUpdate,
                message: "Book Updated Successfully"
            })
        } else {
            Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Failure", req.originalUrl.split("?").shift(), 'Update', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
            res.status(400).send({
                status: 0,
                data: {},
                message: "Invalid Record"
            })
        }
    } catch (err) {
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Failure", req.originalUrl.split("?").shift(), 'Update', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        res.status(400).send({
            status: 0,
            data: {},
            message: "Invalid Record"
        })
    }
}

bookControler.delete = async function(req, res) {
    const bookData = await Book.findOne({ _id: req.params.id });
    if (bookData) {
        const bookUpdate = await Book.updateOne({ _id: req.params.id }, { $set: { deleted: true } });

        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Success", req.originalUrl.split("?").shift(), 'Delete', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        res.status(200).send({
            status: 1,
            data: bookUpdate,
            message: "Book Deleted Successfully"
        })
    } else {
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Failure", req.originalUrl.split("?").shift(), 'Delete', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        res.status(400).send({
            status: 0,
            data: {},
            message: "Invalid Record"
        })
    }
}

bookControler.getDetails = async function(req, res) {
    const bookData = await Book.findOne({ _id: req.params.id, deleted: { $ne: true } });
    if (bookData) {
        res.status(200).send({
            status: 1,
            data: bookData,
            message: "Book Data"
        })
    } else {
        res.status(400).send({
            status: 0,
            data: {},
            message: "No Book Data Found"
        })
    }
}

bookControler.list = async function(req, res) {
    const reqBody = req.body;
    const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 20;
    const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
    const skip = resultsPerPage * (page - 1);
    const search = {};
    search['deleted'] = { $ne: true };
    const totalrecords = await Book.countDocuments(search);
    const records = await Book.find(search).skip(skip).limit(resultsPerPage).lean();
    let resp = {
        status: 1,
        message: "List of Book",
        data: records,
        totalCount: totalrecords,
        totalPages: parseInt(Math.ceil(totalrecords / resultsPerPage))
    }
    res.status(200).send(resp);
}

module.exports = bookControler;