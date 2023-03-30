import pptxgen from 'pptxgenjs'
import GPTResponseReader from '../fileReader/GPTResponseReader'
import DEFAULT_PATHS from '../defaultPaths.json'

class PPTXGenerator {
  private _pptx: pptxgen
  private _gptResponseReader: GPTResponseReader

  constructor() {
    this._pptx = new pptxgen()
    this._gptResponseReader = new GPTResponseReader(DEFAULT_PATHS.TEXT_INPUT)
    this._gptResponseReader.slidesData.forEach(({ h1, p }) => this.generateSlide({ h1, p }))

    try {
      this._pptx.writeFile({ fileName: DEFAULT_PATHS.PPTX_OUTPUT })
    } catch (error) {
      console.error(error)
    }
    console.log(
      'PPXT file with ' +
        this._gptResponseReader.slidesData.length +
        ' slides generated successfully in path: ' +
        DEFAULT_PATHS.PPTX_OUTPUT
    )
  }

  private generateSlide = ({ h1, p }: { h1: string; p: string }) => {
    const slide = this._pptx.addSlide()
    slide.addText(h1, {
      x: 1,
      y: 0.5,
      fontFace: 'Arial',
      fontSize: 36,
      bold: true,
      h: 1,
      valign: 'top',
    })
    slide.addText(p, {
      x: 1,
      y: 2,
      fontFace: 'Arial',
      fontSize: 24,
      h: 3.5,
      valign: 'top',
    })
  }
}

export default PPTXGenerator
