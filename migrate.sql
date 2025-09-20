-- AI CustDev Simulator Database Schema
-- Run this script in your Neon database console

-- Create surveys table
CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    niche TEXT,
    title TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
    text TEXT,
    type TEXT
);

-- Create options table
CREATE TABLE IF NOT EXISTS options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT
);

-- Create segments table
CREATE TABLE IF NOT EXISTS segments (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
    name TEXT,
    percentage INTEGER,
    persona TEXT
);

-- Create results table
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
    segment_id INTEGER REFERENCES segments(id) ON DELETE CASCADE,
    value INTEGER
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_survey_id ON questions(survey_id);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_segments_survey_id ON segments(survey_id);
CREATE INDEX IF NOT EXISTS idx_results_question_id ON results(question_id);
CREATE INDEX IF NOT EXISTS idx_results_segment_id ON results(segment_id);

-- Insert sample data for testing
INSERT INTO surveys (niche, title) VALUES 
('EdTech', 'Исследование потребностей в онлайн-образовании')
ON CONFLICT DO NOTHING;
