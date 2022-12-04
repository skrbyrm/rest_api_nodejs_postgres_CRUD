
const { Router } = require("express");
const controller = require("./controller");


const router = Router();

router.get('/', controller.getStudents);
router.get('/:id', controller.getStudentsByID);
router.post("/", controller.addStudent);
router.delete("/:id", controller.removeStudent);
router.put("/:id", controller.updateStudent);


module.exports = router;

