
-- Period logs table
CREATE TABLE period_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  flow_level TEXT CHECK (flow_level IN ('light', 'medium', 'heavy')) NOT NULL,
  symptoms TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE period_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only view their own period logs
CREATE POLICY "Users can view their own period logs" 
  ON period_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own period logs
CREATE POLICY "Users can insert their own period logs" 
  ON period_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own period logs
CREATE POLICY "Users can update their own period logs" 
  ON period_logs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own period logs
CREATE POLICY "Users can delete their own period logs" 
  ON period_logs 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX period_logs_user_id_idx ON period_logs(user_id);
CREATE INDEX period_logs_start_date_idx ON period_logs(start_date);
