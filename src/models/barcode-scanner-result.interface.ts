interface CodeResult {
  code: string;
  start: number;
  end: number;
  codeset: string;
  startInfo: {
    error: number;
    code: number;
    start: number;
    end: number;
  };
  decodedCodes: {
    error?: number;
    code: number;
    start: number;
    end: number;
  }[];
  direction: number;
  format: string;
}

interface Line {
  x: number;
  y: number;
}

export interface IBarcodeScannerResult {
  codeResult: CodeResult;
  line: Line[];
  angle: number;
  pattern: number[];
  box: [number, number][];
  boxes: [number, number][][];
}
