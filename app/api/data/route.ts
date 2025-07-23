import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { dataSchema, querySchema } from '@/lib/validation'

// POST /api/data - Create new data entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input data
    const validatedData = dataSchema.parse(body)
    
    // Insert data into Supabase
    const { data, error } = await supabaseAdmin
      .from('user_data')
      .insert([{ data: validatedData }])
      .select('id')
      .single()
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      id: data.id,
      message: 'Data saved successfully'
    }, { status: 201 })
    
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid data format' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/data - List data entries with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    
    // Validate query parameters
    const { limit, offset, filter } = querySchema.parse(queryParams)
    
    let query = supabaseAdmin
      .from('user_data')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    // Apply filter if provided
    if (filter) {
      const [key, value] = filter.split(',')
      if (key && value) {
        query = query.contains('data', { [key]: value })
      }
    }
    
    const { data, error, count } = await query
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      data: data || [],
      total: count || 0,
      limit,
      offset
    })
    
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid query parameters' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
