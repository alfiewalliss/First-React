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
      type: "string",
    },
  },
  required: ["title", "description", "image", "address"],
  additionalProperties: false,
};
