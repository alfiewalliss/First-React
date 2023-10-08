const router = require("express").Router();

// Controller Imports
const MeetupController = require("./controllers/MeetupController");

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createMeetupPayload = require("./schemas/createMeetupPayload");
const updateMeetupPayload = require("./schemas/updateMeetupPayload");
const { roles } = require("../config");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  MeetupController.getAllMeetups
);

router.get(
  "/:meetupId",
  [isAuthenticatedMiddleware.check],
  MeetupController.getMeetupById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(createMeetupPayload),
  ],
  MeetupController.createMeetup
);

router.patch(
  "/:meetupId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateMeetupPayload),
  ],
  MeetupController.updateMeetup
);

router.delete(
  "/:meetupId",
  [isAuthenticatedMiddleware.check],
  MeetupController.deleteMeetup
);

module.exports = router;
