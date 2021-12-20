export type type_ = "text" | "number" | "date";

export type TableJSON = {
  name: string;
  attributes: AttributeJSON[];
}
export type AttributeJSON = {
  name: string;
  type: type_;
  references?: string;
}