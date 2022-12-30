export interface Execute {
  type: boolean;
  value: string;
  ex?: string;
}

export interface InnerExecute extends Record<string, Execute> { }

export interface OuterExecute extends Record<string, InnerExecute> { }