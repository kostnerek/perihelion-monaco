export const utilInterface = `
export declare function loadImg(filePath: string): Promise<cv.Mat>
export declare function saveImg(mat: cv.Mat, filePath: string): Promise<boolean>
`