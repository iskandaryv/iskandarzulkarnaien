-- Create the user_data table
CREATE TABLE IF NOT EXISTS user_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the JSONB data column for better query performance
CREATE INDEX IF NOT EXISTS idx_user_data_jsonb ON user_data USING GIN (data);

-- Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_user_data_created_at ON user_data (created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row updates
DROP TRIGGER IF EXISTS update_user_data_updated_at ON user_data;
CREATE TRIGGER update_user_data_updated_at
    BEFORE UPDATE ON user_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for security
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for service role
-- In a production environment, you would create more restrictive policies
CREATE POLICY "Allow all operations for service role" ON user_data
    FOR ALL USING (true);

-- Grant necessary permissions
GRANT ALL ON user_data TO postgres;
GRANT ALL ON user_data TO service_role;
