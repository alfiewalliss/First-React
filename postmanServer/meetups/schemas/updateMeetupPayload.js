module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
    },
    address: {
      type: "string",
    },
    ownerId: {
      type: "number",
    },
  },
  additionalProperties: false,
};
