const schemas = require("../utils/RequestValidators/book.schema");
const middleware = require("../middleware/validationMiddleware");
module.exports = (router) => {
  const bookController = require("../controllers/book.controller");

  //new api For Book
  router.post(
    "/book/create",
    middleware(schemas.bookAdd),
    bookController.create
  );
  router.get("/book/getDetails/:id", bookController.getDetails);
  router.get("/book/list", bookController.list);
  router.delete("/book/delete/:id", bookController.delete);
  router.put("/book/update/:id", bookController.update);
};
