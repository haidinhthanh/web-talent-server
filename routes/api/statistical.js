let router = require("express").Router()
const StatisticalController = require("../../controller/StatisticalController")

// router.get("/getAll",NewspaperController.getAll)
// router.get("/getNOPosts", NewspaperController.getN0Posts)
// router.get("/deleteAll", NewspaperController.deleteAll)
// router.get("/getPopularPosts/:no_post/:from", NewspaperController.getPopularPosts)
// router.get("/getRecentPosts", NewspaperController.getRecentPosts)
// router.get("/getPost/:id", NewspaperController.getPostById)
// module.exports = router

router.get("/getAllCategory", StatisticalController.getALLCategory)
router.get("/deleteAllCategory", StatisticalController.deleteAllCategory)
router.get("/getAllTag", StatisticalController.getALLTag)
router.get("/deleteAllTag", StatisticalController.deleteAllTag)
router.get("/getAllLocation", StatisticalController.getALLLocation)
router.get("/deleteAllLocation", StatisticalController.deleteAllLocation)
module.exports = router