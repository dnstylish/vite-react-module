import { read } from 'readdir'
import * as fs from 'fs'
import * as path from 'path'
import { Plugin } from 'vite'

interface IOptions {
  dir?: string
  out?: string
  fileName?: string
}

const _writeIndex = async (options?: IOptions) => {
  const _options: IOptions = {
    ...{
      dir: './src/components',
      out: './src',
      fileName: 'index.tsx'
    },
    ...(options || {})
  }

  _options.dir = path.join(process.cwd(), _options.dir!)
  _options.out = path.join(process.cwd(), _options.out!)

  let args = ''

  // Danh sách file
  const files = await read(_options.dir || './src/components', [
    'index.tsx',
    '**/index.tsx'
  ])

  files.forEach((file) => {
    console.log(`Export from ${file}`)

    const _path = path
      .relative(_options.out!, path.join(_options.dir!, file))
      .replace(/\/*index\.tsx$/, '')

    args += `export * from './${_path}'\n`
  })

  fs.writeFileSync(_options.out + '/' + _options.fileName, args)
  console.log('\n  > Write to: ', _options.out + '/' + _options.fileName)

  return files
}

export default (_options?: IOptions) => {
  const content: Plugin = {
    name: 'vite:react-index-generator',
    async buildStart(): Promise<void> {
      // Chạy khi khởi động Vite
      const files = await _writeIndex(_options)
      console.log('  > Generator react modules: ', files.length)
    },
    async handleHotUpdate(ctx) {
      if (/src\/components.*index.tsx$/.test(ctx.file)) {
        const files = await _writeIndex(_options)
        console.log('  > Generator react modules: ', files.length)
      }
    }
  }

  return content
}
