const express = require("express");
const router = express.Router();

module.exports = (io) => {
  const authRoutes = require("./auth.routes");
  const recommendationRoutes = require("./recommendation.route")(io);
  const diagnosisRoutes = require("./dx.route")(io);
  const dxAssessmentRoutes = require("./dxa.route")(io);
  const reminderRoutes = require("./reminder.route")(io);
  const settingRoutes = require("./setting.route");
  const userRoleRoutes = require("./userRole.routes");
  const componentRoutes = require("./component.route");
  const userRoutes = require("./user.route");
  const socialHistoryRoutes = require("./socialhistory.routes");
  const goalRoutes = require("./goal.route")(io);
  const appointmentRoutes = require("./appointment.routes");
  const screeningRoutes = require("./screening.route")(io);
  const bodyMeasurementRoutes = require("./bodyMeasurement.routes");
  const mentalStatusExamRoutes = require("./mentalStatusExam.routes");

  router.use("/auth", authRoutes);
  router.use("/recommendations", recommendationRoutes);
  router.use("/diagnosis", diagnosisRoutes);
  router.use("/assessment", dxAssessmentRoutes);
  router.use("/reminders", reminderRoutes);
  router.use("/settings", settingRoutes);
  router.use("/user-roles", userRoleRoutes);
  router.use("/components", componentRoutes);
  router.use("/users", userRoutes);
  router.use("/social-histories", socialHistoryRoutes);
  router.use("/goals", goalRoutes);
  router.use("/appointments", appointmentRoutes);
  router.use("/screening", screeningRoutes);
  router.use("/body-measurements", bodyMeasurementRoutes);
  router.use("/mental-status-exam", mentalStatusExamRoutes);

  return router;
};
