// Basic API tests using Node.js built-in test runner
const { test, describe } = require('node:test');
const assert = require('node:assert');

// Mock data for testing
const testData = {
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  city: "New York"
};

describe('API Tests', () => {
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
  
  test('POST /api/data should create new data entry', async () => {
    const response = await fetch(`${baseUrl}/api/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    assert.strictEqual(response.status, 201);
    assert.strictEqual(result.success, true);
    assert.ok(result.id);
    assert.strictEqual(result.message, 'Data saved successfully');
  });
  
  test('GET /api/data should retrieve data entries', async () => {
    const response = await fetch(`${baseUrl}/api/data`);
    const result = await response.json();
    
    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(result.data));
    assert.ok(typeof result.total === 'number');
  });
  
  test('POST /api/data should reject empty data', async () => {
    const response = await fetch(`${baseUrl}/api/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    
    const result = await response.json();
    
    assert.strictEqual(response.status, 400);
    assert.strictEqual(result.success, false);
  });
  
  test('GET /api/data/invalid-id should return 400', async () => {
    const response = await fetch(`${baseUrl}/api/data/invalid-id`);
    const result = await response.json();
    
    assert.strictEqual(response.status, 400);
    assert.strictEqual(result.success, false);
  });
});
