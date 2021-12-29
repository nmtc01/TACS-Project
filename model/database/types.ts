export type type_ = "text" | "number" | "date" | undefined;

export type TableJSON = {
  name: string;
  attributes: Array<AttributeJSON>;
}
export type AttributeJSON = {
  name: string;
  type: type_;
  references?: string;
}