import { z } from 'zod'

// Schema for validating incoming JSON data
export const dataSchema = z.record(z.any()).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Data object cannot be empty"
  }
)

// Schema for query parameters
export const querySchema = z.object({
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
  offset: z.string().optional().transform((val) => val ? parseInt(val, 10) : 0),
  filter: z.string().optional()
})

// Schema for ID parameter
export const idSchema = z.string().uuid("Invalid UUID format")

export type DataInput = z.infer<typeof dataSchema>
export type QueryParams = z.infer<typeof querySchema>
