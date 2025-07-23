import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { idSchema } from '@/lib/validation'

// GET /api/data/[id] - Get specific data entry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID parameter
    const validatedId = idSchema.parse(params.id)
    
    // Fetch data from Supabase
    const { data, error } = await supabaseAdmin
      .from('user_data')
      .select('*')
      .eq('id', validatedId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Data not found' },
          { status: 404 }
        )
      }
      
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/data/[id] - Delete specific data entry by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID parameter
    const validatedId = idSchema.parse(params.id)
    
    // Delete data from Supabase
    const { error } = await supabaseAdmin
      .from('user_data')
      .delete()
      .eq('id', validatedId)
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Data deleted successfully'
    })
    
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
