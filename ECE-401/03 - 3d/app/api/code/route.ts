import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')
  
  if (!file) {
    return new Response('File parameter is required', { status: 400 })
  }

  try {
    const filePath = join(process.cwd(), file)
    const content = readFileSync(filePath, 'utf-8')
    return new Response(content)
  } catch (error) {
    return new Response('File not found', { status: 404 })
  }
}