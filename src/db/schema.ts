import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  niche: text("niche"),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  surveyId: integer("survey_id").references(() => surveys.id),
  text: text("text"),
  type: text("type"),
});

export const options = pgTable("options", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").references(() => questions.id),
  text: text("text"),
});

export const segments = pgTable("segments", {
  id: serial("id").primaryKey(),
  surveyId: integer("survey_id").references(() => surveys.id),
  name: text("name"),
  percentage: integer("percentage"),
  persona: text("persona"),
});

export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").references(() => questions.id),
  optionId: integer("option_id").references(() => options.id),
  segmentId: integer("segment_id").references(() => segments.id),
  value: integer("value"),
});

// Relations
export const surveysRelations = relations(surveys, ({ many }) => ({
  questions: many(questions),
  segments: many(segments),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  survey: one(surveys, {
    fields: [questions.surveyId],
    references: [surveys.id],
  }),
  options: many(options),
  results: many(results),
}));

export const optionsRelations = relations(options, ({ one, many }) => ({
  question: one(questions, {
    fields: [options.questionId],
    references: [questions.id],
  }),
  results: many(results),
}));

export const segmentsRelations = relations(segments, ({ one, many }) => ({
  survey: one(surveys, {
    fields: [segments.surveyId],
    references: [surveys.id],
  }),
  results: many(results),
}));

export const resultsRelations = relations(results, ({ one }) => ({
  question: one(questions, {
    fields: [results.questionId],
    references: [questions.id],
  }),
  option: one(options, {
    fields: [results.optionId],
    references: [options.id],
  }),
  segment: one(segments, {
    fields: [results.segmentId],
    references: [segments.id],
  }),
}));
