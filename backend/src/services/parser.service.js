import { PDFParse } from 'pdf-parse';

export const extractTextFromPdf = async (buffer)=>{
    const uint8Array = new Uint8Array(buffer);
    const parser =  new PDFParse(uint8Array)
    const data = await parser.getText()
    return data.text
}