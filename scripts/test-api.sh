#!/bin/bash

# Test script for the Cloud REST API
# Usage: ./scripts/test-api.sh [base_url]

BASE_URL=${1:-"http://localhost:3000"}
echo "Testing API at: $BASE_URL"
echo "================================"

# Test 1: Create a new data entry
echo "Test 1: Creating new data entry..."
RESPONSE=$(curl -s -X POST "$BASE_URL/api/data" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 28,
    "city": "San Francisco",
    "occupation": "Data Scientist"
  }')

echo "Response: $RESPONSE"
DATA_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created ID: $DATA_ID"
echo ""

# Test 2: Get all data
echo "Test 2: Getting all data..."
curl -s "$BASE_URL/api/data" | jq '.'
echo ""

# Test 3: Get data by ID
if [ ! -z "$DATA_ID" ]; then
  echo "Test 3: Getting data by ID ($DATA_ID)..."
  curl -s "$BASE_URL/api/data/$DATA_ID" | jq '.'
  echo ""
fi

# Test 4: Get data with pagination
echo "Test 4: Getting data with pagination..."
curl -s "$BASE_URL/api/data?limit=2&offset=0" | jq '.'
echo ""

# Test 5: Get data with filter
echo "Test 5: Getting data with filter..."
curl -s "$BASE_URL/api/data?filter=name,Jane" | jq '.'
echo ""

# Test 6: Test invalid data (should fail)
echo "Test 6: Testing invalid data (empty object)..."
curl -s -X POST "$BASE_URL/api/data" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'
echo ""

# Test 7: Test invalid ID format
echo "Test 7: Testing invalid ID format..."
curl -s "$BASE_URL/api/data/invalid-id" | jq '.'
echo ""

echo "API testing completed!"
