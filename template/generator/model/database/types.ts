export type type_ = "text" | "number" | "date" | "bool" | "list";

export type TableJSON = {
  name: string;
  attributes: Array<AttributeJSON>;
}
export type AttributeJSON = {
  name: string;
  type: type_;
  required: boolean;
  references?: string;
}