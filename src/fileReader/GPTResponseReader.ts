import fs from 'fs'

export type slideType = { h1: string; p: string }

// expcted gpt output:
// [h1]:1. virsraksts[p]:apraksts[h2]:2. virsraksts[p]:apraksts

class GPTResponseReader {
  public sourceStr: string
  public slidesData: slideType[] = []
  private _txtFilePath: string

  constructor(txtFilePath: string) {
    this._txtFilePath = txtFilePath
    this.sourceStr = this.getFileString()
    this.getSlidesData()
  }

  private getFileString = (): string => {
    let str = ''
    try {
      str = fs.readFileSync(this._txtFilePath, 'utf-8')
    } catch (error) {
      str = JSON.stringify(`Error reading file from path ${this._txtFilePath}:\n ${error}`)
    }
    return str
  }

  private getSlidesData = (): void => {
    this.slidesData = this.sourceStr
      .split('[h1]:')
      .slice(1)
      .map((slide) => {
        const [h1, p] = slide.split('[p]:').map(text => text.trim())
        return { h1, p }
      })
  }
}

export default GPTResponseReader
