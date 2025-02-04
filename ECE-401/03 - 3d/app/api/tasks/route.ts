import { readdirSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const tasksDir = join(process.cwd(), 'components/tasks')
  const taskGroups = readdirSync(tasksDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dir => {
      const groupPath = join(tasksDir, dir.name)
      const tasks = readdirSync(groupPath)
        .filter(file => file.endsWith('.tsx'))
        .map(file => ({
          name: file.replace(/T_(.+?)_[0-9a-f]+\.tsx$/, '$1').replace(/_/g, ' '),
          componentPath: `tasks/${dir.name}/${file.replace('.tsx', '')}`,
          filePath: `components/tasks/${dir.name}/${file}`
        }))

      return {
        name: dir.name,
        tasks
      }
    })

  return Response.json(taskGroups)
}