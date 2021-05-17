module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: String,
      phone: String,
      queue: Number,
      isFinished: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Queue = mongoose.model("queue", schema);

  return Queue;
};
